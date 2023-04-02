<?php
namespace App\Controllers;


use App\Models\Structure;
use App\Models\Sport;
use App\Models\Country;
use App\Models\Tournament;
use App\Models\Event;
use App\Models\Scope;
use App\Models\Market;
use App\Models\Outcome;
use Exception;
use PDO;

require_once 'app/controllers/WebSocketController.php';

ini_set("display_errors", 1);
error_reporting(E_ALL);

interface IImport 
{
    public function import(Structure $structure);
}

class DBImport implements IImport
{
    private $db;
    protected $structure;

    public function __construct(string $host, string $dbname, string $username, string $password)
    {
        $this->db = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);

        if (!$this->db) {
            die("Database connection failed.");
        }
    }

    public function import(Structure $structure)
    {
        $this->structure = $structure;
        $this->db->beginTransaction();

            // Insert sports
        $stmt = $this->db->prepare("INSERT INTO sports (id, name) VALUES (:id, :name) ON DUPLICATE KEY UPDATE name = :name");
        
        foreach ($structure->getSports() as $sport) {
            $stmt->bindValue(':id', $sport->getId(), PDO::PARAM_STR);
            $stmt->bindValue(':name', $sport->getName(), PDO::PARAM_STR);
            $stmt->execute();
        }
            // Insert countries
        $stmt2 = $this->db->prepare("INSERT INTO countries (id, name) VALUES (:id, :name) ON DUPLICATE KEY UPDATE name = :name");
        foreach ($structure->getCountries() as $country) {
            $stmt2->bindValue(":id", $country->getId(), PDO::PARAM_STR);
            $stmt2->bindValue(":name", $country->getName(), PDO::PARAM_STR);
            $stmt2->execute();
        }
            // Insert tournaments
        $stmt3 = $this->db->prepare("INSERT INTO tournaments (id, name, sport_id, country_id) VALUES (:id, :name, :sport_id, :country_id) ON DUPLICATE KEY UPDATE name = :name");
        foreach ($structure->getTournaments() as $tournament) {
            $stmt3->bindValue(":id", $tournament->getId(), PDO::PARAM_INT);
            $stmt3->bindValue(":name", $tournament->getName(), PDO::PARAM_STR);
            $stmt3->bindValue(":sport_id", $tournament->getSportId(), PDO::PARAM_STR);
            $stmt3->bindValue(":country_id", $tournament->getCountryId(), PDO::PARAM_STR);
            $stmt3->execute();
            
                // Insert events
            $stmt4 = $this->db->prepare("INSERT INTO events (event_id, event_name, event_start_time, tournament_id) VALUES (:event_id, :event_name, :event_start_time, :tournament_id) ON DUPLICATE KEY UPDATE event_name = :event_name");
            
            foreach ($tournament->getEvents() as $event) {
                $stmt4->bindValue(":event_id", $event->getId(), PDO::PARAM_INT);
                $stmt4->bindValue(":event_name", $event->getName(), PDO::PARAM_STR);
                $stmt4->bindValue(":event_start_time", $event->getTime(), PDO::PARAM_STR);
                $stmt4->bindValue(":tournament_id", $tournament->getId(), PDO::PARAM_INT);
                $stmt4->execute();
                
                    // Insert scopes
                $stmt5 = $this->db->prepare("INSERT INTO scopes (event_id, type, number) VALUES (:event_id, :type, :number) ON DUPLICATE KEY UPDATE type = :type");
                foreach ($event->getScopes() as $scope) {  
                    // var_dump($scope);                              
                    $stmt5->bindValue(":event_id", $event->getId(), PDO::PARAM_INT);
                    $stmt5->bindValue(":type", $scope->getType(), PDO::PARAM_STR);
                    $stmt5->bindValue(":number", $scope->getNumber(), PDO::PARAM_INT);
                    $stmt5->execute();
                    $scopeId = $this->db->lastInsertId();

                        // Insert markets
                    $stmt6 = $this->db->prepare("INSERT INTO markets (scope_id, market_id, type, type_parameter) VALUES (:scope_id, :market_id, :type, :type_parameter) ON DUPLICATE KEY UPDATE type = :type");
                    foreach ($scope->getMarkets() as $market) {
                        $stmt6->bindValue(":scope_id", $scopeId, PDO::PARAM_INT);
                        $stmt6->bindValue(":market_id", $market->getMarketId(), PDO::PARAM_INT);
                        $stmt6->bindValue(":type", $market->getType(), PDO::PARAM_STR);
                        $stmt6->bindValue(":type_parameter", $market->getTypeParameter(), PDO::PARAM_INT);
                        $stmt6->execute();
                        
                        // Insert outcomes
                        $stmt7 = $this->db->prepare("INSERT INTO outcomes (id, market_id, odds, outcomes_id) VALUES (:id, :market_id, :odds, :outcomes_id) ON DUPLICATE KEY UPDATE id = :id");

                    // var_dump($market->getOutcomes());
                        foreach ($market->getOutcomes() as $outcome) {
                            $stmt7->bindValue(":id", $outcome->getId(), PDO::PARAM_INT);
                            $stmt7->bindValue(":market_id", $outcome->getMarketId(), PDO::PARAM_INT);
                            $stmt7->bindValue(":odds", $outcome->getOdds(), PDO::PARAM_STR);
                            $coef = str_replace(',','.',$outcome->getOutcomesId());
                            $stmt7->bindValue(":outcomes_id", (float)$coef, PDO::PARAM_STR);
                            $stmt7->execute();
                        }
                    }
                }
            }
        }

        $this->db->commit();
    }
}