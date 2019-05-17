@extends('layouts.app')

@section('content')


<div class="timerTotal">00:00</div>

<div id="timerContainer">

    <div class="secondCircle" onclick="startTimer()">

    </div>

    <div class="innerCircle">
        <div class="timer">00:00</div>
        <div class="startTimer play">
            PLAY
        </div>
    </div>


</div>
<div id="buttonContainer">


</div>

<div class="resetTimer reset" onclick="resetTimer()">Reset</div>

@stop