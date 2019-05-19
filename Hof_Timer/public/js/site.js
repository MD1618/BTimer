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

window.onload = function() {
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
        console.log(holdTimes[round - 1].min + ":" + holdTimes[round - 1].sec);

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


/// ---------------------