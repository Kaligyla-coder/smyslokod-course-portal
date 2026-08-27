(function() {
  const data = window.COURSE_DATA || [];
  let currentLessonIndex = 0;
  let activeTab = 'content';

  const URL_MAP = {
    '/dashboard/praktikum-august-2026': 'overview',
    '/dashboard/praktikum-august-2026/': 'overview',
    '/dashboard/praktikum-august-2026/1/1': 'day1_intro',
    '/dashboard/praktikum-august-2026/1/2': 'day1_guide',
    '/dashboard/praktikum-august-2026/2/1': 'day2_intro',
    '/dashboard/praktikum-august-2026/2/2': 'day2_guide',
    '/dashboard/praktikum-august-2026/3/1': 'day3_intro',
    '/dashboard/praktikum-august-2026/3/2': 'day3_guide',
    '/dashboard/praktikum-august-2026/solutions': 'solutions_all',
    '/dashboard/praktikum-august-2026/solutions/': 'solutions_all',
    '/dashboard/praktikum-august-2026/solutions/methodology': 'solutions_method',
    '/dashboard/praktikum-august-2026/solutions/rules': 'solutions_rules',
    '/dashboard/praktikum-august-2026/solutions/reels-autopost': 'solutions_reels',
    '/dashboard/praktikum-august-2026/bonuses/avtorskie-promty-artemiya': 'prompts',
    '/promty': 'prompts',
    '/dashboard': 'overview',
    '/dashboard/praktikum-august-2026/transcription/d2da10ce-1085-466d-b765-234696365a92': 'transcription_d1',
    '/dashboard/praktikum-august-2026/transcription/53ef37f4-b879-427d-aad5-760ebd16eb76': 'transcription_d2',
    '/dashboard/praktikum-august-2026/transcription/2d3491c5-0c4c-4201-b3a6-be8b2152f4da': 'transcription_d3',
    '/': 'overview'
  };

  // DOM Elements
  const navTree = document.getElementById('nav-tree');
  const lessonTitle = document.getElementById('lesson-title');
  const lessonIcon = document.getElementById('lesson-icon');
  const lessonSectionBadge = document.getElementById('lesson-section-badge');
  const breadcrumbSection = document.getElementById('breadcrumb-section');
  const breadcrumbLesson = document.getElementById('breadcrumb-lesson');
  const contentBody = document.getElementById('content-body');
  const transcriptBody = document.getElementById('transcript-body');
  const tabsBar = document.getElementById('tabs-bar');
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
  const accordionControls = document.getElementById('accordion-controls');
  const btnExpandAll = document.getElementById('btn-expand-all');
  const btnCollapseAll = document.getElementById('btn-collapse-all');

  // Sidebar Controls
  const menuToggleBtn = document.getElementById('menu-toggle-btn');
  const sidebarCloseBtn = document.getElementById('sidebar-close-btn');
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebar-overlay');

  // Search Modal Elements
  const searchModal = document.getElementById('search-modal');
  const searchTrigger = document.getElementById('search-trigger');
  const searchCloseBtn = document.getElementById('search-close-btn');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');

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
          ${isDone ? '<span class="nav-check">✓</span>' : ''}
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

  // Enhance Rendered Content with Copy Buttons and Link Handlers
  function enhanceRenderedContent(container) {
    // Add copy button to <pre> blocks
    container.querySelectorAll('pre').forEach(pre => {
      if (pre.querySelector('.btn-copy-code-tag')) return;
      const btn = document.createElement('button');
      btn.className = 'btn-copy-prompt-action btn-copy-code-tag';
      btn.style.position = 'absolute';
      btn.style.top = '8px';
      btn.style.right = '8px';
      btn.innerHTML = '📋 Копировать';
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const code = pre.querySelector('code')?.innerText || pre.innerText;
        navigator.clipboard.writeText(code).then(() => showToast('Код скопирован!'));
      });
      pre.appendChild(btn);
    });

    // Enhance prompt copy buttons (if already present in HTML)
    container.querySelectorAll('button').forEach(btn => {
      const text = btn.innerText;
      if (text.includes('Копировать') || text.includes('Копировать промпт')) {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const parent = btn.closest('div[class*="bg-accent"]') || btn.closest('.prompt-box-styled') || btn.parentElement;
          const promptText = parent ? (parent.querySelector('div[class*="whitespace-pre"]') || parent).innerText : '';
          const cleanPrompt = promptText.replace(/Промпт для агента|Копировать промпт|ещё \d+ таких промптов/g, '').trim();
          navigator.clipboard.writeText(cleanPrompt || parent.innerText).then(() => showToast('Промпт скопирован!'));
        });
      }
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

    // Set HTML Content
    contentBody.innerHTML = lesson.html || '<p>Материалы загружаются...</p>';
    enhanceRenderedContent(contentBody);

    // If overview page, simplify tabs
    if (lesson.id === 'overview') {
      tabsBar.style.display = 'none';
      accordionControls.style.display = 'none';
    } else {
      tabsBar.style.display = 'flex';
      const detailsCount = contentBody.querySelectorAll('details').length;
      accordionControls.style.display = detailsCount > 0 ? 'flex' : 'none';
    }

    // Transcript Tab
    if (lesson.transcriptHtml && lesson.transcriptHtml.trim().length > 0) {
      tabTranscriptBtn.style.display = 'inline-flex';
      transcriptBody.innerHTML = lesson.transcriptHtml;
      enhanceRenderedContent(transcriptBody);
    } else {
      tabTranscriptBtn.style.display = 'none';
      transcriptBody.innerHTML = '';
    }

    // Presentation Tab
    if (lesson.presentation) {
      tabPresentationBtn.style.display = 'inline-flex';
      tabPresentationBtn.href = lesson.presentation;
    } else {
      tabPresentationBtn.style.display = 'none';
    }

    // Switch Tab
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
    const scrollEl = document.querySelector('.content-scroll-container');
    if (scrollEl) scrollEl.scrollTo({ top: 0, behavior: 'smooth' });
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

  // Global Document Link Interceptor (Guarantees NO 404s)
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    // Check if it's an internal course hash link (#day1_intro)
    if (href.startsWith('#')) {
      const id = href.replace('#', '');
      const idx = data.findIndex(d => d.id === id);
      if (idx !== -1) {
        e.preventDefault();
        loadLesson(idx);
        if (window.innerWidth <= 1024) closeSidebar();
        return;
      }
    }

    // Check if it's an internal smyslokod path (/dashboard/...)
    let path = href;
    if (path.startsWith('https://smyslokod.ru')) {
      path = path.replace('https://smyslokod.ru', '');
    }
    if (URL_MAP[path]) {
      e.preventDefault();
      const targetId = URL_MAP[path];
      const idx = data.findIndex(d => d.id === targetId);
      if (idx !== -1) {
        loadLesson(idx);
        if (window.innerWidth <= 1024) closeSidebar();
        return;
      }
    }
  });

  // Accordion Expand/Collapse All
  btnExpandAll.addEventListener('click', () => {
    contentBody.querySelectorAll('details').forEach(d => d.open = true);
  });
  btnCollapseAll.addEventListener('click', () => {
    contentBody.querySelectorAll('details').forEach(d => d.open = false);
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
      searchResults.innerHTML = '<div style="padding: 20px; text-align: center; color: #6b6560; font-size: 13px;">Введите поисковый запрос (например: <code>CLAUDE.md</code>, <code>второй мозг</code>, <code>хуки</code>, <code>промпт</code>)...</div>';
      return;
    }

    const matches = [];
    data.forEach((item, idx) => {
      const inTitle = item.title.toLowerCase().includes(q);
      const inContent = (item.html || '').toLowerCase().includes(q);

      if (inTitle || inContent) {
        let snippet = item.section;
        if (inContent) {
          const cleanTxt = item.html.replace(/<[^>]+>/g, ' ');
          const pos = cleanTxt.toLowerCase().indexOf(q);
          if (pos !== -1) {
            const start = Math.max(0, pos - 40);
            const end = Math.min(cleanTxt.length, pos + 80);
            snippet = cleanTxt.substring(start, end).replace(/\s+/g, ' ');
          }
        }
        matches.push({ item, idx, snippet });
      }
    });

    if (matches.length === 0) {
      searchResults.innerHTML = '<div style="padding: 20px; text-align: center; color: #6b6560; font-size: 13px;">Ничего не найдено по запросу.</div>';
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

  // Sidebar Toggle (Mobile & Desktop)
  function toggleSidebar() {
    if (window.innerWidth <= 1024) {
      const isOpen = sidebar.classList.contains('open');
      if (isOpen) closeSidebar();
      else openSidebar();
    } else {
      sidebar.classList.toggle('collapsed');
    }
  }

  function openSidebar() {
    sidebar.classList.add('open');
    sidebarOverlay.classList.add('open');
  }
  function closeSidebar() {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('open');
  }

  menuToggleBtn.addEventListener('click', toggleSidebar);
  sidebarCloseBtn.addEventListener('click', () => {
    if (window.innerWidth <= 1024) closeSidebar();
    else sidebar.classList.add('collapsed');
  });
  sidebarOverlay.addEventListener('click', closeSidebar);

  // Initial Route
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
