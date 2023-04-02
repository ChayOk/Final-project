<?php
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
ini_set('memory_limit', '512M');
ini_set('max_execution_time', 900);

require_once 'vendor/autoload.php';
require_once 'app/controllers/WebSocketController.php';
require_once 'app/controllers/Api.php';
require_once 'app/controllers/Import.php';
require_once 'app/models/Structure.php';

use App\Controllers\DBImport;
use App\Controllers\ApiCreate;

$api = new App\Controllers\ApiCreate('localhost', 'sportbook', 'root', '');
$api->sportApi();
$import = new App\Controllers\DBImport('localhost', 'sportbook', 'root', '');
$client = new App\Controllers\Parser('wss://srv.kralbet.com/sport/?IO=3&transport=websocket');

$import->import($client->parse());