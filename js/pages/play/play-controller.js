app.controller('PlayController', function($scope, $rootScope, $http, $routeParams, $location) { 

    $rootScope.setBodyClass('play'); 

    var audioPlayer = document.getElementById("audio-player");
    var videoPlayer = document.getElementById("video-player");

    $scope.videoId = $routeParams.videoId;
    $scope.audioId = $routeParams.audioId;

    $scope.videoSrc = config.videoFiles[$routeParams.videoId - 1].file;
    $scope.audioSrc = config.audioFiles[$routeParams.audioId - 1].file;
    
    setTimeout(function(){
        audioPlayer.play();
    }, 0);
    
    setTimeout(function(){
    	videoPlayer.play();
        $(videoPlayer).addClass('show');
    }, 2000);

    $scope.togglePlay = function() {
        if (videoPlayer.paused) {
            audioPlayer.play();
            videoPlayer.play();
            $('section#play nav.controls .play span').toggleClass('glyphicon-pause');
            $('section#play nav.controls .play span').toggleClass('glyphicon-play');
        }
        else {
            audioPlayer.pause();
            videoPlayer.pause();
            $('section#play nav.controls .play span').toggleClass('glyphicon-play');
            $('section#play nav.controls .play span').toggleClass('glyphicon-pause');
        }
    }


    // click sound
    $('.btn').click(function(){
    	document.getElementById("click-player").play();
    });


    // show comments
    $scope.commentsData = null;

    function loadCommentsData() {
        $http({
            method  : 'GET',
            url     : config.api.urls.comments + '/' + $routeParams.videoId
         })
        .success(function(data) {
            $scope.commentsData = data;
        }); 
    }
    loadCommentsData();


    // save comment
    $scope.submit = function () {

        var url = config.api.urls.comments + '/' + $routeParams.videoId;

        var formData = new FormData();
        formData.append('comment', $scope.comment);

        $http.post(url, formData, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined,'Process-Data': false}
        })
        .success(function(){
            // alert('gracias!');
            $("#comment-form button[type=submit]").button('reset');
            $("#comment-form textarea").val('');
            loadCommentsData();
            $("#commentsModal .thankyou").addClass('show');
        })
        .error(function(){
            console.log("error");
        });
         
         
        // disable button 
        $("#comment-form button[type=submit]").button('loading').attr('disabled', true);

    }


    $('#commentsModal').on('hide.bs.modal', function () {
        $('#commentsModal').scrollTop(0);
    });


    $('#fb-like-target').replaceWith($('#fb-like'));


});