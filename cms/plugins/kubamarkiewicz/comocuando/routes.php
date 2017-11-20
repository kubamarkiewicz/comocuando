<?php

Route::get('/api', 'KubaMarkiewicz\ComoCuando\Api\ApiIndex@index');

Route::get('/api/comments/{video_id}', 'KubaMarkiewicz\ComoCuando\Api\Comments@index');
Route::post('/api/comments/{video_id}', 'KubaMarkiewicz\ComoCuando\Api\Comments@save');
