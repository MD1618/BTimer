<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

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
        //return HofSession::all(); //using model
        
        //get session for current user - needs <use Illuminate\Support\Facades\Auth;>
        $hof_sessions = DB::table('hof_sessions')->where('user', Auth::id())->orderBy('created_at', 'desc')->get();
       
        return view('/home')->with('hof_sessions', $hof_sessions);
    }


}
