<?php
namespace App\Models;


class Market
{
    private $market_id;
    private $type;
    private $type_parameter;
    private $scope;
    private $outcomes;

    public function __construct($market_id, $type, $type_parameter, Scope $scope)
    {
        $this->market_id = $market_id;
        $this->type = $type;
        $this->type_parameter = $type_parameter;
        $this->scope = $scope;
        $this->outcomes = [];
    }
    
    public function addOutcome($outcome)
    {
        $this->outcomes[] = $outcome;
    }

    public function getoutcomes()
    {
        return $this->outcomes;
    }

    public function getMarketId() 
    {
        return $this->market_id;
    }

    public function getType() 
    {
        return $this->type;
    }

    public function getTypeParameter() 
    {
        return $this->type_parameter;
    }
}