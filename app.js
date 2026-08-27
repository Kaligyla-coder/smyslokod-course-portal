(function() {
  const data = window.COURSE_DATA || [];
  let currentLessonIndex = 0;
  let activeTab = 'content';

  // DOM Elements
  const navTree = document.getElementById('nav-tree');
  const lessonTitle = document.getElementById('lesson-title');
  const lessonIcon = document.getElementById('lesson-icon');
  const lessonSectionBadge = document.getElementById('lesson-section-badge');
  const breadcrumbSection = document.getElementById('breadcrumb-section');
  const breadcrumbLesson = document.getElementById('breadcrumb-lesson');
  const contentBody = document.getElementById('content-body');
  const transcriptBody = document.getElementById('transcript-body');
  const tabTranscriptBtn = document.getElementById('tab-transcript-btn');
  const tabPresentationBtn = document.getElementById('tab-presentation-btn');
  const tabs = document.querySelectorAll('.tab-btn[data-tab]');
  const prevLessonBtn = document.getElementById('prev-lesson-btn');
  const nextLessonBtn = document.getElementById('next-lesson-btn');
  const prevLessonTitle = document.getElementById('prev-lesson-title');
  const nextLessonTitle = document.getElementById('next-lesson-title');
  const progressPercent = document.getElementById('progress-percent');
  const progressBarFill = document.getElementById('progress-bar-fill');
  const toggleCompleteBtn = document.getElementById('toggle-complete-btn');
  const completeIcon = document.getElementById('complete-icon');
  const completeText = document.getElementById('complete-text');
  const toast = document.getElementById('toast');

  // Search Modal Elements
  const searchModal = document.getElementById('search-modal');
  const searchTrigger = document.getElementById('search-trigger');
  const mobileSearchBtn = document.getElementById('mobile-search-btn');
  const searchCloseBtn = document.getElementById('search-close-btn');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');

  // Mobile Sidebar Elements
  const menuToggle = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebar-overlay');

  // Progress Storage
  function getCompleted() {
    try {
      return JSON.parse(localStorage.getItem('smyslokod_completed') || '{}');
    } catch(e) { return {}; }
  }

  function setCompleted(id, val) {
    const obj = getCompleted();
    if (val) obj[id] = true;
    else delete obj[id];
    localStorage.setItem('smyslokod_completed', JSON.stringify(obj));
    updateProgressUI();
    renderNav();
  }

  function updateProgressUI() {
    const completed = getCompleted();
    const total = data.length;
    const done = Object.keys(completed).length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    if (progressPercent) progressPercent.innerText = pct + '%';
    if (progressBarFill) progressBarFill.style.width = pct + '%';

    const currentId = data[currentLessonIndex]?.id;
    if (completed[currentId]) {
      toggleCompleteBtn.classList.add('completed');
      completeIcon.innerText = '✅';
      completeText.innerText = 'Пройден';
    } else {
      toggleCompleteBtn.classList.remove('completed');
      completeIcon.innerText = '⚪';
      completeText.innerText = 'Отметить как пройденный';
    }
  }

  // Render Nav Sidebar
  function renderNav() {
    const completed = getCompleted();
    navTree.innerHTML = '';
    const sections = {};

    data.forEach((item, idx) => {
      if (!sections[item.section]) sections[item.section] = [];
      sections[item.section].push({ ...item, idx });
    });

    for (const [sectionName, items] of Object.entries(sections)) {
      const secHeader = document.createElement('div');
      secHeader.className = 'nav-section-title';
      secHeader.innerText = sectionName;
      navTree.appendChild(secHeader);

      items.forEach(item => {
        const link = document.createElement('a');
        link.href = '#' + item.id;
        link.className = 'nav-item' + (item.idx === currentLessonIndex ? ' active' : '');
        
        const isDone = completed[item.id];
        link.innerHTML = `
          <span class="nav-item-icon">${item.icon}</span>
          <span class="nav-item-title">${item.title}</span>
          ${isDone ? '<span class="nav-check-indicator">✓</span>' : ''}
        `;
        link.addEventListener('click', (e) => {
          e.preventDefault();
          loadLesson(item.idx);
          if (window.innerWidth <= 1024) closeSidebar();
        });
        navTree.appendChild(link);
      });
    }
  }

  // Toast Function
  function showToast(msg) {
    toast.innerText = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  }

  // Enhance Code and Prompts with Copy Buttons
  function enhanceRenderedMarkdown(container) {
    // Wrap code blocks
    container.querySelectorAll('pre').forEach(pre => {
      if (pre.querySelector('.btn-copy-prompt')) return;
      const btn = document.createElement('button');
      btn.className = 'btn-copy-prompt';
      btn.style.position = 'absolute';
      btn.style.top = '8px';
      btn.style.right = '8px';
      btn.innerHTML = '📋 Копировать';
      btn.addEventListener('click', () => {
        const code = pre.querySelector('code')?.innerText || pre.innerText;
        navigator.clipboard.writeText(code).then(() => showToast('Код скопирован!'));
      });
      pre.appendChild(btn);
    });

    // Detect prompt blocks
    container.querySelectorAll('p, blockquote').forEach(el => {
      const text = el.innerText;
      if (text.includes('Промпт для агента') || text.includes('МОЯ ИДЕЯ:') || text.includes('Склонируй репозиторий')) {
        el.classList.add('prompt-card');
      }
    });

    // Syntax highlighting
    container.querySelectorAll('pre code').forEach((block) => {
      if (window.hljs) hljs.highlightElement(block);
    });
  }

  // Load Lesson
  function loadLesson(index) {
    if (index < 0 || index >= data.length) return;
    currentLessonIndex = index;
    const lesson = data[index];
    window.location.hash = lesson.id;

    // Header & Meta
    lessonTitle.innerText = lesson.title;
    lessonIcon.innerText = lesson.icon || '⚡';
    lessonSectionBadge.innerText = lesson.section || 'Практикум';
    breadcrumbSection.innerText = lesson.section || 'Практикум';
    breadcrumbLesson.innerText = lesson.title;

    // Render Content Tab
    if (window.marked) {
      contentBody.innerHTML = marked.parse(lesson.content || '*Материалы загружаются...*');
    } else {
      contentBody.innerText = lesson.content;
    }
    enhanceRenderedMarkdown(contentBody);

    // Render Transcript Tab
    if (lesson.transcript && lesson.transcript.trim().length > 0) {
      tabTranscriptBtn.style.display = 'inline-flex';
      if (window.marked) {
        transcriptBody.innerHTML = marked.parse(lesson.transcript);
      } else {
        transcriptBody.innerText = lesson.transcript;
      }
      enhanceRenderedMarkdown(transcriptBody);
    } else {
      tabTranscriptBtn.style.display = 'none';
      transcriptBody.innerHTML = '';
    }

    // Presentation Link Tab
    if (lesson.presentation) {
      tabPresentationBtn.style.display = 'inline-flex';
      tabPresentationBtn.href = lesson.presentation;
    } else {
      tabPresentationBtn.style.display = 'none';
    }

    // Switch to content tab
    switchTab('content');

    // Pagination
    if (index > 0) {
      prevLessonBtn.style.visibility = 'visible';
      prevLessonTitle.innerText = data[index - 1].title;
    } else {
      prevLessonBtn.style.visibility = 'hidden';
    }

    if (index < data.length - 1) {
      nextLessonBtn.style.visibility = 'visible';
      nextLessonTitle.innerText = data[index + 1].title;
    } else {
      nextLessonBtn.style.visibility = 'hidden';
    }

    renderNav();
    updateProgressUI();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function switchTab(tabName) {
    activeTab = tabName;
    tabs.forEach(t => {
      if (t.dataset.tab === tabName) t.classList.add('active');
      else t.classList.remove('active');
    });

    if (tabName === 'content') {
      contentBody.style.display = 'block';
      transcriptBody.style.display = 'none';
    } else if (tabName === 'transcript') {
      contentBody.style.display = 'none';
      transcriptBody.style.display = 'block';
    }
  }

  tabs.forEach(t => {
    t.addEventListener('click', () => switchTab(t.dataset.tab));
  });

  // Completion toggle button
  toggleCompleteBtn.addEventListener('click', () => {
    const id = data[currentLessonIndex]?.id;
    const completed = getCompleted();
    setCompleted(id, !completed[id]);
  });

  // Pagination clicks
  prevLessonBtn.addEventListener('click', () => loadLesson(currentLessonIndex - 1));
  nextLessonBtn.addEventListener('click', () => loadLesson(currentLessonIndex + 1));

  // Search Logic
  function openSearch() {
    searchModal.style.display = 'flex';
    searchInput.value = '';
    searchInput.focus();
    renderSearchResults('');
  }
  function closeSearch() {
    searchModal.style.display = 'none';
  }

  function renderSearchResults(query) {
    searchResults.innerHTML = '';
    const q = query.toLowerCase().trim();
    if (!q) {
      searchResults.innerHTML = '<div style="padding: 20px; text-align: center; color: #64748b; font-size: 13px;">Введите поисковый запрос (например: <code>CLAUDE.md</code>, <code>второй мозг</code>, <code>хуки</code>, <code>промпт</code>)...</div>';
      return;
    }

    const matches = [];
    data.forEach((item, idx) => {
      const inTitle = item.title.toLowerCase().includes(q);
      const inContent = (item.content || '').toLowerCase().includes(q);
      const inTranscript = (item.transcript || '').toLowerCase().includes(q);

      if (inTitle || inContent || inTranscript) {
        let snippet = '';
        if (inContent) {
          const pos = item.content.toLowerCase().indexOf(q);
          const start = Math.max(0, pos - 40);
          const end = Math.min(item.content.length, pos + 90);
          snippet = item.content.substring(start, end).replace(/\n/g, ' ');
        } else if (inTitle) {
          snippet = item.section;
        }
        matches.push({ item, idx, snippet });
      }
    });

    if (matches.length === 0) {
      searchResults.innerHTML = '<div style="padding: 20px; text-align: center; color: #64748b; font-size: 13px;">Ничего не найдено по запросу.</div>';
      return;
    }

    matches.forEach(m => {
      const el = document.createElement('a');
      el.className = 'search-result-item';
      el.href = '#' + m.item.id;
      el.innerHTML = `
        <div class="search-result-title">${m.item.icon} ${m.item.title}</div>
        <div class="search-result-snippet">...${m.snippet}...</div>
      `;
      el.addEventListener('click', (e) => {
        e.preventDefault();
        closeSearch();
        loadLesson(m.idx);
      });
      searchResults.appendChild(el);
    });
  }

  searchInput.addEventListener('input', (e) => renderSearchResults(e.target.value));
  searchTrigger.addEventListener('click', openSearch);
  mobileSearchBtn.addEventListener('click', openSearch);
  searchCloseBtn.addEventListener('click', closeSearch);
  searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) closeSearch();
  });

  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      openSearch();
    }
    if (e.key === 'Escape' && searchModal.style.display === 'flex') {
      closeSearch();
    }
  });

  // Mobile Drawer
  function openSidebar() {
    sidebar.classList.add('open');
    sidebarOverlay.classList.add('open');
  }
  function closeSidebar() {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('open');
  }
  menuToggle.addEventListener('click', openSidebar);
  sidebarOverlay.addEventListener('click', closeSidebar);

  // Initial Route based on URL hash
  function init() {
    const hash = window.location.hash.replace('#', '');
    let initialIndex = 0;
    if (hash) {
      const idx = data.findIndex(d => d.id === hash);
      if (idx !== -1) initialIndex = idx;
    }
    loadLesson(initialIndex);
  }

  init();
})();
