(function () {

  const clock = document.getElementById('clockDiv');
  const start = document.getElementById('start');
  const reset = document.getElementById('reset');
  const plus = document.getElementById('plus');
  const minus = document.getElementById('minus');
  const count = document.getElementById('count');
  const timeLeft = document.getElementById('timeLeft');
  const border = document.getElementById('border');
  const potato = document.getElementById('potato');
  const breakMinus = document.getElementById('breakMinus');
  const breakPlus = document.getElementById('breakPlus');
  const breakCount = document.getElementById('breakCount');
  const statusText = document.getElementById('statusText');
  const completedPotatoes = document.getElementById('completedPotatoes');
  const ding = document.getElementById('ding');
  let minutes = 1440; // In seconds
  let seconds = 60;
  let counter = 0;
  let timer;
  let total = 0;
  let checkClicks = 0;
  let selectedMinutesTimer = 1440; // In seconds
  let selectedMinutesBreak = 300; // In seconds

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
        completedPotatoes.innerHTML +=
          '<img src="http://img14.deviantart.net/8608/i/2015/198/5/5/kawaii_potato_by_otakucamaro-d7tsf30.png" height="30px" width="30px">';
        minutes = (parseInt(breakCount.innerHTML) - 1) * 60;
        seconds = 60;
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