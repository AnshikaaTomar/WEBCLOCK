// Theme switching functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', savedTheme);
updateThemeIcon();

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
});

function updateThemeIcon() {
    const currentTheme = body.getAttribute('data-theme');
    themeToggle.textContent = currentTheme === 'light' ? '🌙' : '☀️';
}

// Clock
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);
updateClock(); // initial call

// Timer (Countdown)
let timerInterval;
let timerTime = 60; // 1 minute in seconds


function parseTime(input) {
    const [hours, minutes, seconds] = input.split(':').map(Number);
    return (hours || 0) * 3600 + (minutes || 0) * 60 + (seconds || 0);
}

function updateTimerDisplay() {
    const hours = String(Math.floor(timerTime / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((timerTime % 3600) / 60)).padStart(2, '0');
    const seconds = String(timerTime % 60).padStart(2, '0');
    document.getElementById('timer').textContent = `${hours}:${minutes}:${seconds}`;
}

document.getElementById('startTimer').addEventListener('click', () => {
    const input = document.getElementById('timerInput').value;
    timerTime = parseTime(input);
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (timerTime > 0) {
            timerTime--;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            alert('Time\'s up!');
        }
    }, 1000);
});

document.getElementById('stopTimer').addEventListener('click', () => {
    clearInterval(timerInterval);
});

document.getElementById('resetTimer').addEventListener('click', () => {
    clearInterval(timerInterval);
    timerTime = 0;
    updateTimerDisplay();
});


// Stopwatch (Count up)
let stopwatchInterval;
let stopwatchTime = 0;

function updateStopwatch() {
    const hours = String(Math.floor(stopwatchTime / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((stopwatchTime % 3600) / 60)).padStart(2, '0');
    const seconds = String(stopwatchTime % 60).padStart(2, '0');
    document.getElementById('stopwatch').textContent = `${hours}:${minutes}:${seconds}`;
}

document.getElementById('startStopwatch').addEventListener('click', () => {
    clearInterval(stopwatchInterval);
    stopwatchInterval = setInterval(() => {
        stopwatchTime++;
        updateStopwatch();
    }, 1000);
});

document.getElementById('stopStopwatch').addEventListener('click', () => {
    clearInterval(stopwatchInterval);
});

document.getElementById('resetStopwatch').addEventListener('click', () => {
    clearInterval(stopwatchInterval);
    stopwatchTime = 0;
    updateStopwatch();
});
