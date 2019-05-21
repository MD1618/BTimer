<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class HofSession extends Model
{
    // table name
    protected $table = 'hof_sessions';

    protected $fillable = array('user', 'session_hour','session_min','session_sec','hold_min','hold_sec','AVhold_min','AVhold_sec');

    // primary key
    //protected $primaryKey = 'id';

    // user name
    protected $user = 'user';

    // session duration
    protected $session_hour = 'session_hour';
    protected $session_min = 'session_min';
    protected $session_sec = 'session_sec';

    // longest hold
    protected $hold_min = 'hold_min';
    protected $hold_sec = 'hold_sec';

    // average hold
    protected $AVhold_min = 'AVhold_min';
    protected $AVhold_sec = 'AVhold_sec';

    


    // TimeStamps
    public $timestamps = true;
}
