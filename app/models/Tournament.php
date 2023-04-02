<?php
namespace App\Models;


use App\Models\Country;
use App\Models\Sport;
use App\Models\Event;

class Tournament 
{
    private $id;
    private $name;
    private $sport;
    private $country;
    private $events = [];

    public function __construct($id, $name, Sport $sport, Country $country) 
    {
        $this->id = $id;
        $this->name = $name;
        $this->sport = $sport;
        $this->country = $country;
    }

    public function getId() 
    {
        return $this->id;
    }

    public function getName() 
    {
        return $this->name;
    }

    public function getSport() 
    {
        return $this->sport;
    }

    public function getSportId()
    {
        return $this->sport->getId();
    }

    public function getCountry() 
    {
        return $this->country;
    }

    public function getCountryId()
    {
        return $this->country->getId();
    }

    public function addEvent(Event $event) 
    {
        $this->events[] = $event;
    }

    public function getEvents() 
    {
        return $this->events;
    }
}