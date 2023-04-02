<?php
namespace App\Controllers;


use PDO;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

class ApiCreate
{
    private $db;

    public function __construct(string $host, string $dbname, string $username, string $password)
    {
        $this->db = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);

        if (!$this->db) {
            die("Database connection failed.");
        }
    }

    public function sportApi()
    {
        // die(var_dump($_SERVER['REQUEST_URI']));
        if (($_SERVER['REQUEST_METHOD'] === 'GET')) {
            
            // SELECT query on the sports table
            if($_SERVER['REQUEST_URI'] == '/?api=sports'){
            $sql = "SELECT id, name FROM sports";
            $result = $this->db->query($sql);
            }
            else if($_SERVER['REQUEST_URI'] == '/?api=countries'){
            // SELECT query on the countries table
            $sql = "SELECT id, name FROM countries";
            $result = $this->db->query($sql);
            }
            else if($_SERVER['REQUEST_URI'] == '/?api=tournaments'){
            // SELECT query on the tournaments table
            $sql = "SELECT tournaments.name AS tournament_name, tournaments.id AS tournament_id, countries.name AS country_name, sports.name AS sport_name FROM tournaments JOIN countries ON tournaments.country_id = countries.id JOIN sports ON tournaments.sport_id = sports.id";
            $result = $this->db->query($sql);
            }
            else if($_SERVER['REQUEST_URI'] == '/?api=events'){
            // SELECT query on the tournaments table
            $sql = "SELECT tournaments.name AS tournament_name, tournaments.id AS tournament_id, countries.name AS country_name, sports.name AS sport_name, events.event_id AS event_id, events.event_name AS event_name, events.event_start_time AS start_time FROM tournaments JOIN countries ON tournaments.country_id = countries.id JOIN sports ON tournaments.sport_id = sports.id JOIN events ON tournaments.id = events.tournament_id";
            $result = $this->db->query($sql);
            }
            else if($_SERVER['REQUEST_URI'] == '/?api=outcomes_1x2_home'){
            $sql = "SELECT o.id AS outcome_id, o.market_id AS out_market_id, o.odds AS odds, o.outcomes_id AS outcomes_coef, m.market_id AS market_id, m.scope_id AS market_scope_id, m.type AS market_type, s.id AS scope_id, s.type AS scope_type, e.event_id AS event_id, e.event_name AS event_name, e.tournament_id AS tournament_id FROM outcomes o JOIN markets m ON o.market_id = m.market_id JOIN scopes s ON m.scope_id = s.id JOIN events e ON s.event_id = e.event_id JOIN tournaments t ON e.tournament_id = t.id WHERE m.scope_id = s.id AND s.event_id = e.event_id AND e.tournament_id = t.id AND m.type = '12' AND s.type = 'full_event' AND o.odds = 'home'";
            $result = $this->db->query($sql);
            }
            else if($_SERVER['REQUEST_URI'] == '/?api=outcomes_1x2_draw'){
            $sql = "SELECT o.id AS outcome_id, o.market_id AS out_market_id, o.odds AS odds, o.outcomes_id AS outcomes_coef, m.market_id AS market_id, m.scope_id AS market_scope_id, m.type AS market_type, s.id AS scope_id, s.type AS scope_type, e.event_id AS event_id, e.event_name AS event_name, e.tournament_id AS tournament_id FROM outcomes o JOIN markets m ON o.market_id = m.market_id JOIN scopes s ON m.scope_id = s.id JOIN events e ON s.event_id = e.event_id JOIN tournaments t ON e.tournament_id = t.id WHERE m.scope_id = s.id AND s.event_id = e.event_id AND e.tournament_id = t.id AND m.type = '12' AND s.type = 'full_event' AND o.odds = 'draw'";
            $result = $this->db->query($sql);
            }
            else if($_SERVER['REQUEST_URI'] == '/?api=outcomes_1x2_away'){
            $sql = "SELECT o.id AS outcome_id, o.market_id AS out_market_id, o.odds AS odds, o.outcomes_id AS outcomes_coef, m.market_id AS market_id, m.scope_id AS market_scope_id, m.type AS market_type, s.id AS scope_id, s.type AS scope_type, e.event_id AS event_id, e.event_name AS event_name, e.tournament_id AS tournament_id FROM outcomes o JOIN markets m ON o.market_id = m.market_id JOIN scopes s ON m.scope_id = s.id JOIN events e ON s.event_id = e.event_id JOIN tournaments t ON e.tournament_id = t.id WHERE m.scope_id = s.id AND s.event_id = e.event_id AND e.tournament_id = t.id AND m.type = '12' AND s.type = 'full_event' AND o.odds = 'away'";
            $result = $this->db->query($sql);
            }

            // Check if any rows were returned
            if ($result->rowCount() > 0) {
                // Fetch the results and store them in an array
                $rows = array();
                while($row = $result->fetch()) {
                    $rows[] = $row;
                }

                // Return the sorted results in JSON format
                header('Content-Type: application/json');
                echo json_encode($rows);

                return json_encode($rows);
            } else {
                // If no rows were returned, return an error message
                http_response_code(404);
                echo json_encode(array('message' => 'No data found.'));

                return json_encode(array('message' => 'No data found.'));
            }
        } else {
            // If the request method is not GET, return an error message
            http_response_code(405);
            echo json_encode(array('message' => 'Method not allowed.'));

            return json_encode(array('message' => 'Method not allowed.'));
        }
    }
}