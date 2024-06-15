// Import our custom SCSS styles
import '../scss/styles.scss';

// Import all of Bootstrap's JS (assuming Bootstrap JS is imported via ES modules)
import * as bootstrap from 'bootstrap';

// Wait for the DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get references to DOM elements
    const audio = document.getElementById('audio');
    const playButton = document.getElementById('play');
    const pauseButton = document.getElementById('pause');
    const stopButton = document.getElementById('stop');
    const volumeControl = document.getElementById('volume');
    const seeker = document.getElementById('seeker');
    const timeDetails = document.getElementById('time-details');
    
    // Get references to metadata elements
    const titleElement = document.getElementById('title');
    const artistElement = document.getElementById('artist');
    const albumElement = document.getElementById('album');
    const yearElement = document.getElementById('year');

    // When metadata of the audio is loaded, display the metadata information
    audio.addEventListener('loadedmetadata', () => {
        titleElement.textContent = audio.title || 'Unknown';
        artistElement.textContent = audio.artist || 'Unknown';
        albumElement.textContent = audio.album || 'Unknown';
        yearElement.textContent = audio.year || 'Unknown';
    });

    // Event listener for play button click
    playButton.addEventListener('click', () => {
        audio.play();
    });

    // Event listener for pause button click
    pauseButton.addEventListener('click', () => {
        audio.pause();
    });

    // Event listener for stop button click
    stopButton.addEventListener('click', () => {
        audio.pause();
        audio.currentTime = 0;
    });

    // Event listener for volume control input
    volumeControl.addEventListener('input', (event) => {
        audio.volume = event.target.value;
    });

    // Event listener for seeker (progress bar) input
    seeker.addEventListener('input', (event) => {
        audio.currentTime = (audio.duration / 100) * event.target.value;
    });

    // Update seeker and time details during audio playback
    audio.addEventListener('timeupdate', () => {
        seeker.value = (audio.currentTime / audio.duration) * 100;
        const currentMinutes = Math.floor(audio.currentTime / 60);
        const currentSeconds = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
        const durationMinutes = Math.floor(audio.duration / 60);
        const durationSeconds = Math.floor(audio.duration % 60).toString().padStart(2, '0');
        timeDetails.textContent = `${currentMinutes}:${currentSeconds} / ${durationMinutes}:${durationSeconds}`;
    });

    // Reset seeker and time details at the end of audio playback
    audio.addEventListener('ended', () => {
        seeker.value = 0;
        timeDetails.textContent = '';
    });
});
