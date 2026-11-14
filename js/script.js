// Portfolio interactions: theme, navigation, scroll reveal, contact form.
// No libraries. EmailJS is loaded only when someone sends a message.

(function () {
    'use strict';

    const root = document.documentElement;

    /* ---------- Theme ---------- */
    const themeBtn = document.querySelector('.theme-toggle');
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

    function currentTheme() {
        const set = root.getAttribute('data-theme');
        if (set === 'light' || set === 'dark') return set;
        return darkQuery.matches ? 'dark' : 'light';
    }

    function syncThemeButton() {
        if (!themeBtn) return;
        const next = currentTheme() === 'dark' ? 'light' : 'dark';
        themeBtn.setAttribute('aria-label', 'Switch to ' + next + ' mode');
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const next = currentTheme() === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-theme', next);
            try { localStorage.setItem('theme', next); } catch (e) { /* storage blocked */ }
            syncThemeButton();
        });
        darkQuery.addEventListener('change', syncThemeButton);
        syncThemeButton();
    }

    /* ---------- Header shadow on scroll ---------- */
    const header = document.querySelector('.site-header');
    const onScroll = () => {
        if (header) header.classList.toggle('scrolled', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

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
        navLinks.addEventListener('click', (e) => {
            if (e.target.closest('a')) setMenu(false);
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') setMenu(false);
        });
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav')) setMenu(false);
        });
    }

    /* ---------- Active nav link + scroll reveal ---------- */
    const reveals = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in');
                    obs.unobserve(entry.target);
                }
            });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
        reveals.forEach((el) => revealObserver.observe(el));

        const links = new Map();
        document.querySelectorAll('.nav-links a[href^="#"]').forEach((a) => {
            links.set(a.getAttribute('href').slice(1), a);
        });
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const link = links.get(entry.target.id);
                if (!link) return;
                if (entry.isIntersecting) {
                    links.forEach((l) => l.classList.remove('active'));
                    link.classList.add('active');
                }
            });
        }, { rootMargin: '-45% 0px -50% 0px' });
        links.forEach((_, id) => {
            const section = document.getElementById(id);
            if (section) sectionObserver.observe(section);
        });
    } else {
        reveals.forEach((el) => el.classList.add('in'));
    }

    /* ---------- Contact form ---------- */
    const form = document.getElementById('contact-form');
    if (!form) return;

    const submitBtn = document.getElementById('submit-btn');
    const label = submitBtn.querySelector('.btn-label');
    const status = document.getElementById('form-status');
    const config = window.PORTFOLIO_CONFIG || {};
    const toEmail = (config.contact && config.contact.email) || 'nuwaherezapeter34@gmail.com';
    const EMAILJS_SRC = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3.11.0/dist/email.min.js';

    let emailjsReady = null;
    function loadEmailJS() {
        if (window.emailjs) return Promise.resolve(window.emailjs);
        if (emailjsReady) return emailjsReady;
        emailjsReady = new Promise((resolve, reject) => {
            const s = document.createElement('script');
            s.src = EMAILJS_SRC;
            s.async = true;
            s.onload = () => (window.emailjs ? resolve(window.emailjs) : reject(new Error('EmailJS missing')));
            s.onerror = () => reject(new Error('EmailJS failed to load'));
            document.head.appendChild(s);
        });
        return emailjsReady;
    }

    function emailjsConfigured() {
        const e = config.emailjs || {};
        return Boolean(e.publicKey && e.serviceId && e.templateId &&
            !String(e.publicKey).startsWith('YOUR_'));
    }

    // Start loading EmailJS when the visitor starts typing.
    form.addEventListener('focusin', () => {
        if (emailjsConfigured()) loadEmailJS().catch(() => {});
    }, { once: true });

    function setStatus(text, kind) {
        status.textContent = text;
        status.className = 'form-status' + (kind ? ' ' + kind : '');
    }

    function validate() {
        let firstBad = null;
        form.querySelectorAll('input, textarea').forEach((field) => {
            const ok = field.checkValidity() && field.value.trim() !== '';
            field.setAttribute('aria-invalid', String(!ok));
            if (!ok && !firstBad) firstBad = field;
        });
        if (firstBad) firstBad.focus();
        return !firstBad;
    }

    function mailtoFallback(data) {
        const body = 'From: ' + data.from_name + ' (' + data.from_email + ')\n\n' + data.message;
        window.location.href = 'mailto:' + toEmail +
            '?subject=' + encodeURIComponent(data.subject) +
            '&body=' + encodeURIComponent(body);
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!validate()) {
            setStatus('Please fill in every field with a valid email address.', 'error');
            return;
        }

        const fd = new FormData(form);
        const data = {
            from_name: fd.get('from_name').trim(),
            from_email: fd.get('from_email').trim(),
            subject: fd.get('subject').trim(),
            message: fd.get('message').trim(),
            to_name: (config.contact && config.contact.name) || 'Nuwahereza Peter',
            to_email: toEmail
        };

        if (!emailjsConfigured()) {
            setStatus('Opening your email app…', 'ok');
            mailtoFallback(data);
            return;
        }

        submitBtn.disabled = true;
        label.textContent = 'Sending…';
        setStatus('', '');

        try {
            const emailjs = await loadEmailJS();
            emailjs.init(config.emailjs.publicKey);
            await emailjs.send(config.emailjs.serviceId, config.emailjs.templateId, data);
            setStatus("Thanks, your message was sent. I'll reply by email.", 'ok');
            form.reset();
            form.querySelectorAll('[aria-invalid]').forEach((f) => f.removeAttribute('aria-invalid'));
        } catch (err) {
            setStatus('Sorry, the message did not send. Please email me at ' + toEmail + '.', 'error');
        } finally {
            submitBtn.disabled = false;
            label.textContent = 'Send message';
        }
    });
})();
