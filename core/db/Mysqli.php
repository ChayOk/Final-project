<?php
namespace DB;


class Mysqli
{
   private $iniFile = "core.ini";
   private $iniData = [];
   private $pdo  = null;
   private static $instance = null;

   public static function getInstance()
   {
        if (!self::$instance) {
            return self::$instance = new self();
        }

        return self::$instance;
   }

   public function init()
   {
        $this->connectToDb();
   }

   public function getDbConnection()
   {
       if($this->pdo) {
           return $this->pdo;
       }
   }

   private function getIniData()
   {
       return $this->iniData;
   }

   private function connectToDb()
   {}

   private function __construct()
   {
        $this->iniData = parse_ini_file(__DIR__. "/" .$this->iniFile);
        $this->pdo = new \PDO(
        'mysql:host=localhost;dbname=sportbook',
            $this->iniData['user'],
            $this->iniData['pass']
        );
   }

   private function __clone()
   {}
}