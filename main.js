async function initHubPage() {
    try {
        const [configRes, linksRes] = await Promise.all([
            fetch('./config.json'),
            fetch('./links.json')
        ]);

        const config = await configRes.json();
        const links = await linksRes.json();

        // Мета и обычный статичный заголовок вкладки
        document.getElementById('meta-theme').content = config.meta.themeColor;
        document.getElementById('meta-og-title').content = config.meta.title;
        document.getElementById('meta-og-desc').content = config.meta.description;
        document.title = config.meta.title;

        // Генерация списка папок/биолинков
        const linksContainer = document.getElementById('links-container');
        linksContainer.innerHTML = links.map(link => `
            <a href="${link.url}">${link.text}</a>
        `).join('');

        const overlay = document.getElementById('overlay');
        const mainContent = document.getElementById('main-content');
        const audio = document.getElementById('bg-music');

        // Устанавливаем конкретный трек из конфига
        audio.src = config.audio.src;

        overlay.addEventListener('click', () => {
            overlay.style.opacity = '0';
            overlay.style.pointerEvents = 'none';

            audio.volume = config.audio.volume;
            audio.play().catch(err => console.log("Музыка заблокирована браузером:", err));

            setTimeout(() => {
                mainContent.style.opacity = '1';
                setTimeout(() => overlay.remove(), 1000);
            }, 500);
        });

    } catch (error) {
        console.error("Ошибка загрузки главного хаба:", error);
    }
}

initHubPage();