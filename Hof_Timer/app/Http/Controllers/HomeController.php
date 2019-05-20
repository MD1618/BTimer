<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        //return HofSession::all();
        
        $hof_sessions = DB::table('hof_sessions')->get();
        
        //$hof_sessions = HofSession::all();
        return view('/home')->with('hof_sessions', $hof_sessions);
    }

    public function ajaxTest()
    {
        return "test text working" ;
    }
}
