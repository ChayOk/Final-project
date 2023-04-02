<?php
class Parser
{
    public function parse(): Structure
{
    $this->connect();
    $arrData = $this->getData();

    $structure = new Structure();

    foreach ($arrData['events'] as $event) {
        // Create sport
        $sportName = $event['data']['sport']['name'];
        $sport = $structure->getSportByName($sportName);
        if (!$sport) {
            $sport = new Sport($sportName);
            $structure->addSport($sport);
        }

        // Create country
        $countryName = $event['data']['country']['name'];
        $country = $structure->getCountryByName($countryName);
        if (!$country) {
            $country = new Country($countryName);
            $structure->addCountry($country);
        }

        // Create tournament
        $tournamentName = $event['data']['tournament']['name'];
        $tournament = $structure->getTournamentByName($tournamentName);
        if (!$tournament) {
            $tournament = new Tournament($tournamentName, $sport, $country);
            $structure->addTournament($tournament);
        }

        // Create event
        $eventId = $event['data']['eid'];
        $eventName = $event['data']['name'];
        $eventStartTime = $event['data']['time'];
        $event = new Event($eventId, $eventName, $eventStartTime, $tournament);
        $tournament->addEvent($event);

        // Create scopes
        $eventGroupMarkets = $event['group_markets'];
        foreach ($eventGroupMarkets as $key => $value) {
            $scopeData = explode('|', $key);
            $scopeType = $scopeData[0];
            $scopeNumber = $scopeData[1];
            $scope = new Scope($scopeType, $scopeNumber, $event);
            $event->addScope($scope);

            // Create markets
            foreach ($value as $marketString) {
                $marketData = explode('!', $marketString);
                $marketId = $marketData[0];
                $marketType = $marketData[1];
                $marketTypeParameter = $marketData[2];
                $market = new Market($marketId, $marketType, $marketTypeParameter, $scope);
                $scope->addMarket($market);

                // Create outcomes
                if (count($marketData) > 3) {
                    $outcomeData = explode('|', $marketData[3]);
                    $outcomeId = $outcomeData[0];
                    $outcomeOdds = $outcomeData[1];
                    $outcome = new Outcome($outcomeId, $outcomeOdds, $market);
                    $market->addOutcome($outcome);
                }
            }
        }
    }

    echo "<pre>";
    var_dump($structure);
    echo "<hr>";
    echo "</pre>";

    return $structure;
}
}