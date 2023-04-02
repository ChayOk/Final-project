<?php
namespace App\Models;


class Outcome
{

    private $id;
    private $odds;
    private $ourcomes_id;
    private $market;

    public function __construct($id, $odds, $ourcomes_id, $market)
    {
        
        $this->id = $id;
        $this->ourcomes_id = $ourcomes_id;
        $this->odds = $odds;
        $this->market = $market;
    }

    public function getId() 
    {
        return $this->id;
    }

    public function getOdds() 
    {
        return $this->odds;
    }

    public function getOutcomesId() 
    {
        return $this->ourcomes_id;
    }

    public function getMarketId() 
    {
        return $this->market->getMarketId();
    }
}