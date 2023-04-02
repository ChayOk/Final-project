<?php
namespace App\Controllers;


require_once 'app/controllers/WebSocketController.php';
use App\Controllers\Parse;
use App\Models\Structure;
use App\Models\Sport;
use App\Models\Country;
use App\Models\Tournament;
use App\Models\Event;
use App\Models\Scope;
use App\Models\Market;
use App\Models\Outcome;


class KralbetParser
{ 

    public function addParsedData($event)
    {
        $sports = [];
        $countries = [];
        $tournaments = [];
        $events = [];
        $scopes = [];
        $markets = [];
        $outcomes = [];

        $structure = new Structure();

        // Add sport
        $sport_name = $event['sport_name'];
        if (!isset($sports[$sport_name])) {
            $sports[$sport_name] = new Sport($sport_name);
            $structure->addSport($sports[$sport_name]);
        }
        // Add country
        $country_name = $event['country_name'];
        if (!isset($countries[$country_name])) {
            $countries[$country_name] = new Country($country_name);
            $structure->addCountry($countries[$country_name]);
        }

        // Add tournament
        $tournament_name = $event['tournament_name'];
        if (!isset($tournaments[$tournament_name])) {
            $tournaments[$tournament_name] = new Tournament($tournament_name, $sports[$sport_name], $countries[$country_name]);
            $structure->addTournament($tournaments[$tournament_name]);
        }

        // Add event
        $event_id = $event['event_id'];
        if (!isset($events[$event_id])) {
            $event_name = $event['event_name'];
            $event_start_time = $event['event_start_time'];
            $structure->getTournaments();
            $events[$event_id] = new Event($event_id, $event_name, $event_start_time, $tournaments[$tournament_name]);
            $tournaments[$tournament_name]->addEvent($events[$event_id]);
        }

        // Add scope
        $scope_type = $event['scope_type'];
        $scope_number = $event['scope_number'];
        $scope_key = $scope_type . '-' . $scope_number;
        if (!isset($scopes[$scope_key])) {
            $scopes[$scope_key] = new Scope($scope_type, $scope_number, $events[$event_id]);
            $events[$event_id]->addScope($scopes[$scope_key]);
        }

        // Add market
        $market_id = $event['market_id'];
        $market_type = $event['market_type'];
        $market_type_parameter = $event['market_type_parameter'];
        if (!isset($markets[$market_type])) {
            $markets[$market_type] = new Market($market_id, $market_type, $market_type_parameter, $scopes[$scope_key]);
            $scopes[$scope_key]->addMarket($markets[$market_type]);
        }

        // Add outcome
        $id = $event['id'];
        $outcome_id = $event['ourcomes_id'];
        $odds = $event['odds'];
        $outcomes[$outcome_id] = new Outcome($id, $odds, $outcome_id, $markets[$market_type]);
        $markets[$market_type]->addOutcome($outcomes[$outcome_id]);

        echo "<pre>";
        var_dump($structure); //вывод структуры
        echo "<pre>";

        return $structure; 
    }
}