// Noise Floor Nomad - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Theme Toggle
  initThemeToggle();
  
  // Search functionality
  initSearch();
  
  // Table of Contents
  initTOC();
  
  // Copy code buttons
  initCopyCode();
});

// Theme Toggle
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
  }
  
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      // Update icon
      updateThemeIcon(newTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;
  
  if (theme === 'dark') {
    themeToggle.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>`;
  } else {
    themeToggle.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>`;
  }
}

// Search functionality
function initSearch() {
  const searchToggle = document.getElementById('search-toggle');
  const searchOverlay = document.getElementById('search-overlay');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  const searchClose = document.getElementById('search-close');
  
  if (!searchToggle || !searchOverlay) return;
  
  // Toggle search overlay
  searchToggle.addEventListener('click', function() {
    searchOverlay.classList.add('active');
    if (searchInput) searchInput.focus();
  });
  
  // Close search
  function closeSearch() {
    searchOverlay.classList.remove('active');
    if (searchInput) searchInput.value = '';
    if (searchResults) searchResults.innerHTML = '';
  }
  
  if (searchClose) {
    searchClose.addEventListener('click', closeSearch);
  }
  
  // Close on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
      closeSearch();
    }
  });
  
  // Close on overlay click
  searchOverlay.addEventListener('click', function(e) {
    if (e.target === searchOverlay) {
      closeSearch();
    }
  });
  
  // Search functionality
  if (searchInput) {
    let searchData = [];
    
    // Load search data
    fetch('/search.json')
      .then(response => response.json())
      .then(data => {
        searchData = data;
      })
      .catch(error => console.log('Search data not available'));
    
    let searchTimeout;
    searchInput.addEventListener('input', function() {
      clearTimeout(searchTimeout);
      const query = this.value.toLowerCase().trim();
      
      if (query.length < 2) {
        searchResults.innerHTML = '';
        return;
      }
      
      searchTimeout = setTimeout(() => {
        const results = searchData.filter(item => {
          return item.title.toLowerCase().includes(query) || 
                 item.content.toLowerCase().includes(query) ||
                 (item.tags && item.tags.some(tag => tag.toLowerCase().includes(query)));
        });
        
        displayResults(results, query);
      }, 150);
    });
    
    function displayResults(results, query) {
      if (results.length === 0) {
        searchResults.innerHTML = '<p class="empty-state">No signals found matching "' + query + '"</p>';
        return;
      }
      
      const html = results.map(item => `
        <div class="result-item" onclick="window.location.href='${item.url}'">
          <h4>${highlightText(item.title, query)}</h4>
          <p>${highlightText(item.excerpt || item.content.substring(0, 150), query)}...</p>
        </div>
      `).join('');
      
      searchResults.innerHTML = html;
    }
    
    function highlightText(text, query) {
      const regex = new RegExp('(' + query + ')', 'gi');
      return text.replace(regex, '<mark style="background: rgba(0, 212, 255, 0.3); color: inherit; padding: 0 2px; border-radius: 2px;">$1</mark>');
    }
  }
}

// Table of Contents
function initTOC() {
  const toc = document.getElementById('toc');
  if (!toc) return;
  
  const content = document.querySelector('.post-content');
  if (!content) return;
  
  const headings = content.querySelectorAll('h2, h3');
  if (headings.length === 0) {
    toc.parentElement.style.display = 'none';
    return;
  }
  
  const tocList = document.createElement('ul');
  let currentList = tocList;
  let lastLevel = 2;
  
  headings.forEach((heading, index) => {
    const level = parseInt(heading.tagName.charAt(1));
    const id = 'section-' + index;
    heading.id = id;
    
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#' + id;
    a.textContent = heading.textContent;
    a.addEventListener('click', function(e) {
      e.preventDefault();
      heading.scrollIntoView({ behavior: 'smooth' });
      history.pushState(null, null, '#' + id);
    });
    
    li.appendChild(a);
    
    if (level > lastLevel) {
      const ul = document.createElement('ul');
      currentList.lastElementChild.appendChild(ul);
      currentList = ul;
    } else if (level < lastLevel) {
      currentList = tocList;
    }
    
    currentList.appendChild(li);
    lastLevel = level;
  });
  
  toc.appendChild(tocList);
  
  // Highlight active section on scroll
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -80% 0px',
    threshold: 0
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        toc.querySelectorAll('a').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);
  
  headings.forEach(heading => observer.observe(heading));
}

// Copy code functionality
function initCopyCode() {
  const codeBlocks = document.querySelectorAll('pre code');
  
  codeBlocks.forEach(block => {
    const pre = block.parentElement;
    const button = document.createElement('button');
    button.className = 'copy-code-btn';
    button.textContent = 'Copy';
    
    button.addEventListener('click', function() {
      const code = block.textContent;
      navigator.clipboard.writeText(code).then(() => {
        button.textContent = 'Copied!';
        button.style.borderColor = 'var(--accent-cyan)';
        button.style.color = 'var(--accent-cyan)';
        
        setTimeout(() => {
          button.textContent = 'Copy';
          button.style.borderColor = '';
          button.style.color = '';
        }, 2000);
      });
    });
    
    pre.appendChild(button);
  });
}