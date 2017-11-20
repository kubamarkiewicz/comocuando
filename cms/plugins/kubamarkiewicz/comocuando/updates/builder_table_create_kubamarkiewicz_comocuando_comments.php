<?php namespace KubaMarkiewicz\ComoCuando\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableCreateKubamarkiewiczComocuandoComments extends Migration
{
    public function up()
    {
        Schema::create('kubamarkiewicz_comocuando_comments', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->text('comment');
            $table->integer('video_id');
            $table->integer('audio_id');
            $table->dateTime('date')->nullable();
            $table->integer('hearts')->default(0);
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('kubamarkiewicz_comocuando_comments');
    }
}