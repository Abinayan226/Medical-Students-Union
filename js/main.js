tailwind.config = {
    theme: {
        extend: {
            colors: {
                navy: {
                    800: '#002147',
                    900: '#001733',
                },
                maroon: {
                    700: '#800000',
                    800: '#660000',
                },
                gold: {
                    500: '#D4AF37',
                    600: '#B89628',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const currentDate = document.getElementById('current-date');
    currentDate.innerText = new Date().toLocaleDateString('en-US', {
        weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
    });

    function switchPage(pageId) {
        document.querySelectorAll('.page-section').forEach(page => page.classList.remove('active'));
        const page = document.getElementById('page-' + pageId);
        if (page) page.classList.add('active');

        document.querySelectorAll('.nav-btn').forEach(button => button.classList.remove('active-nav'));
        const activeNav = document.getElementById('nav-' + pageId);
        if (activeNav) activeNav.classList.add('active-nav');

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function toggleMobileMenu() {
        document.getElementById('mobileMenu').classList.toggle('hidden');
    }

    function openModal(title, text) {
        document.getElementById('modalTitle').innerText = title;
        document.getElementById('modalContent').innerText = text;
        const modal = document.getElementById('infoModal');
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }

    function closeModal() {
        const modal = document.getElementById('infoModal');
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }

    document.addEventListener('click', event => {
        if (!(event.target instanceof Element)) return;

        const control = event.target.closest('[data-page], [data-toggle-menu], [data-modal-title], [data-modal-close]');
        if (!control) return;

        if (control.hasAttribute('data-page')) {
            event.preventDefault();
            switchPage(control.dataset.page);
            if (control.hasAttribute('data-close-menu')) toggleMobileMenu();
        } else if (control.hasAttribute('data-toggle-menu')) {
            toggleMobileMenu();
        } else if (control.hasAttribute('data-modal-title')) {
            openModal(control.dataset.modalTitle, control.dataset.modalText);
        } else if (control.hasAttribute('data-modal-close')) {
            closeModal();
        }
    });

    const logoFallbacks = {
        university: '<circle cx="50" cy="50" r="48" fill="#00a8e8"/><circle cx="50" cy="50" r="38" fill="#ffeb3b"/><text x="50" y="55" font-size="12" text-anchor="middle" font-weight="bold" fill="#000">UOJ</text>',
        faculty: '<circle cx="50" cy="50" r="48" fill="#800000"/><circle cx="50" cy="50" r="40" fill="none" stroke="#fff" stroke-width="2"/><text x="50" y="55" font-size="11" text-anchor="middle" font-weight="bold" fill="#fff">FACULTY</text>',
        msu: '<circle cx="50" cy="50" r="48" fill="#D4AF37"/><text x="50" y="55" font-size="14" text-anchor="middle" font-weight="bold" fill="#002147">MSU</text>'
    };

    document.querySelectorAll('[data-logo-fallback]').forEach(image => {
        image.addEventListener('error', () => {
            if (image.dataset.fallbackApplied) return;
            image.dataset.fallbackApplied = 'true';
            const fallback = logoFallbacks[image.dataset.logoFallback];
            if (fallback) {
                image.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
                    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">' + fallback + '</svg>'
                );
            }
        });
    });

    switchPage('home');
});