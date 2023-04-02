<?php
// namespace App\Controllers;

use App\Models\Structure;
use App\Models\Mysqli;
use PDO;

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
        // $this->db = new Mysqli($host, $username, $password, $dbname);
        $this->db = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);

        if (!$this->db) {
            die("Database connection failed.");
        }
    }

    public function import(Structure $structure)
    {
        $this->structure = $structure;
        $this->insertSports($structure->getSports());
        // var_dump($structure->getSports());
        $this->insertCountries($structure->getCountries());
        $this->insertTournaments($structure->getTournaments());
        $this->insertEvents($structure->getEvents());
        $this->insertScopes($structure->getScopes());
        $this->insertMarkets($structure->getMarkets());
        $this->insertOutcomes($structure->getOutcomes());
    }

    private function insertSports($sports)
    {
        $stmt = $this->db->prepare("INSERT INTO sports (name) VALUES (name) ON DUPLICATE KEY UPDATE name = VALUES(name)");
        $sql = "INSERT INTO sports (id, name, alias) VALUES (:id,:name,:alias) ON DUPLICATE KEY UPDATE name = :name";

        foreach ($sports as $sport) {
            $stmt->bindParam("s", $sport->getName()); //s-string
            $stmt->execute();
        }
    }

    private function insertCountries($countries)
    {
        $stmt = $this->db->prepare("INSERT INTO countries (name, sport_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE name = VALUES(name)");

        foreach ($countries as $country) {
            $stmt->bindParam("si", $country->getName(), $country->getSportId()); //s-string, i-id
            $stmt->execute();
        }
    }

    private function insertTournaments($tournaments)
    {
        $stmt = $this->db->prepare("INSERT INTO tournaments (name, sport_id, country_id) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE name = VALUES(name)");

        foreach ($tournaments as $tournament) {
            $stmt->bindParam("sii", $tournament->getName(), $tournament->getSportId(), $tournament->getCountryId());
            $stmt->execute();
        }
    }

    private function insertEvents($events)
    {
        $stmt = $this->db->prepare("INSERT INTO events (event_name, tournament_id, event_start_time) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE event_name = VALUES(event_name), event_start_time = VALUES(event_start_time)");

        foreach ($events as $event) {
            $stmt->bindParam("sii", $event->getName(), $event->getTournamentId(), $event->getStartTime());
            $stmt->execute();
        }
    }

    private function insertScopes($scopes)
    {
        $stmt = $this->db->prepare("INSERT INTO scopes (event_id, type, number, status) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE status = VALUES(status)");

        foreach ($scopes as $scope) {
            $stmt->bindParam("isis", $scope->getEventId(), $scope->getType(), $scope->getNumber(), $scope->getStatus());
            $stmt->execute();
        }
    }

    private function insertMarkets($markets)
    {
        $stmt = $this->db->prepare("INSERT INTO markets (scope_id, type, type_parameter) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE type_parameter = VALUES(type_parameter)");

        foreach ($markets as $market) {
            $stmt->bindParam("iss", $market->getScopeId(), $market->getType(), $market->getTypeParameter());
            $stmt->execute();
            }
    }
    private function insertOutcomes($outcomes)
    {
        $stmt = $this->db->prepare("INSERT INTO outcomes (market_id, name, odds) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE name = VALUES(name), odds = VALUES(odds)");

        foreach ($outcomes as $outcome) {
            $stmt->bindParam("isd", $outcome->getMarketId(), $outcome->getName(), $outcome->getOdds()); //d-demical
            $stmt->execute();
        }
    } 

    public function __destruct()
    {
        if ($this->db !== null) {
            $this->db = null;
        }  
    }
}
