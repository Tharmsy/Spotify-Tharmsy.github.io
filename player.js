const audio = document.getElementById('audio');
const cover = document.getElementById('cover');
const play = document.getElementById('play');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const volumeSlider = document.getElementById('volume-slider');
const volumeTooltip = document.getElementById('volume-tooltip');
const progressSlider = document.getElementById('progress-slider');
const currentTimeDisplay = document.getElementById('current-time');
const totalTimeDisplay = document.getElementById('total-time');
const toggleTheme = document.getElementById('toggle-theme');

let isPlaying = false;
let progressUpdateInterval;

const songs = [
  { src: 'songs/1.mp3', cover: 'covers/1.jpg' },
  { src: 'songs/2.mp3', cover: 'covers/2.jpg' },
];
let songIndex = 0;

const repeat = document.getElementById('repeat');

let isRepeating = false;

function toggleRepeat() {
  isRepeating = !isRepeating;
  audio.loop = isRepeating;
  repeat.style.opacity = isRepeating ? '0.8' : '0.4';
}

repeat.addEventListener('click', toggleRepeat);

repeat.style.opacity = '0.4';


function loadSong() {
  audio.src = songs[songIndex].src;
  cover.src = songs[songIndex].cover;
}

function playSong() {
  isPlaying = true;
  audio.play();
  play.innerHTML = '&#10074;&#10074;';
  progressUpdateInterval = setInterval(updateProgress, 1000);
}

function pauseSong() {
  isPlaying = false;
  audio.pause();
  play.innerHTML = '&#9658;';
  clearInterval(progressUpdateInterval);
}

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong();
  if (isPlaying) {
    playSong();
  }
}

function nextSong() {
  songIndex++;
  if (songIndex >= songs.length) {
    songIndex = 0;
  }
  loadSong();
  if (isPlaying) {
    playSong();
  }
}

function setVolume() {
  audio.volume = volumeSlider.value;
  volumeTooltip.textContent = Math.round(volumeSlider.value * 100) + '%';
}

function updateProgress() {
  const progress = (audio.currentTime / audio.duration) * 100;
  progressSlider.value = progress;

  currentTimeDisplay.textContent = formatTime(audio.currentTime);
  totalTimeDisplay.textContent = formatTime(audio.duration);
}

function setProgress(event) {
  const progress = event.target.value;
  audio.currentTime = (progress / 100) * audio.duration;
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

function toggleDarkTheme() {
  document.body.classList.toggle('dark-theme');
}

loadSong();

play.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));
prev.addEventListener('click', prevSong);
next.addEventListener('click', nextSong);
volumeSlider.addEventListener('input', setVolume);
progressSlider.addEventListener('input', setProgress);
audio.addEventListener('ended', nextSong);
toggleTheme.addEventListener('click', toggleDarkTheme);
