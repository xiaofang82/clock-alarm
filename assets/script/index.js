'user strict'

function onEvent(event, selector, callback){
    return selector.addEventListener(event,callback);
}

function select(selector,parent = document){
    return parent.querySelector(selector);
}

function selectById(selector,parent = document){
    return parent.getElementById(selector);
}

function selectAll(selector,parent = document){
    return [...parent.querySelectorAll(selector)];
}

function create(element,parent=document){
    return parent.createElement(element);
}

const clock = select('.clock');
const hour = selectById('hour');
const minute = selectById('minute');
const btnAlarm = selectById('btn-alarm');
const mydate = new Date();
const alarm = selectById('alarm');
const alarmSong = new Audio('./assets/audio/alarm_clock_beeps.mp3');
let flag = 0;

clock.innerHTML = mydate.toTimeString().substring(0,5);
setInterval(function(){
    const mydate = new Date();
    
    clock.innerHTML = mydate.toTimeString().substring(0,5);

    if(mydate.toTimeString().substring(0,5) == alarm.innerHTML && clock.classList.contains('change-color')==false && flag == 0){
        alarmSong.play();
        clock.classList.add('change-color');
        console.log(clock.classList);
        flag = 1;
    } else {
        clock.classList.remove('change-color');
    }

},7_000);

onEvent('keyup', hour, function(event){
    if(!(event.target.value.trim()>=0 && event.target.value.trim()<24)) {
        event.target.value = '';
        event.target.focus();
    }
});

onEvent('keyup', minute, function(event){
    if(!(event.target.value.trim()>=0 && event.target.value.trim()<60)) {
        event.target.value = '';
        event.target.focus();
    }
});

onEvent('click', btnAlarm, function(event){
    alarm.innerHTML = hour.value.toString().padStart(2, '0') + ":" + minute.value.toString().padStart(2, '0');
    flag = 0;
});