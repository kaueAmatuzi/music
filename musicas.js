const cards = {
    'travis': 0,  // Índice da música no playlist
    'flow': 1,
    'million': 2,
    'beat': 3,
    'paradise': 4,
    'thefinal': 5,
    'daylight': 6,
    'Anchor': 7,
    'mid': 8, 
    'sun': 9
};

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function () {
        const trackIndex = cards[card.id];
        loadTrack(trackIndex);
        playTrack();
    });
});

const audioPlayer = document.getElementById('audioPlayer');
const playButton = document.getElementById('playButton');
const pauseButton = document.getElementById('pauseButton');
const nextButton = document.getElementById('nextButton');
const rewindButton = document.getElementById('rewindButton');

const playlist = ['travis.mp3', 'flow.mp3', 'million.mp3', 'beat.mp3', 'paradise (2).mp3', 'thefinal.mp3', 'daylight.mp3', 'Anchor.mp3', 'mid.mp3', 'sun.mp3'];
let currentTrack = 0;

// Carrega a faixa atual
function loadTrack(trackIndex) {
    audioPlayer.src = playlist[trackIndex];
    audioPlayer.load(); // Recarrega o áudio
}

// Toca a música
function playTrack() {
    audioPlayer.play();
    playButton.style.display = 'none'; // Esconde o botão de play
    pauseButton.style.display = 'block'; // Mostra o botão de pause
}

// Pausa a música
function pauseTrack() {
    audioPlayer.pause();
    playButton.style.display = 'block'; // Mostra o botão de play
    pauseButton.style.display = 'none'; // Esconde o botão de pause
}

// Para a música e reseta o tempo
function stopTrack() {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    playButton.style.display = 'block'; // Mostra o botão de play
    pauseButton.style.display = 'none'; // Esconde o botão de pause
}

// Avança para a próxima música
function playNextTrack() {
    currentTrack = (currentTrack + 1) % playlist.length;
    loadTrack(currentTrack);
    playTrack();
}

// Volta para a música anterior
function playPreviousTrack() {
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrack);
    playTrack();
}

// Configurações iniciais
playButton.addEventListener('click', playTrack);
pauseButton.addEventListener('click', pauseTrack);
nextButton.addEventListener('click', playNextTrack);
rewindButton.addEventListener('click', playPreviousTrack);

// Inicializa o player com a primeira faixa
loadTrack(currentTrack);
playButton.style.display = 'block';
pauseButton.style.display = 'none';

setInterval(() => {
    const currentTime = audioPlayer.currentTime;
    const totalTime = audioPlayer.duration;
    document.querySelector('.current-time').textContent = formatTime(currentTime);
    document.querySelector('.tot-time').textContent = formatTime(totalTime);
    document.querySelector('.progress-bar').value = (currentTime / totalTime) * 100;
}, 1000);

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}


document.querySelector('.progress-bar').addEventListener('input', function () {
    const newTime = (this.value / 100) * audioPlayer.duration;
    audioPlayer.currentTime = newTime;
});


audioPlayer.addEventListener('ended', playNextTrack);


document.querySelector('.sound-bar').addEventListener('input', function () {
    audioPlayer.volume = this.value / 100;
});
