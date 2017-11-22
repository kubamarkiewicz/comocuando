app.controller('HomeController', function($scope, $rootScope, $http, $location, config, $timeout) {  

    $rootScope.setBodyClass('home');

    // shuffle video and audio data and save to session
    $scope.shuffle = function(array) 
    {
        let counter = array.length;
        while (counter > 0) {
            let index = Math.floor(Math.random() * counter);
            counter--;
            let temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }
        return array;
    }
    if (!sessionStorage.videoData) {
        // shuffle
        // sessionStorage.videoData = JSON.stringify($scope.shuffle(config.videoFiles));
        // sessionStorage.audioData = JSON.stringify($scope.shuffle(config.audioFiles));
        // no shuffle
        sessionStorage.videoData = JSON.stringify(config.videoFiles);
        sessionStorage.audioData = JSON.stringify(config.audioFiles);
    }
    $scope.videoData = $.parseJSON(sessionStorage.videoData);
    $scope.audioData = $.parseJSON(sessionStorage.audioData);



    $scope.videoId = null;
    $scope.audioId = null;

    $scope.selectVideo = function(index) {
        $scope.videoId = index;
        $('section#backgrounds .background').removeClass('selected');
        // $('#backgrounds').addClass('selected').css('backgroundColor', 'rgb('+$scope.videoData[index-1].r+','+$scope.videoData[index-1].g+','+$scope.videoData[index-1].b+')');
        $('#background-'+index).addClass('selected');
        checkPlay();
    };

    $scope.selectAudio = function(index) {
        $scope.audioId = index;
        checkPlay();
    };


    function checkPlay() {
        if ($scope.videoId != null && $scope.audioId != null) {
            playSound2();
            addLine($scope.videoId, $scope.audioId);
            $('section#menu a').not('#video-'+$scope.videoId).not('#audio-'+$scope.audioId).addClass('fadeOut');
            $('section#menu canvas').not('#line-' + $scope.videoId + '-' + $scope.audioId).addClass('fadeOut');
            $('section#backgrounds').addClass('fadeOut');
            $timeout(function () {
                $location.url('/' + $scope.videoId + '/' + $scope.audioId);
            }, 1000);
        }
        else {
            playSound1();
        }
    }


    function playSound1() {
        var audio = document.getElementById("audio-player-1");
        audio.currentTime = 0;
        audio.play();
    }
    function playSound2() {
        document.getElementById("audio-player-2").play();
    }



    function drawLines() {       

        var lines = sessionStorage.lines ? $.parseJSON(sessionStorage.lines) : [];
        if (lines) for (key in lines) {
            drawLine(lines[key].videoId, lines[key].audioId);
        }
    }
    function addLine(videoId, audioId) {
        var lines = sessionStorage.lines ? $.parseJSON(sessionStorage.lines) : [];
        lines.push({videoId: videoId, audioId: audioId});
        sessionStorage.lines = JSON.stringify(lines);
        drawLine(videoId, audioId);
    }
    function drawLine(videoId, audioId) {
        var pointA = $("#video-" + videoId).offset();
        var pointB = $("#audio-" + audioId).offset();
        if (!pointA || !pointB) {
            return;
        }

        var r = 6;
        var x1 = pointA.left + r;
        var y1 = pointA.top + 2*r;
        var x2 = pointB.left + r;
        var y2 = pointB.top;

        var controlPointY = 300;

        // add canvas
        var canvas = document.createElement('canvas');
        canvas.id = 'line-' + videoId + '-' + audioId;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        document.body.appendChild(canvas); // adds the canvas to the body element
        document.getElementById('canvasContainer').appendChild(canvas);
        var context = canvas.getContext('2d');

        context.beginPath();
        context.moveTo(x1, y1);
        context.bezierCurveTo(x1, y1+controlPointY, x2, y2-controlPointY, x2, y2);
        context.lineWidth = 1;
        context.strokeStyle = 'rgba(210,206,199,1)';
        context.stroke();
    }



    function onWindowResize() {
        // set canvas size

        drawLines();
    }
    window.onresize = onWindowResize;

    
    $timeout(function () { 
        onWindowResize();
    });

});