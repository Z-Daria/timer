const play = document.getElementById('play');
const pause = document.getElementById('pause');
const reset = document.getElementById('reset');
const standardMode = document.getElementById('standard');
const shortMode = document.getElementById('short');
const longMode = document.getElementById('long');
const minutesContainer = document.getElementById('minutes');
const secondsContainer = document.getElementById('seconds');
const alarm = new Audio('./assets/alarm.mp3');
const modes = document.querySelectorAll('.modes div');



window.onload = function() {
    console.log(document.querySelectorAll('#long'));
    let time, 
        timer,
        mode;

    standardMode.onclick = function() {
        clearInterval(timer);
        mode = 'standard';
        minutesContainer.innerHTML = '25';
        secondsContainer.innerHTML = '00';
        time = parseInt(minutesContainer.innerHTML) * 60;
        
        play.style.pointerEvents = 'auto'; // block play button
    };
        
    shortMode.onclick = function() {
        clearInterval(timer);
        mode = 'short';
        minutesContainer.innerHTML = '0';
        secondsContainer.innerHTML = '00';
        time = parseInt(minutesContainer.innerHTML) * 60;
        play.style.pointerEvents = 'auto'; // block play button
    };
        
    longMode.onclick = function() {
        clearInterval(timer);
        mode='long';
        minutesContainer.innerHTML = '10';
        secondsContainer.innerHTML = '00';
        time = parseInt(minutesContainer.innerHTML) * 60;
        play.style.pointerEvents = 'auto'; // block play button
    };

    // function to change color of switched mode button only
    document.addEventListener('click', function(event) {
        for (let mode of modes) {
            if (mode == event.target) {
                mode.style.backgroundColor = '#afab91';
            } else if (mode != event.target && event.target.className == 'mode'){
                mode.style.backgroundColor = 'inherit';
            }
        }
    });

    play.onclick = function() {
        play.style.pointerEvents = 'none';
        timer = setInterval(() => {
            let minutes = time/60%60;
            let seconds = time%60;
            if (time <= 0) {
                clearInterval(timer);
                alarm.play();
            } else {
                let strMinutes = `${Math.trunc(minutes)}`;
                let strSeconds = `${Math.trunc(seconds)}`;
                if (seconds < 10) {
                    strSeconds = `0${Math.trunc(seconds)}`;
                };
                minutesContainer.innerHTML = strMinutes;
                secondsContainer.innerHTML = strSeconds;
                --time;
            };
            
        }, 1000);
        
        pause.onclick = function() {
            clearInterval(timer);
            play.style.pointerEvents = 'auto';
        }
    };

    reset.onclick = function() {
        if (mode == 'standard') {
            standardMode.click();
        } else if (mode == 'short') {
            shortMode.click();
        } else if (mode == 'long') {
            longMode.click();
        }
    };

    standardMode.click();
}



    
