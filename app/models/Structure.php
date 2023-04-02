<?php
namespace App\Models;


class Structure 
{
    private $sports;
    private $countries;
    private $tournaments;
    private $events;
    private $scopes;
    private $markets;
    private $outcomes;
  
    public function __construct(
        $sports      = [],
        $countries   = [],
        $tournaments = [],
        $events      = [],
        $scopes      = [],
        $markets     = [],
        $outcomes    = []
        ) 
    {
      $this->sports      = $sports;
      $this->countries   = $countries;
      $this->tournaments = $tournaments;
      $this->events      = $events;
      $this->scopes      = $scopes;
      $this->markets     = $markets;
      $this->outcomes    = $outcomes;
    }

    public function getSports() 
    {
        return $this->sports;
    }
    public function getSportByName($sportName)
    {
        foreach ($this->sports as $sport) {
            if ($sport->getName() === $sportName) {
                return $sport;
            }
        }
        return null;
    }

    public function getCountries() 
    {
        return $this->countries;
    }

    public function getCountryByName($countryName)
    {
        foreach ($this->countries as $country) {
            if ($country->getName() === $countryName) {
                return $country;
            }
        }
        return null;
    }

    public function getTournaments() 
    {
        return $this->tournaments;
    }
    
    public function getTournamentByName($tournamentName)
    {
        foreach ($this->tournaments as $tournament) {
            if ($tournament->getName() === $tournamentName) {
                return $tournament;
            }
        }
        return null;
    }

    public function getEvents() 
    {
        return $this->events;
    }

    public function getScopes() 
    {
        return $this->scopes;
    }

    public function getMarkets() 
    {
        return $this->markets;
    }

    public function getOutcomes() 
    {
        return $this->outcomes;
    }

    public function addSport($sport) 
    {
    $this->sports[] = $sport;
    }

    public function addCountry($country) 
    {
        $this->countries[] = $country;
    }

    public function addTournament($tournament) 
    {
        $this->tournaments[] = $tournament;
    }

    public function addEvent($event) 
    {
        $this->events[] = $event;
    }

    public function addScope($scope) 
    {
        $this->scopes[] = $scope;
    }

    public function addMarket($market) 
    {
        $this->markets[] = $market;
    }

    public function addOutcome($outcome) 
    {
        $this->outcomes[] = $outcome;
    }
}