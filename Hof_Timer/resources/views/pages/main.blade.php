@extends('layouts.app')

@section('content')


<div class="timerTotal">0:00:00<br></div>

<div id="timerContainer">

    <div id="stageButton" class="secondCircle" onclick="startTimer()">

    </div>

    <div class="innerCircle">
        <div class="timer">00:00</div>
        <div class="startTimer play">
            START
        </div>
    </div>


</div>

<div id="rounds" class="roundsContainer">
    <table class="roundsTable ">
        <thead>
            <tr>
                <th>Round</th>
                <th>Breath</th>
                <th>Hold</th>
                <th>Squeeze</th>
            </tr>
        </thead>
        <tbody id="tableBody">
           
        </tbody>
    </table>

</div>


<div class="buttonContainer">
    <div id="resetButton" class="resetTimer reset" onclick="resetTimer()">Reset</div>
    <div id="pauseButton" class=" pause" style="" onclick="pauseTimer()">Pause</div>
    <div id="saveButton" class=" save" style="" onclick="save()">Save</div>
</div>

@stop