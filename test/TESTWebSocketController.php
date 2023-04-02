<?php
namespace App\Controllers;


require_once 'app/models/Structure.php';
require_once 'app/models/Sport.php';
require_once 'app/models/Country.php';
require_once 'app/models/Tournament.php';
require_once 'app/models/Event.php';
require_once 'app/models/Scope.php';
require_once 'app/models/Market.php';
require_once 'app/models/Outcome.php';
require_once 'app/controllers/IParser.php';

use Ratchet\Client\WebSocket;
use Ratchet\Client\Connector;
use App\Models\Structure;
use App\Models\Sport;
use App\Models\Country;
use App\Models\Tournament;
use App\Models\Event;
use App\Models\Scope;
use App\Models\Market;
use App\Models\Outcome;

interface IParser 
{
    public function parse();
}

class Parse implements IParser
{
    protected $structure = null;

    // public function __construct(Structure $structure){ 
    //     $this->structure = $structure;
    // }

    public function parse()
    {
        \Ratchet\Client\connect('wss://srv.kralbet.com/sport/?IO=3&transport=websocket')
        ->then(function (WebSocket $conn) {
        $conn->send('42["subscribe-PreliveEvents",{"market_group":"prelive","locale":"en_US"}]');
        $conn->on('message', function($msg) use ($conn) {
            $structure = new Structure();
            $data = $msg;
            $pattern = '/^.*?"room"/'; //регулярка
            $replacement = '{"room"'; 

            $partToRemove = preg_match_all($pattern, $data); //поиск по регулярке
            
            $result = preg_replace($pattern, $replacement, $data); //замена
            $result = substr($result,0,-1); //обрезание последнего символа
            // echo "<pre>";
            // var_dump($result);
            // echo "</pre>";
            for ($i=0; $i < 10; $i++) { 
                if ($partToRemove == 1) {
                    $dataJson = [];
                    array_push($dataJson, $result);
                }
            }
            // echo "<pre>";
            // var_dump($dataJson);
            // echo "<pre>";

            $addParsedData = new KralbetParser();

            if(!empty($dataJson)){
                $arrData = json_decode($dataJson[0], true);

                $eventArr = [];
                // echo "<pre>";
                // die(print_r($arrData['events']));
                // echo "<hr>";
                // echo "</pre>";
                foreach ($arrData['events'] as $event) { //получаем data
                    // for ($i=0; $i < count($event); $i++) { 
                    foreach ($event as $key => $data) {
                        // echo "<pre>";
                        // echo $key . " - ";
                        // print_r($data);
                        // echo "<hr>";
                        // echo "</pre>";
                        // }
                    // }
                    // echo "<pre>";
                    // var_dump($event);
                    // echo "<hr>";
                    // echo "</pre>";

                    // if(!isset($event['data'])){
                    //     echo '!!!';
                    //     print_r($event);
                    //     exit();
                    //     //exit(1111);
                    // }

                        if($key == 'data'){
                            $eventArr['sport_name'] = $event['data']['sport']['name'];                    
                            $eventArr['country_name'] = $event['data']['country']['name'];
                            $eventArr['tournament_name'] = $event['data']['tournament']['name'];
                            $eventArr['event_id'] = $event['data']['eid'];
                            $eventArr['event_name'] = $event['data']['name'];
                            $eventArr['event_start_time'] = $event['data']['time'];

                            // $addParsedData->addParsedData($event);
                            $data = $event['group_markets'];
                            foreach ($data as $key => $value) { // получаем group_markets
                                $scopeData = explode('|',$key);

                                $eventArr['scope_type'] = $scopeData[0];
                                $eventArr['scope_number'] = $scopeData[1];

                                // echo "<pre>";
                                // var_dump($eventArr); // вывод ивента
                                // echo "<hr>";
                                // echo "</pre>";
                                foreach ($value as $key => $v) {
                                    $subArray = [];

                                    foreach (explode("!", $v) as $item) {
                                        
                                        foreach (explode("|", $item) as $subItem) {
                                            
                                            if(preg_match_all('/~/', $subItem)){
                                                $subItem = explode('~', $subItem);
                                            }
                                            $subArray[] = $subItem;
                                            
                                        }
                                    }
                                    $eventArr['market_id'] = $subArray['0'];
                                    $eventArr['market_type'] = $subArray['1'];
                                    $eventArr['market_type_parameter'] = $subArray['2'];
                                    
                                    
                                    foreach ($subArray as $key => $value) {

                                    $ourcomesArr = [];
                                        if(is_array($value)){
                                            foreach ($value as $key => $v) {
                                                array_push($ourcomesArr, $v);
                                            }
                                            $eventArr['id'] = $ourcomesArr['0'];
                                            $eventArr['odds'] = $ourcomesArr['1'];
                                            $eventArr['ourcomes_id'] = $ourcomesArr['2'];
                                            
                                        }
                                        
                                    }
                                    // echo "<pre>";
                                    // var_dump($eventArr); // вывод ивента
                                    // echo "<hr>";
                                    // echo "</pre>";    
                                    $addParsedData->addParsedData($eventArr);
                                }
                            }
                        }
                    }
                }               
            }
            
        });
        
        }, function (\Exception $e) {
            echo "Could not connect: {$e->getMessage()}\n";
        });
    }

    public function prepare($data)
    {
        $pattern = '/^.*?"room"/'; //регулярка
        $replacement = '{"room"';

        $partToRemove = preg_match_all($pattern, $data); //поиск по регулярке
        
        $result = preg_replace($pattern, $replacement, $data); //замена
        $result = substr($result,0,-1); //обрезет последний символ
        for ($i=0; $i < 13; $i++) { 
            if ($partToRemove == 1) {
                $arrData = [];
                array_push($arrData, $result);
            }
        }
    }
}