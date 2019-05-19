<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class HofSession extends Model
{
    // table name
    protected $table = 'hof_sessions';

    // primary key
    public $primaryKey = 'id';
    
    // user name
    public $user_name = 'user';

    // session duration
    public $session_hour = 0;
    public $session_min = 0;
    public $session_sec = 0;
    
    // longest hold
    public $hold_min = 0;
    public $hold_sec = 0;

    // average hold
    public $AVhold_min = 0;
    public $AVhold_sec = 0;


    // TimeStamps
    public $timestamps = true;
}
