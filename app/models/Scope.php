<?php
namespace App\Models;


class Scope
{
    private $type;
    private $number;
    private $event;
    private $markets;

    public function __construct($type, $number, Event $event)
    {
        $this->type = $type;
        $this->number = $number;
        $this->event = $event;
        $this->markets = [];
    }
    
    public function addMarket($market)
    {
        $this->markets[] = $market;
    }

    public function getMarkets()
    {
        return $this->markets;
    }
    
    public function getEventId() 
    {
        return $this->event->getId();
    }

    public function getType() 
    {
        return $this->type;
    }

    public function getNumber() 
    {
        return $this->number;
    }
}
