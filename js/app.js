'use strict';

(function () {

  var clock = document.getElementById('clockDiv');
  var start = document.getElementById('start');
  var reset = document.getElementById('reset');
  var plus = document.getElementById('plus');
  var minus = document.getElementById('minus');
  var count = document.getElementById('count');
  var timeLeft = document.getElementById('timeLeft');
  var border = document.getElementById('border');
  var potato = document.getElementById('potato');
  var breakMinus = document.getElementById('breakMinus');
  var breakPlus = document.getElementById('breakPlus');
  var breakCount = document.getElementById('breakCount');
  var statusText = document.getElementById('statusText');
  var completedPotatoes = document.getElementById('completedPotatoes');
  var ding = document.getElementById('ding');
  var minutes = 1440; // In seconds
  var seconds = 60;
  var counter = 0;
  var timer = undefined;
  var total = 0;
  var checkClicks = 0;
  var selectedMinutesTimer = 1440; // In seconds
  var selectedMinutesBreak = 300; // In seconds

  start.addEventListener('click', function () {
    if (checkClicks > 0) {
      return;
    }
    checkClicks++;
    startTimer();
  });

  reset.addEventListener('click', function () {
    resetTimer();
  });

  minus.addEventListener('click', function () {
    if (count.innerHTML === '1') {
      return;
    }
    count.innerHTML--;
    minutes = (parseInt(count.innerHTML) - 1) * 60;
    selectedMinutesTimer -= 60;
  });

  plus.addEventListener('click', function () {
    count.innerHTML++;
    minutes = (parseInt(count.innerHTML) - 1) * 60;
    selectedMinutesTimer += 60;
  });

  breakMinus.addEventListener('click', function () {
    if (breakCount.innerHTML === '1') {
      return;
    }
    breakCount.innerHTML--;
  });

  breakPlus.addEventListener('click', function () {
    breakCount.innerHTML++;
  });

  function startTimer() {
    statusText.innerHTML = 'Session';
    border.className = 'center border rainbowBorder';
    potato.className = 'center image';
    total = minutes + seconds;
    total--;
    timer = setTimeout(countDown, 1000);

    function countDown() {
      if (counter === 59) {
        minutes = minutes - 60;
        counter = 0;
        seconds = 59;
      } else if (counter < 59) {
        seconds--;
      }
      if (total === 0) {
        completedPotatoes.innerHTML += '<img src="http://img14.deviantart.net/8608/i/2015/198/5/5/kawaii_potato_by_otakucamaro-d7tsf30.png" height="30px" width="30px">';
        minutes = (parseInt(breakCount.innerHTML) - 1) * 60;
        seconds = 60;
        ding.play();
        clearTimeout(timer);
        startBreak();
        return;
      }
      counter++;
      if (seconds < 10) {
        timeLeft.innerHTML = minutes / 60 + ':' + '0' + seconds;
      } else {
        timeLeft.innerHTML = minutes / 60 + ':' + seconds;
      }
      startTimer();
    }
  }

  function startBreak() {
    total = minutes + seconds;
    total--;
    timer = setTimeout(countDownBreak, 1000);
    statusText.innerHTML = 'Break!';

    function countDownBreak() {
      if (counter === 59) {
        minutes = minutes - 60;
        counter = 0;
        seconds = 59;
      } else if (counter < 59) {
        seconds--;
      }
      if (total === 0) {
        clearTimeout(timer);
        resetTimer();
        return;
      }
      counter++;
      if (seconds < 10) {
        timeLeft.innerHTML = minutes / 60 + ':' + '0' + seconds;
      } else {
        timeLeft.innerHTML = minutes / 60 + ':' + seconds;
      }
      startBreak();
    }
  }

  function resetTimer() {
    border.className = 'center border';
    potato.className = 'center';
    statusText.innerHTML = 'Session';
    clearTimeout(timer);
    minutes = selectedMinutesTimer;
    seconds = 60;
    counter = 0;
    timeLeft.innerHTML = '';
    checkClicks = 0;
    return;
  }
})();
