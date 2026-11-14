// Portfolio interactions. No libraries.
// Theme toggle, sticky header, mobile menu, active nav link, scroll reveal,
// and a small animated network in the hero (paused when off screen).

(function () {
    'use strict';

    const root = document.documentElement;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    /* ---------- Theme (dark by default) ---------- */
    const themeBtn = document.querySelector('.theme-toggle');
    const theme = () => (root.getAttribute('data-theme') === 'light' ? 'light' : 'dark');

    function syncThemeUI() {
        if (themeBtn) {
            themeBtn.setAttribute('aria-label', theme() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
        }
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', theme() === 'dark' ? '#0b0d12' : '#fafafa');
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const next = theme() === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-theme', next);
            try { localStorage.setItem('theme', next); } catch (e) { /* storage blocked */ }
            syncThemeUI();
            network.recolor();
        });
    }
    syncThemeUI();

    /* ---------- Header background once scrolled ---------- */
    const header = document.querySelector('.site-header');
    const onScroll = () => header && header.classList.toggle('scrolled', window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    requestAnimationFrame(onScroll);

    /* ---------- Mobile menu ---------- */
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.getElementById('nav-links');

    function setMenu(open) {
        if (!navToggle || !navLinks) return;
        navLinks.classList.toggle('open', open);
        navToggle.setAttribute('aria-expanded', String(open));
        navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
        navLinks.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('open')) { setMenu(false); navToggle.focus(); }
        });
        document.addEventListener('click', (e) => { if (!e.target.closest('.nav')) setMenu(false); });
        window.matchMedia('(min-width: 761px)').addEventListener('change', () => setMenu(false));
    }

    /* ---------- Scroll reveal + active section ---------- */
    const reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && !reduceMotion.matches) {
        // Fade in as soon as about 12% of an element is on screen.
        const io = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        // Elements already on screen at load are shown at once, without a fade.
        const vh = window.innerHeight;
        reveals.forEach((el) => {
            if (el.getBoundingClientRect().top < vh) el.classList.add('in');
            else io.observe(el);
        });
        root.classList.add('reveal-ready');
    } else {
        reveals.forEach((el) => el.classList.add('in'));
    }

    const links = new Map();
    document.querySelectorAll('.nav-links a[href^="#"]').forEach((a) => links.set(a.hash.slice(1), a));
    if ('IntersectionObserver' in window) {
        const sectionIO = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                links.forEach((l) => { l.classList.remove('active'); l.removeAttribute('aria-current'); });
                const link = links.get(entry.target.id);
                if (link) { link.classList.add('active'); link.setAttribute('aria-current', 'true'); }
            });
        }, { rootMargin: '-40% 0px -55% 0px' });
        document.querySelectorAll('main > section[id]').forEach((s) => sectionIO.observe(s));
    }

    /* ---------- Hero network ---------- */
    const network = (function () {
        const canvas = document.querySelector('.hero-net');
        const noop = { recolor() {} };
        if (!canvas || !canvas.getContext) return noop;
        const ctx = canvas.getContext('2d');
        let w = 0, h = 0, dpr = 1, nodes = [], color = '110,168,254', running = false, raf = 0, visible = true;
        const LINK = 140;

        function readColor() {
            const hex = getComputedStyle(root).getPropertyValue('--accent').trim().replace('#', '');
            if (hex.length === 6) {
                color = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(',');
            }
        }

        function resize() {
            const rect = canvas.getBoundingClientRect();
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            w = rect.width; h = rect.height;
            canvas.width = Math.round(w * dpr);
            canvas.height = Math.round(h * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            const count = Math.min(w < 720 ? 22 : 50, Math.max(14, Math.round((w * h) / 26000)));
            nodes = Array.from({ length: count }, () => ({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.22,
                vy: (Math.random() - 0.5) * 0.22,
                r: Math.random() * 1.4 + 1
            }));
        }

        // Lines are drawn in three opacity bands, one path each, to keep frames cheap.
        const BANDS = [0.08, 0.18, 0.3];
        function draw() {
            ctx.clearRect(0, 0, w, h);
            ctx.lineWidth = 1;
            const paths = BANDS.map(() => new Path2D());
            const max = LINK * LINK;
            for (let i = 0; i < nodes.length; i++) {
                const a = nodes[i];
                for (let j = i + 1; j < nodes.length; j++) {
                    const b = nodes[j];
                    const dx = a.x - b.x, dy = a.y - b.y;
                    const d2 = dx * dx + dy * dy;
                    if (d2 < max) {
                        const band = d2 < max * 0.25 ? 2 : d2 < max * 0.6 ? 1 : 0;
                        paths[band].moveTo(a.x, a.y);
                        paths[band].lineTo(b.x, b.y);
                    }
                }
            }
            paths.forEach((p, k) => {
                ctx.strokeStyle = 'rgba(' + color + ',' + BANDS[k] + ')';
                ctx.stroke(p);
            });
            const dots = new Path2D();
            for (const n of nodes) {
                dots.moveTo(n.x + n.r, n.y);
                dots.arc(n.x, n.y, n.r, 0, Math.PI * 2);
            }
            ctx.fillStyle = 'rgba(' + color + ',0.7)';
            ctx.fill(dots);
        }

        // About 30 frames per second is plenty for slow drift.
        let last = 0;
        function step(t) {
            raf = requestAnimationFrame(step);
            if (t - last < 33) return;
            last = t;
            for (const n of nodes) {
                n.x += n.vx; n.y += n.vy;
                if (n.x < 0 || n.x > w) n.vx *= -1;
                if (n.y < 0 || n.y > h) n.vy *= -1;
            }
            draw();
        }

        function start() {
            if (running || reduceMotion.matches || !visible || document.hidden) return;
            running = true;
            raf = requestAnimationFrame(step);
        }
        function stop() {
            running = false;
            cancelAnimationFrame(raf);
        }

        function init() {
            readColor();
            resize();
            draw();
            start();
        }

        let resizeTimer = 0;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => { resize(); draw(); }, 150);
        });
        document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
        reduceMotion.addEventListener('change', () => (reduceMotion.matches ? stop() : start()));
        if ('IntersectionObserver' in window) {
            new IntersectionObserver(([entry]) => {
                visible = entry.isIntersecting;
                visible ? start() : stop();
            }).observe(canvas);
        }

        // Start well after the page has loaded so it never competes with it.
        const later = () => setTimeout(() => {
            if ('requestIdleCallback' in window) requestIdleCallback(init, { timeout: 1000 });
            else init();
        }, 1500);
        if (document.readyState === 'complete') later();
        else window.addEventListener('load', later, { once: true });

        return { recolor() { readColor(); if (!running) draw(); } };
    })();
})();
