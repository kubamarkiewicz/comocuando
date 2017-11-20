
var app = angular.module("myApp", [
    "ngRoute"
]);

// load config from file
app.constant('config', window.config);

app.config(function ($routeProvider, $locationProvider) { 

    $routeProvider 

        .when('/', { 
            controller: 'HomeController', 
            templateUrl: 'js/pages/home/index.html?v=1' 
        })  
        .when('/:videoId/:audioId', { 
            controller: 'PlayController', 
            templateUrl: 'js/pages/play/index.html?v=1' 
        })     
        .otherwise({ 
            redirectTo: '/' 
        }); 

    // remove hashbang
    $locationProvider.html5Mode(true);
        
});

// CORS fix
app.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);


app.run(function($rootScope, $sce, $http, $location) {


    $rootScope.setBodyClass = function(slug) {

        // set body class "page-slug"
        $("body")
        .removeClass(function (index, className) {
            return (className.match (/(^|\s)page-\S+/g) || []).join(' ');
        })
        .addClass("page-"+slug);

    }

});



    





