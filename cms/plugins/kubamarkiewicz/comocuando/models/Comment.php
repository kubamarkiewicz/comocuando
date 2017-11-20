<?php namespace KubaMarkiewicz\ComoCuando\Models;

use Model;
use DB;

/**
 * Model
 */
class Comment extends Model
{

    /*
     * Disable timestamps by default.
     * Remove this line if timestamps are defined in the database table.
     */
    public $timestamps = false;

    /**
     * @var string The database table used by the model.
     */
    public $table = 'kubamarkiewicz_comocuando_comments';


}