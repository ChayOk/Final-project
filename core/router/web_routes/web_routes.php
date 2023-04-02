<?php

namespace Core\Router\web_routes;


//use exceptions\ExceptionClass as Ex;*/

class web_routes
{
    private static $routes = [
        '' => array(
            'route' => '/sportbook',
            'file' => 'app/controllers/IParser.php',
            'class' => 'Controllers\KralbetParser',
            'function' => 'index',
            'method' => 'get',
            'middleware' => 'anyone',
            'view' => 'index.html',
        ),
    ];

    public static function FindRoute($route){
        try {
            foreach (self::$routes as $k => $v){
                if ($k == $route[1]){
                    return $v;
                }
            }
			
			return self::$routes["404"];
        } catch (\Exception $e){
            throw new \Exception("Указанный путь не найден!");
        }

        return 0;
    }
} 