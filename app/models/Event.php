<?php
namespace App\Models;


use App\Models\Tournament;

class Event 
{
    private $id;
    private $name;
    private $start_time;
    public $tournament;
    private $scopes;

    public function __construct($id, $name, $start_time, Tournament $tournament) 
    {
        $this->id = $id;
        $this->name = $name;
        $this->start_time = $start_time;
        $this->tournament = $tournament;
        $this->scopes = [];
    }

    public function getId() 
    {
        return $this->id;
    }

    public function getName() 
    {
        return $this->name;
    }

    public function getTime() 
    {
        return $this->start_time;
    }

    public function getTournament() 
    {
        return $this->tournament;
    }

    public function getTournamentId() 
    {
        return $this->tournament->getId();
    }
    
    public function addScope($scope) 
    {
        $this->scopes[] = $scope;
    }
    public function getScopes() 
    {
        return $this->scopes;
    }
}