// Efecto Matrix de fondo
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
const fontSize = 18;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#0f0';
    ctx.font = fontSize + 'px monospace';
    
    for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 33);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Control de música
const music = document.getElementById('background-music');
const musicToggle = document.getElementById('music-toggle');
const musicIcon = document.getElementById('music-icon');
let isPlaying = false;

// Intentar reproducir automáticamente
function tryAutoplay() {
    music.volume = 0.3; // Volumen al 30%
    music.play().then(() => {
        isPlaying = true;
        musicIcon.textContent = '🔊';
    }).catch(() => {
        // Si el navegador bloquea el autoplay, esperar interacción del usuario
        isPlaying = false;
        musicIcon.textContent = '🔇';
    });
}

// Iniciar cuando se carga la página
window.addEventListener('load', tryAutoplay);

// Control manual de música
musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        music.pause();
        musicIcon.textContent = '🔇';
        isPlaying = false;
    } else {
        music.play();
        musicIcon.textContent = '🔊';
        isPlaying = true;
    }
});