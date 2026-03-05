// Ground Station Alpha - Theme JavaScript
// Technical blog functionality

document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Check for saved theme preference or default to dark
    const currentTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', currentTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Search Functionality
    const searchToggle = document.getElementById('search-toggle');
    const searchOverlay = document.getElementById('search-overlay');
    const searchClose = document.getElementById('search-close');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    let postsData = [];

    // Fetch posts data for search
    fetch('/search.json')
        .then(response => response.json())
        .then(data => { postsData = data; })
        .catch(error => console.log('Search data not available'));

    searchToggle.addEventListener('click', () => {
        searchOverlay.classList.add('active');
        searchInput.focus();
    });

    searchClose.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
        searchInput.value = '';
        searchResults.innerHTML = '';
    });

    searchOverlay.addEventListener('click', (e) => {
        if (e.target === searchOverlay) {
            searchOverlay.classList.remove('active');
        }
    });

    // Search input handler
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const query = e.target.value.toLowerCase();

        if (query.length < 2) {
            searchResults.innerHTML = '';
            return;
        }

        searchTimeout = setTimeout(() => {
            const results = postsData.filter(post => 
                post.title.toLowerCase().includes(query) ||
                post.content.toLowerCase().includes(query) ||
                post.tags.some(tag => tag.toLowerCase().includes(query))
            );

            displayResults(results, query);
        }, 300);
    });

    function displayResults(results, query) {
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="search-result"><p>No transmissions found...</p></div>';
            return;
        }

        searchResults.innerHTML = results.map(post => `
            <div class="search-result" onclick="window.location.href='${post.url}'">
                <div class="search-result-title">${highlightText(post.title, query)}</div>
                <div class="search-result-excerpt">${highlightText(post.excerpt, query)}</div>
            </div>
        `).join('');
    }

    function highlightText(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark style="background: var(--accent-primary); color: var(--bg-primary);">$1</mark>');
    }

    // Table of Contents Generation
    const tocNav = document.getElementById('toc');
    if (tocNav) {
        const headings = document.querySelectorAll('.post-content h2, .post-content h3');

        if (headings.length > 0) {
            const tocList = document.createElement('ul');

            headings.forEach((heading, index) => {
                const id = `heading-${index}`;
                heading.id = id;

                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = `#${id}`;
                a.textContent = heading.textContent;
                a.addEventListener('click', (e) => {
                    e.preventDefault();
                    heading.scrollIntoView({ behavior: 'smooth' });
                });

                li.appendChild(a);
                tocList.appendChild(li);
            });

            tocNav.appendChild(tocList);

            // Active section highlighting
            const observerOptions = {
                root: null,
                rootMargin: '-20% 0px -80% 0px',
                threshold: 0
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id;
                        document.querySelectorAll('.toc-section a').forEach(link => {
                            link.classList.remove('active');
                            if (link.getAttribute('href') === `#${id}`) {
                                link.classList.add('active');
                            }
                        });
                    }
                });
            }, observerOptions);

            headings.forEach(heading => observer.observe(heading));
        } else {
            tocNav.innerHTML = '<p style="color: var(--text-muted); font-size: 0.9rem;">No sections found</p>';
        }
    }

    // Copy Code Button
    document.querySelectorAll('.post-content pre').forEach(pre => {
        const button = document.createElement('button');
        button.className = 'copy-code';
        button.textContent = 'Copy';

        button.addEventListener('click', () => {
            const code = pre.querySelector('code');
            navigator.clipboard.writeText(code.textContent).then(() => {
                button.textContent = 'Copied!';
                button.style.color = 'var(--accent-primary)';

                setTimeout(() => {
                    button.textContent = 'Copy';
                    button.style.color = '';
                }, 2000);
            });
        });

        pre.appendChild(button);
    });

    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const siteNav = document.querySelector('.site-nav');

    if (mobileMenuToggle && siteNav) {
        mobileMenuToggle.addEventListener('click', () => {
            siteNav.classList.toggle('mobile-active');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    // Reading Progress Bar
    const postContent = document.querySelector('.post-content');
    if (postContent) {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: ${getComputedStyle(document.documentElement).getPropertyValue('--header-height')};
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
            z-index: 99;
            transition: width 0.1s;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    // Animate elements on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.post-card, .category-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        fadeObserver.observe(el);
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Cmd/Ctrl + K for search
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            searchOverlay.classList.add('active');
            searchInput.focus();
        }

        // ESC to close search
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
            searchOverlay.classList.remove('active');
        }
    });

    // Satellite counter animation
    const satelliteCount = document.getElementById('satellite-count');
    if (satelliteCount) {
        const target = parseInt(satelliteCount.textContent);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                satelliteCount.textContent = target;
                clearInterval(timer);
            } else {
                satelliteCount.textContent = Math.floor(current);
            }
        }, 30);
    }
});
