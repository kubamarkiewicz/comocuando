<?php namespace KubaMarkiewicz\ComoCuando\Api;

use Illuminate\Routing\Controller;
use Input;
use DB;
use KubaMarkiewicz\ComoCuando\Models\Comment;

class Comments extends Controller
{

    public function index($video_id)
    {
        $query = Comment::where('video_id', $video_id)->orderBy('date', 'asc');

        $result = $query->get(); 

        return response()->json($result, 200, array(), JSON_PRETTY_PRINT);
    }

    public function save($video_id)
    {
        $model = new Comment();
        $model->video_id = $video_id;
        $model->comment = $_POST['comment'];
        $model->save();

        return response()->json(true, 200, [], JSON_PRETTY_PRINT);
    }

}