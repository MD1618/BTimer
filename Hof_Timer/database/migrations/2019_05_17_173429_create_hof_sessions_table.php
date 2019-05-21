<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHofSessionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('hof_sessions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('user');
            $table->integer('session_hour');
            $table->integer('session_min');
            $table->integer('session_sec');
            $table->integer('hold_min');
            $table->integer('hold_sec');
            $table->integer('AVhold_min');
            $table->integer('AVhold_sec');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('hof_sessions');
    }
}
