// Дерзкие и агрессивные хакерские/киберпанк смайлы для плеера
const faces = ["😈", "💀", "👹", "⚔️", "⛓️", "🔥", "⚡", "🧛‍♀️", "🖕", "🩸", "🔪", "👑", "🕷️", "🖤", "🔮", "🎭", "💣", "🚬", "🛸", "☣️", "🐺", "🐾", "👁️", "🦾", "👾", "🏴‍☠️", "🎪"];

// Символы для эффекта Матрицы (цифры, знаки, катакана, буквы)
const matrixChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZアイウエオカキクケコサシスセソト";

async function initBiolink() {
    try {
        const [configRes, linksRes] = await Promise.all([
            fetch('./config.json'),
            fetch('./links.json')
        ]);
        
        const config = await configRes.json();
        const links = await linksRes.json();

        document.title = config.meta.title;
        const themeMeta = document.getElementById('meta-theme');
        if(themeMeta) themeMeta.content = config.meta.themeColor;
        
        const ogTitle = document.getElementById('meta-og-title');
        const ogDesc = document.getElementById('meta-og-desc');
        if(ogTitle) ogTitle.content = config.meta.title;
        if(ogDesc) ogDesc.content = config.meta.description;

        document.getElementById('profile-name').textContent = config.profile.username;
        document.getElementById('profile-pic').src = config.profile.avatarUrl;

        if (config.profile.badge) {
            document.getElementById('badge-icon').src = config.profile.badge.iconUrl;
            document.getElementById('badge-tooltip').textContent = config.profile.badge.tooltip;
            document.getElementById('badge-wrapper').style.display = 'inline-flex';
        }

        const bgMusic = document.getElementById('bg-music');
        bgMusic.src = config.audio.src;

        const enterScreen = document.getElementById('enter-screen');
        enterScreen.addEventListener('click', () => {
            enterScreen.classList.add('fade-out');
            bgMusic.volume = config.audio.volume;
            bgMusic.play().catch(err => console.log("Music autoplay blocked:", err));
            setTimeout(() => enterScreen.remove(), 800);
        });

        const linksContainer = document.getElementById('links-container');
        linksContainer.innerHTML = links.map(link => `
            <a href="${link.url}" class="link-icon" target="_blank" rel="noopener noreferrer" title="${link.name}">
                <img src="${link.icon}" alt="${link.name}">
            </a>
        `).join('');

        startEffects();

    } catch (error) {
        console.error("Ошибка инициализации биолинка:", error);
    }
}

function startEffects() {
    // Анимация статуса "Now Playing" с бешеным темпом
    const el = document.querySelector(".now-playing");
    if (el) {
        let i = 0;
        setInterval(() => {
            el.textContent = "😈 Playing: " + faces[i];
            i = (i + 1) % faces.length;
        }, 80);
    }

    // Эффект Матрицы (Цифровой дождь через динамические элементы)
    setInterval(() => {
        const drop = document.createElement('div');
        drop.className = 'matrix-drop';
        
        // Рандомный символ из набора Матрицы
        drop.textContent = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        
        // Случайная позиция по горизонтали
        drop.style.left = Math.random() * 100 + '%';
        
        // Разнообразие размеров для создания глубины (3D-эффект кода)
        const size = Math.random() * 14 + 10;
        drop.style.fontSize = size + 'px';
        
        // Фирменные цвета: смесь ядовито-зеленого, фиолетового и белых вспышек
        const colors = ['#00ff00', '#00ff66', '#00ffcc', '#ff00ff', '#ffffff'];
        const chosenColor = colors[Math.floor(Math.random() * colors.length)];
        drop.style.color = chosenColor;
        
        // Добавляем неоновое свечение символам кода
        drop.style.textShadow = `0 0 8px ${chosenColor}, 0 0 15px ${chosenColor}`;
        
        // Рандомная скорость падения
        drop.style.animationDuration = Math.random() * 2 + 3 + 's';
        
        document.body.appendChild(drop);
        
        // Удаляем элемент после падения, чтобы не забивать оперативку
        setTimeout(() => drop.remove(), 5000);
    }, 60); // Скорость генерации новых потоков символов

    // 3D наклон карточки при движении мыши
    const card = document.getElementById('card');
    document.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientY - (r.top + r.height / 2)) / 25;
        const y = ((r.left + r.width / 2) - e.clientX) / 25;
        card.style.transform = `perspective(1000px) rotateX(${x}deg) rotateY(${y}deg)`;
    });

    document.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
}

initBiolink();