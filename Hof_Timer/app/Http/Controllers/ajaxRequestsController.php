<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\HofSession;
use Illuminate\Support\Facades\Auth;

class ajaxRequestsController extends Controller
{
    //
    /**
     * Test ajax
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function ajaxSaveTimes(Request $request)
    {
        // $data = $request->all(); // This will get all the request data

        $hofSession = new HofSession();
        if (Auth::check()) { 
            $hofSession->user = Auth::id();
        }
        $hofSession->session_hour = $request->input('THour');
        $hofSession->session_min = $request->input('TMin');
        $hofSession->session_sec = $request->input('TSec');
        $hofSession->hold_min = $request->input('HMin');
        $hofSession->hold_sec = $request->input('HSec');
        $hofSession->AVhold_min = $request->input('AVHMin');
        $hofSession->AVhold_sec = $request->input('AVHSec');

        $hofSession->save();
        return response($hofSession, 200);
    }
}
