(function () {
  'use strict';

  const ICONS = {
    book: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    clipboard: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></svg>',
    puzzle: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 1.998c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z"/></svg>',
    music: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
    eye: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
    sparkles: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3z"/></svg>',
    heart: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>'
  };

  const state = {
    ageGroups: [],
    categories: [],
    resources: [],
    search: '',
    age: 'all',
    category: 'all',
    audience: 'all'
  };

  const els = {
    navToggle: document.getElementById('nav-toggle'),
    primaryNav: document.getElementById('primary-nav'),
    ageGrid: document.getElementById('age-grid'),
    categoryGrid: document.getElementById('category-grid'),
    searchInput: document.getElementById('search-input'),
    filterAge: document.getElementById('filter-age'),
    filterCategory: document.getElementById('filter-category'),
    filterAudience: document.getElementById('filter-audience'),
    btnPriorityHero: document.getElementById('btn-priority-24-36'),
    btnQuick2436: document.getElementById('btn-quick-24-36'),
    btnResetFilters: document.getElementById('btn-reset-filters'),
    btnEmptyReset: document.getElementById('btn-empty-reset'),
    resultCount: document.getElementById('result-count'),
    activeSummary: document.getElementById('active-filter-summary'),
    resourceGrid: document.getElementById('resource-grid'),
    emptyState: document.getElementById('empty-state'),
    modal: document.getElementById('preview-modal'),
    modalDemoBadge: document.getElementById('modal-demo-badge'),
    modalTitle: document.getElementById('modal-title'),
    modalWarning: document.getElementById('modal-warning'),
    modalSummary: document.getElementById('modal-summary'),
    modalMeta: document.getElementById('modal-meta'),
    modalPreviewList: document.getElementById('modal-preview-list'),
    modalDownloadBtn: document.getElementById('modal-download-btn'),
    modalClose: document.getElementById('modal-close'),
    modalCloseFooter: document.getElementById('modal-close-footer')
  };

  function normalizeText(str) {
    return String(str || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd');
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  async function loadData() {
    if (window.location.protocol === 'http:' || window.location.protocol === 'https:') {
      try {
        const res = await fetch('data/resources.json', { cache: 'no-store' });
        if (res.ok) {
          return await res.json();
        }
      } catch (err) {
        console.warn('Không tải được resources.json qua fetch, dùng dữ liệu dự phòng:', err);
      }
    }
    if (window.GDMN_FALLBACK_DATA) {
      return window.GDMN_FALLBACK_DATA;
    }
    return { ageGroups: [], categories: [], resources: [] };
  }

  function renderAgeGroups() {
    els.ageGrid.innerHTML = state.ageGroups
      .map((age) => {
        const count = state.resources.filter((r) => r.doTuoi === age.label).length;
        const priorityClass = age.priority ? ' is-priority' : '';
        return `
          <button type="button" class="age-card${priorityClass}" data-age="${escapeHtml(age.label)}">
            <div class="age-card-top">
              <span class="age-stage">${escapeHtml(age.stage)}</span>
              <span class="age-status">${escapeHtml(age.status)}</span>
            </div>
            <h3>${escapeHtml(age.label)}</h3>
            <p>${escapeHtml(age.description)}</p>
            <span class="age-card-link">Xem tài liệu (${count} mục minh họa) &rarr;</span>
          </button>
        `;
      })
      .join('');

    els.ageGrid.querySelectorAll('.age-card').forEach((card) => {
      card.addEventListener('click', () => {
        state.age = card.dataset.age;
        els.filterAge.value = state.age;
        renderResources();
        document.getElementById('thu-vien').scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  function renderCategories() {
    els.categoryGrid.innerHTML = state.categories
      .map((cat) => {
        const iconSvg = ICONS[cat.icon] || ICONS.book;
        return `
          <button type="button" class="category-card" data-category="${escapeHtml(cat.label)}">
            <span class="category-icon" aria-hidden="true">${iconSvg}</span>
            <h3>${escapeHtml(cat.label)}</h3>
            <p>${escapeHtml(cat.description)}</p>
          </button>
        `;
      })
      .join('');

    els.categoryGrid.querySelectorAll('.category-card').forEach((card) => {
      card.addEventListener('click', () => {
        state.category = card.dataset.category;
        els.filterCategory.value = state.category;
        renderResources();
        document.getElementById('thu-vien').scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  function populateFilterOptions() {
    state.ageGroups.forEach((age) => {
      const opt = document.createElement('option');
      opt.value = age.label;
      opt.textContent = age.priority ? `${age.label} (Ưu tiên)` : age.label;
      els.filterAge.appendChild(opt);
    });

    state.categories.forEach((cat) => {
      const opt = document.createElement('option');
      opt.value = cat.label;
      opt.textContent = cat.label;
      els.filterCategory.appendChild(opt);
    });
  }

  function getFilteredResources() {
    const query = normalizeText(state.search.trim());

    return state.resources.filter((item) => {
      if (state.age !== 'all' && item.doTuoi !== state.age) return false;
      if (state.category !== 'all' && item.loaiTaiLieu !== state.category) return false;
      if (state.audience !== 'all') {
        const target = normalizeText(item.doiTuong);
        if (!target.includes(normalizeText(state.audience))) return false;
      }

      if (query) {
        const haystack = normalizeText(
          [
            item.ten,
            item.doTuoi,
            item.chuDe,
            item.loaiTaiLieu,
            item.tacGia,
            item.nguonThamKhao,
            item.tomTat
          ].join(' ')
        );
        if (!haystack.includes(query)) return false;
      }

      return true;
    });
  }

  function updateFilterSummary(filteredCount) {
    const total = state.resources.length;
    els.resultCount.textContent = `Hiển thị ${filteredCount} / ${total} mục tài liệu minh họa`;

    const active = [];
    if (state.age !== 'all') active.push(`Độ tuổi: ${state.age}`);
    if (state.category !== 'all') active.push(`Chuyên mục: ${state.category}`);
    if (state.audience !== 'all') active.push(`Đối tượng: ${state.audience}`);
    if (state.search.trim()) active.push(`Từ khóa: "${state.search.trim()}"`);

    els.activeSummary.textContent = active.length ? `Đang lọc: ${active.join(' • ')}` : '';
  }

  function renderResources() {
    const list = getFilteredResources();
    updateFilterSummary(list.length);

    if (list.length === 0) {
      els.resourceGrid.innerHTML = '';
      els.emptyState.hidden = false;
      return;
    }

    els.emptyState.hidden = true;
    els.resourceGrid.innerHTML = list
      .map((item) => {
        const demoBadge = item.isDemo
          ? `<span class="badge badge-demo">Nội dung minh họa</span>`
          : '';
        return `
          <article class="resource-card">
            <div class="card-badges">
              ${demoBadge}
              <span class="badge badge-age">${escapeHtml(item.doTuoi)}</span>
              <span class="badge badge-cat">${escapeHtml(item.loaiTaiLieu)}</span>
            </div>
            <h3>${escapeHtml(item.ten)}</h3>
            <p class="resource-summary">${escapeHtml(item.tomTat)}</p>
            <div class="resource-meta">
              <div><strong>Chủ đề:</strong> ${escapeHtml(item.chuDe)}</div>
              <div><strong>Cập nhật:</strong> ${escapeHtml(item.ngayCapNhat)}</div>
              <div><strong>Đối tượng:</strong> ${escapeHtml(item.doiTuong)}</div>
              <div><strong>Tác giả:</strong> ${escapeHtml(item.tacGia)}</div>
            </div>
            <div class="resource-actions">
              <span class="resource-format">${escapeHtml(item.dinhDang)}</span>
              <button type="button" class="btn btn-soft btn-preview" data-id="${escapeHtml(item.id)}">
                Xem trước
              </button>
            </div>
          </article>
        `;
      })
      .join('');

    els.resourceGrid.querySelectorAll('.btn-preview').forEach((btn) => {
      btn.addEventListener('click', () => {
        const item = state.resources.find((r) => r.id === btn.dataset.id);
        if (item) openPreviewModal(item);
      });
    });
  }

  function openPreviewModal(item) {
    els.modalTitle.textContent = item.ten;
    els.modalDemoBadge.hidden = !item.isDemo;
    els.modalDemoBadge.textContent = item.nhanMinhHoa || 'Nội dung minh họa';
    els.modalWarning.hidden = !item.isDemo;
    els.modalSummary.textContent = item.tomTat;

    // Hiển thị đủ 9 trường chuẩn mở rộng theo yêu cầu
    const fields = [
      ['Tên tài liệu', item.ten],
      ['Độ tuổi', item.doTuoi],
      ['Chủ đề', item.chuDe],
      ['Loại tài liệu', item.loaiTaiLieu],
      ['Tác giả', item.tacGia],
      ['Nguồn tham khảo', item.nguonThamKhao],
      ['Ngày cập nhật', item.ngayCapNhat],
      ['Định dạng', item.dinhDang],
      ['Quyền sử dụng', item.quyenSuDung]
    ];

    els.modalMeta.innerHTML = fields
      .map(([label, val]) => `<dt>${escapeHtml(label)}</dt><dd>${escapeHtml(val)}</dd>`)
      .join('');

    const previewItems = Array.isArray(item.noiDungXemTruoc) ? item.noiDungXemTruoc : [];
    els.modalPreviewList.innerHTML = previewItems
      .map((line) => `<li>${escapeHtml(line)}</li>`)
      .join('');

    if (item.duongDanTai && !item.isDemo) {
      els.modalDownloadBtn.href = item.duongDanTai;
      els.modalDownloadBtn.textContent = 'Mở / Tải tài liệu';
      els.modalDownloadBtn.classList.remove('btn-disabled');
      els.modalDownloadBtn.removeAttribute('aria-disabled');
    } else {
      els.modalDownloadBtn.href = '#';
      els.modalDownloadBtn.textContent = 'Chờ tài liệu chính thức';
      els.modalDownloadBtn.classList.add('btn-disabled');
      els.modalDownloadBtn.setAttribute('aria-disabled', 'true');
    }

    els.modal.hidden = false;
    els.modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    els.modalClose.focus();
  }

  function closePreviewModal() {
    els.modal.hidden = true;
    els.modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function resetFilters() {
    state.search = '';
    state.age = 'all';
    state.category = 'all';
    state.audience = 'all';
    els.searchInput.value = '';
    els.filterAge.value = 'all';
    els.filterCategory.value = 'all';
    els.filterAudience.value = 'all';
    renderResources();
  }

  function bindEvents() {
    // Mobile menu toggle
    els.navToggle.addEventListener('click', () => {
      const open = els.primaryNav.classList.toggle('is-open');
      els.navToggle.setAttribute('aria-expanded', String(open));
    });

    els.primaryNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        els.primaryNav.classList.remove('is-open');
        els.navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Search & filter controls
    els.searchInput.addEventListener('input', (e) => {
      state.search = e.target.value;
      renderResources();
    });

    els.filterAge.addEventListener('change', (e) => {
      state.age = e.target.value;
      renderResources();
    });

    els.filterCategory.addEventListener('change', (e) => {
      state.category = e.target.value;
      renderResources();
    });

    els.filterAudience.addEventListener('change', (e) => {
      state.audience = e.target.value;
      renderResources();
    });

    const filterTo2436 = () => {
      state.age = '24–36 tháng';
      els.filterAge.value = '24–36 tháng';
      renderResources();
      document.getElementById('thu-vien').scrollIntoView({ behavior: 'smooth' });
    };

    els.btnPriorityHero.addEventListener('click', filterTo2436);
    els.btnQuick2436.addEventListener('click', filterTo2436);
    els.btnResetFilters.addEventListener('click', resetFilters);
    els.btnEmptyReset.addEventListener('click', resetFilters);

    // Modal close events
    els.modalClose.addEventListener('click', closePreviewModal);
    els.modalCloseFooter.addEventListener('click', closePreviewModal);
    els.modal.addEventListener('click', (e) => {
      if (e.target === els.modal) closePreviewModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !els.modal.hidden) closePreviewModal();
    });
  }

  async function init() {
    bindEvents();
    const data = await loadData();
    state.ageGroups = data.ageGroups || [];
    state.categories = data.categories || [];
    state.resources = data.resources || [];

    populateFilterOptions();
    renderAgeGroups();
    renderCategories();
    renderResources();
  }

  init();
})();
