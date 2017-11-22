
var app = angular.module("myApp", [
    "ngRoute"
]);

// load config from file
app.constant('config', window.config);

app.config(function ($routeProvider, $locationProvider) { 

    $routeProvider 

        .when('/', { 
            controller: 'HomeController', 
            templateUrl: 'js/pages/home/index.html?v=4' 
        })  
        .when('/:videoId/:audioId', { 
            controller: 'PlayController', 
            templateUrl: 'js/pages/play/index.html?v=4' 
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


    

    // full screen
    $rootScope.toggleFullScreen = function() 
    {
        var elem = document.documentElement;
        if (!document.fullscreenElement && !document.mozFullScreenElement &&
            !document.webkitFullscreenElement && !document.msFullscreenElement) {
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            } else if (elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    }

});



    





