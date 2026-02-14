document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const startScreen = document.getElementById('start-screen');
    const mainContent = document.getElementById('main-content');
    const startBtn = document.getElementById('start-btn');
    const audio = document.getElementById('valentine-song');
    const musicBubble = document.getElementById('music-control');
    const musicIcon = document.getElementById('music-icon');
    const heartsContainer = document.getElementById('hearts-container');

    // 1. Loading Screen (3 Detik)
    setTimeout(() => {
        loader.style.transition = 'opacity 1s';
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            startScreen.classList.remove('hidden-screen');
            startScreen.classList.add('show-screen');
        }, 1000);
    }, 3000);

    // 2. Klik Tombol Start (Bypass Autoplay & Masuk)
    startBtn.addEventListener('click', () => {
        // Putar musik (Ed Sheeran - Perfect)
        audio.play().catch(e => console.log("Audio play failed", e));

        // Sembunyikan start screen, tampilkan konten utama
        startScreen.style.transition = 'opacity 1s';
        startScreen.style.opacity = '0';

        setTimeout(() => {
            startScreen.style.display = 'none';
            mainContent.classList.remove('hidden-screen');

            // Tampilkan bubble music
            musicBubble.style.display = 'flex';

            // Jalankan animasi hati dan reveal scroll
            createFloatingHearts();
            handleReveal();
        }, 1000);
    });

    // 3. Kontrol Bubble Music (Pause/Play)
    let isPlaying = true;
    musicBubble.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            musicIcon.textContent = '🎵';
            isPlaying = false;
        } else {
            audio.play();
            musicIcon.textContent = '⏸️';
            isPlaying = true;
        }
    });

    // 4. Scroll Reveal Logic
    function handleReveal() {
        const reveals = document.querySelectorAll('.reveal');
        const windowHeight = window.innerHeight;

        reveals.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                el.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', handleReveal);

    // 5. Floating Hearts Animation
    function createFloatingHearts() {
        setInterval(() => {
            const heart = document.createElement('div');
            heart.style.cssText = `
                position: absolute;
                bottom: -20px;
                left: ${Math.random() * 100}vw;
                color: #ff69b4;
                opacity: 0.6;
                font-size: ${Math.random() * 20 + 10}px;
                animation: floatUp ${Math.random() * 3 + 3}s linear forwards;
                pointer-events: none;
                z-index: -1;
            `;
            heart.innerHTML = '❤️';
            heartsContainer.appendChild(heart);

            setTimeout(() => heart.remove(), 6000);
        }, 400);
    }
});

// Extra animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% { transform: translateY(0) scale(0); opacity: 0; }
        20% { opacity: 0.6; }
        100% { transform: translateY(-110vh) scale(1.5); opacity: 0; }
    }
`;
document.head.appendChild(style);
