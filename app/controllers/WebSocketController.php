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

use WSSC\WebSocketClient;
use WSSC\Components\ClientConfig;

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
    public function parse(): Structure;
}

class Parser implements IParser
{
    protected $data;
    protected $structure;
    protected $client;

    public function __construct($host) 
    {
        $this->client = new WebSocketClient($host, new ClientConfig());
        $this->client->receive();
    }

    protected function connect() 
    {
        $this->client->send('42["subscribe-PreliveEvents",{"market_group":"prelive","locale":"en_US"}]');  
        $this->client->receive();      
    }

    protected function receiveDataFromSocket()
    {
        $this->client->send('42["subscribe-PreliveEvents",{"market_group":"prelive","locale":"en_US"}]');
        $entriesJSON = $this->client->receive();
        return $entriesJSON;
    }

    public function getData()
    {
        $data = $this->receiveDataFromSocket();
        $pattern = '/^.*?"room"/'; //регулярка
        $replacement = '{"room"'; 
        
        $result = preg_replace($pattern, $replacement, $data); //замена
        $result = substr($result,0,-1); //обрезание последнего символа

        return json_decode($result, true);        
    }

    public function parse(): Structure
    {
        $this->connect();
        $arrData = $this->getData();

        $structure = new Structure();

        foreach ($arrData['events'] as $eventData) {

            // Create sport
            $sportName = $eventData['data']['sport']['name'];
            $sportsId = $eventData['data']['sport']['id'];
            $sport = $structure->getSportByName($sportName);
            if (!$sport) {
                $sport = new Sport($sportName, $sportsId);
                $structure->addSport($sport);
            }

            // Create country
            $countryName = $eventData['data']['country']['name'];
            $countryId = $eventData['data']['country']['id'];
            $country = $structure->getCountryByName($countryName);
            if (!$country) {
                $country = new Country($countryName, $countryId);
                $structure->addCountry($country);
            }

            // Create tournament
            $tournamentId = $eventData['data']['tournament']['id'];
            $tournamentName = $eventData['data']['tournament']['name'];
            $tournament = $structure->getTournamentByName($tournamentName);
            if (!$tournament) {
                $tournament = new Tournament($tournamentId, $tournamentName, $sport, $country);
                $structure->addTournament($tournament);
            }

            // Create event
            $eventId = $eventData['data']['eid'];
            $eventName = $eventData['data']['name'];
            $eventStartTime = $eventData['data']['time'];
            $event = new Event($eventId, $eventName, $eventStartTime, $tournament);
            $tournament->addEvent($event);

            // Create scopes
            $eventGroupMarkets = $eventData['group_markets'];
            foreach ($eventGroupMarkets as $key => $value) {
                $scopeData = explode('|', $key);
                $scopeType = $scopeData[0];
                $scopeNumber = $scopeData[1];
                $scope = new Scope($scopeType, $scopeNumber, $event);
                $event->addScope($scope);
                
                foreach ($value as $marketSrting) {
                    $marketItem = explode("|", $marketSrting);

                    // var_dump($marketItem);
                    $marketId = $marketItem[0];
                    $marketType = $marketItem[1];
                    $marketTypeParameter = $marketItem[2];
                    $market = new Market($marketId, $marketType, $marketTypeParameter, $scope);
                    $scope->addMarket($market); 

                    foreach ($marketItem as $outcomesSrting) {
                        $notDividedOutcomes = explode("!", $outcomesSrting);
                        if(is_array($notDividedOutcomes)){
                            foreach ($notDividedOutcomes as $value) {
                            if(preg_match_all('/~/', $value)){
                                $outcomesItem = explode('~', $value);
            
                                // var_dump($outcomesItem);
                                $outcomeId = $outcomesItem[0];
                                $outcomeOdds = $outcomesItem[1];
                                $outcomeCoef = $outcomesItem[2];
                                $outcome = new Outcome($outcomeId, $outcomeOdds, $outcomeCoef, $market);
                                $market->addOutcome($outcome);
                            }
                        }
                    }
                    }
                }   
            }
        }       
        
        return $structure;
    }
}