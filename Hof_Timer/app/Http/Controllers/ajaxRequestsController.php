<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ajaxRequestsController extends Controller
{
    //
    /**
     * Test ajax
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function ajaxTest(Request $request)
    {
        $data = $request->all(); // This will get all the request data
        $dataMin = $request->input('min'); 
        $datasec = $request->input('sec'); 
        $dataThour = $request->input('THour'); 
        $dataTMin = $request->input('TMin'); 
        $dataTSec = $request->input('TSec') ; 
        $dataString = $dataMin . ":" . $datasec . " Awesome hold!";
        $dataTString = $dataThour . ":" . $dataTMin . ":" . $dataTSec . " Nice Session";
        return response($dataTString  ,200);
    }
}
