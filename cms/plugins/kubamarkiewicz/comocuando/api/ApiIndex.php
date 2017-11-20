<?php namespace KubaMarkiewicz\ComoCuando\Api;

use Illuminate\Routing\Controller;
use Input;
use DB;
use Route;
use View;

class ApiIndex extends Controller
{

    public function index()
    {
        $currentRoute = Route::getCurrentRoute()->getPath();

        $data = [
            'routes' => []
        ];

        // dump(Route::getCurrentRoute()->getPath());
        $urlPrefix = Route::getCurrentRoute()->getPath();
        // dump(Route::getRoutes());
        $routes = Route::getRoutes();
		foreach ($routes as $route) {
			if ((strpos($route->getPath(), $urlPrefix) === 0) && ($route->getPath() != $currentRoute)) {
                $data['routes'][] = [
                    'method' => $route->getMethods()[0],
                    'url'    => url().'/'.$route->getPath()
                ];
			}
		}

        return View::make('kubamarkiewicz.comocuando::api.index', $data);
    }

}