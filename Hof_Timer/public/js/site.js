var startTimerButton = document.querySelector('.startTimer');
var pauseTimerButton = document.querySelector('.pauseTimer');
var secondsCircle = document.querySelector('.secondCircle');
var timerDisplay = document.querySelector('.timer');
var totalTimerDisplay = document.querySelector('.timerTotal');

var startTime;
var totalStartTime;
var updatedTime;
var updatedTotalTime;
var difference;
var totalDifference;
var tInterval;
var tIntervalTotal;
var savedTime;
var totalSavedTime;

var started;
var state = 0; // for tracking each stage of breathing exercise
var totalTimerState;
var round;
let tableRef;
let newRow;
var paused;
var holdTimes = [];
var minValue;
var secValue;
var CSRF_TOKEN;
window.onload = function() {
    CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');
    TweenMax.from(".innerCircle", 1.5, { opacity: "0", y: "-250%", ease: Bounce.easeOut });

    tableRef = document.getElementById('tableBody');

    startTimerButton = document.querySelector('.startTimer');
    pauseTimerButton = document.querySelector('.pauseTimer');
    secondsCircle = document.querySelector('.secondCircle');
    timerDisplay = document.querySelector('.timer');
    totalTimerDisplay = document.querySelector('.timerTotal');
    paused = 0;
    running = 0;
    state = 0;
    totalTimerState = true;
    round = 1;

    document.body.onkeydown = function(e) {

        if (e.keyCode == 32) { // space bar starts and changes stages
            if (paused == 0) { // prevent keyboard space bar when paused
                startTimer();
            }
        } else if (e.keyCode == 80) { // key 'p' pauses
            pauseTimer();
        }

        if (e.keyCode == 82 && paused == 1) { // if paused 'r' key resets timer
            resetTimer();
        }

        if (e.keyCode == 83 && paused == 1) { // if paused 's' key saves session
            save();
        }
    }
}

function startTimer() {
    started = 1;
    timerDisplay.style.opacity = "1";
    totalTimerDisplay.style.opacity = "1";
    document.querySelector('.roundsContainer').style.opacity = "0.8";
    document.getElementById('pauseButton').style.opacity = "1";
    secondsCircle.style.webkitAnimation = "";
    secondsCircle.style.webkitAnimationPlayState = "running";
    if (tInterval == undefined) {
        tInterval = setInterval(getShowTime, 1);
        tIntervalTotal = setInterval(totalTime, 1);

    }

    savedTime = undefined;
    if (state == 0) {
        startTime = new Date().getTime();
        if (round > 1) {
            let squeezeCell = newRow.insertCell(3);
            var timerValue = timerDisplay.innerHTML;
            let timedValue = document.createTextNode(timerValue);
            squeezeCell.appendChild(timedValue);
        }
        newRow = tableRef.insertRow(0);
        let roundCell = newRow.insertCell(0);
        let roundValue = document.createTextNode(round);
        roundCell.appendChild(roundValue);
        startTimerButton.innerHTML = "BREATHE";
        //state = 1;
    } else if (state == 1) {
        startTimerButton.innerHTML = "HOLD";
        let hofCell = newRow.insertCell(1);
        var timerValue = timerDisplay.innerHTML;
        let timedValue = document.createTextNode(timerValue);
        hofCell.appendChild(timedValue);
        startTime = new Date().getTime();
    } else if (state == 2) {

        //push minutes and seconds as individual values to an array object
        holdTimes.push({ min: minValue, sec: secValue });
        //console.log(holdTimes[round - 1].min + ":" + holdTimes[round - 1].sec);

        session_best_hold();
        session_avg_hold();

        startTimerButton.innerHTML = "SQUEEZE";
        let holdCell = newRow.insertCell(2);
        var timerValue = timerDisplay.innerHTML;
        let timedValue = document.createTextNode(timerValue);
        holdCell.appendChild(timedValue);

        startTime = new Date().getTime();
    }
    state++;
    if (state > 2) {

        state = 0;
        addRowToArray();
        round++;
    }
}

function addRowToArray() {

}

function pauseTimer() {
    if (started == 1) {
        secondsCircle.style.webkitAnimationPlayState = "paused";
        startTimerButton.innerHTML = "PAUSED";
        if (paused == 0) {
            document.getElementById('stageButton').onclick = null;
            document.getElementById('resetButton').style.opacity = "1";
            document.getElementById('saveButton').style.opacity = "1";
            document.getElementById('pauseButton').innerHTML = "Unpause"
            timerDisplay.style.opacity = "0.3";
            totalTimerDisplay.style.opacity = "0.3";
            document.querySelector('.roundsContainer').style.opacity = "0.3";
            clearInterval(tInterval);
            clearInterval(tIntervalTotal);
            savedTime = difference;
            difference = 0;
            totalSavedTime = totalDifference;
            totalDifference = 0;
            tInterval = undefined;
            tIntervalTotal = undefined;
            paused = 1;
        } else {
            document.getElementById('pauseButton').innerHTML = "Pause"
            document.getElementById('resetButton').style.opacity = "0";
            document.getElementById('saveButton').style.opacity = "0";
            document.getElementById('stageButton').onclick = startTimer;
            timerDisplay.style.opacity = "1";
            totalTimerDisplay.style.opacity = "1";
            document.querySelector('.roundsContainer').style.opacity = "0.8";
            secondsCircle.style.webkitAnimationPlayState = "running";
            if (state == 1) {
                startTimerButton.innerHTML = "BREATHE";
            } else if (state == 2) {
                startTimerButton.innerHTML = "HOLD";
            } else if (state == 0) {
                startTimerButton.innerHTML = "SQUEEZE";
            }
            totalStartTime = new Date().getTime();
            startTime = new Date().getTime();
            tInterval = setInterval(getShowTime, 1);
            tIntervalTotal = setInterval(totalTime, 1);
            paused = 0;
        }
    }
}

function resetTimer() {
    pauseTimer();
    document.getElementById('pauseButton').style.opacity = "0.3";
    secondsCircle.style.webkitAnimation = "none";
    startTimerButton.innerHTML = "START";
    savedTime = undefined;
    totalSavedTime = undefined;
    clearInterval(tInterval);
    clearInterval(tIntervalTotal);
    tInterval = undefined;
    tIntervalTotal = undefined;
    state = 0;
    totalTimerState = true;
    round = 1;
    timerDisplay.innerHTML = '00:00';
    totalTimerDisplay.innerHTML = '0:00:00';
    tableRef.innerHTML = "";
    started = undefined;
    avg_hold_min = 0;
    avg_hold_sec = 0;
    sessionTimeHour = 0;
    sessionTimeMin = 0;
    sessionTimesec = 0;
    best_hold_min = 0;
    best_hold_sec = 0;
    holdTimes = [];
}

function getShowTime() {

    updatedTime = new Date().getTime();
    if (savedTime) {
        difference = (updatedTime - startTime) + savedTime;
    } else {
        difference = updatedTime - startTime;
    }

    //var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((difference % (1000 * 60)) / 1000);

    minValue = minutes;
    secValue = seconds;
    // if (hours == 1) {
    //     alert("One Hour!");
    // }

    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    timerDisplay.innerHTML = minutes + ':' + seconds;

}

function totalTime() {
    if (totalTimerState) {
        totalStartTime = startTime
        totalTimerState = false;

    }
    updatedTotalTime = new Date().getTime();



    if (totalSavedTime) {
        totalDifference = (updatedTotalTime - totalStartTime) + totalSavedTime;
    } else {
        totalDifference = updatedTotalTime - totalStartTime;
    }

    //console.log(totalDifference);

    var hours = Math.floor((totalDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((totalDifference % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((totalDifference % (1000 * 60)) / 1000);
    sessionTimeHour = hours;
    sessionTimeMin = minutes;
    sessionTimesec = seconds;

    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    if (hours == 1) {

        totalTimerDisplay.innerHTML = hours + ":" + minutes + ':' + seconds + "<br>One Hour! You Beast!";
    } else {
        totalTimerDisplay.innerHTML = hours + ":" + minutes + ':' + seconds;
    }
}

function toggleLogOut(user) {


    if (user == 'guest') {
        var logout = document.getElementById('menuModalGuest').classList.toggle('menuTogg');

    } else {
        var logout = document.getElementById('menuModalLoggedIn').classList.toggle('menuTogg');

    }

}

var sessionTimeHour = 0;
var sessionTimeMin = 0;
var sessionTimesec = 0;

function sessionDuration() {

}


var best_hold_min = 0;
var best_hold_sec = 0;

function session_best_hold() {


    for (i = 0; i < holdTimes.length; i++) {
        if (holdTimes[i].min >= best_hold_min) {
            if (holdTimes[i].sec >= best_hold_sec) {
                best_hold_min = holdTimes[i].min;
                best_hold_sec = holdTimes[i].sec;
                //console.log(best_hold_min + " : " + best_hold_sec);
            }
        }

        // if (holdTimes[i].min >= best_hold_min && holdTimes[i].sec >= best_hold_sec) {
        //     best_hold_min = holdTimes[i].min;
        //     best_hold_sec = holdTimes[i].sec;

        // }

    }

}

var avg_hold_min = 0;
var avg_hold_sec = 0;

function session_avg_hold() {

    var mins = 0;
    var tempSec = 0;

    for (i = 0; i < holdTimes.length; i++) {
        mins += holdTimes[i].min;
        tempSec += holdTimes[i].sec;
    }

    console.log("totals: " + mins + " : " + tempSec);
    var minSecs = mins * 60;
    var totsAvg = (minSecs + tempSec) / holdTimes.length;
    avg_hold_min = Math.floor(totsAvg / 60);
    avg_hold_sec = totsAvg % 60;
    //console.log(mins + " " + totsAvg);
    console.log("averaged: " + avg_hold_min + " : " + avg_hold_sec);
}


function save() {
    //console.log("saved");

    //

    $.ajax({
        type: 'POST',
        url: '/ajaxRequests/ajaxSaveTimes',
        data: {
            _token: CSRF_TOKEN,
            'HMin': best_hold_min,
            'HSec': best_hold_sec,
            'THour': sessionTimeHour,
            'TMin': sessionTimeMin,
            'TSec': sessionTimesec,
            'AVHMin': avg_hold_min,
            'AVHSec': avg_hold_sec

        },
        dataType: 'text',
        success: function(data) {
            console.log("ajax success");
            //console.log("success", data);
            window.location.href = "/home";

        },
        error: function(data) {
            //var errors = $.parseJSON(data.responseText);
            console.log("fail");
            console.log(data);
        }
    });


    //resetTimer();

}

var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');


function deleteSession(id) {
    //console.log("delete function " + id);
    if (confirm("Delete Session?")) {


        $.ajax({
            type: 'POST',
            url: '/ajaxRequests/ajaxDeleteSession/' + id,
            data: {
                _token: CSRF_TOKEN

            },
            dataType: 'text',
            success: function(data) {
                //console.log("ajax success");
                //console.log("success", data);
                window.location.href = "/home";

            },
            error: function(data) {
                //var errors = $.parseJSON(data.responseText);
                console.log("fail");
                console.log(data);
            }
        });
    }
}