/**
 * Aura Moods - 主應用程式
 * 整合所有模組，處理 DOM 操作與事件綁定
 */

import { getAllThemes, getTheme } from './themes.js';
import { toggleGrain, toggleLowPerf, setGrainOpacity } from './animator.js';
import { generateCSS, generateStaticCSS, generateTailwindTokens, copyToClipboard } from './exporter.js';

// ==========================================
// State
// ==========================================
let currentThemeId = null;

// ==========================================
// DOM Elements
// ==========================================
const elements = {
  gallery: document.getElementById('gallery'),
  controls: document.getElementById('controls'),
  currentThemeName: document.getElementById('current-theme-name'),
  grainToggle: document.getElementById('grain-toggle'),
  lowperfToggle: document.getElementById('lowperf-toggle'),
  btnCopyCSS: document.getElementById('btn-copy-css'),
  btnCopyStatic: document.getElementById('btn-copy-static'),
  btnCopyTailwind: document.getElementById('btn-copy-tailwind'),
  btnFullscreen: document.getElementById('btn-fullscreen'),
  fullscreenModal: document.getElementById('fullscreen-modal'),
  fullscreenBg: document.getElementById('fullscreen-bg'),
  fullscreenGrain: document.querySelector('.fullscreen-grain'),
  btnCloseFullscreen: document.getElementById('btn-close-fullscreen'),
  fullscreenThemeName: document.getElementById('fullscreen-theme-name'),
  toast: document.getElementById('toast'),
  toastMessage: document.getElementById('toast-message'),
  auraBg: document.getElementById('aura-bg')
};

// ==========================================
// Toast Notification
// ==========================================
let toastTimeout = null;

function showToast(message, duration = 2000) {
  if (toastTimeout) {
    clearTimeout(toastTimeout);
  }

  elements.toastMessage.textContent = message;
  elements.toast.hidden = false;

  // Trigger reflow for animation
  void elements.toast.offsetWidth;
  elements.toast.classList.add('show');

  toastTimeout = setTimeout(() => {
    elements.toast.classList.remove('show');
    setTimeout(() => {
      elements.toast.hidden = true;
    }, 300);
  }, duration);
}

// ==========================================
// Theme Application
// ==========================================
function applyTheme(themeId) {
  const theme = getTheme(themeId);
  if (!theme) return;

  currentThemeId = themeId;
  const root = document.documentElement;

  // Apply blob colors
  theme.blobs.forEach((blob, i) => {
    root.style.setProperty(`--blob-${i + 1}`, blob.rgb);
  });
  root.style.setProperty('--bg-base', theme.bgBase.rgb);

  // Apply OKLCH for modern browsers (via CSS @supports, auto-handled)

  // Apply text mode
  document.body.classList.remove('light-text', 'dark-text');
  document.body.classList.add(`${theme.textMode}-text`);

  // Apply grain opacity
  setGrainOpacity(theme.grainOpacity);

  // Update UI
  elements.currentThemeName.textContent = `${theme.name} ${theme.nameEn}`;
  elements.controls.hidden = false;

  // Update active state in gallery
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.classList.toggle('active', item.dataset.theme === themeId);
  });
}

// ==========================================
// Gallery Rendering
// ==========================================
function createGalleryItem(theme) {
  const item = document.createElement('div');
  item.className = 'gallery-item';
  item.dataset.theme = theme.id;
  item.setAttribute('role', 'listitem');
  item.setAttribute('tabindex', '0');
  item.setAttribute('aria-label', `${theme.name} ${theme.nameEn}`);

  // Mini preview background
  const bg = document.createElement('div');
  bg.className = 'gallery-item-bg';

  // Create mini blobs
  const positions = [
    { top: '10%', left: '10%', size: '60%' },
    { top: '40%', right: '5%', size: '50%' },
    { bottom: '10%', left: '30%', size: '45%' },
    { top: '25%', left: '45%', size: '40%' }
  ];

  theme.blobs.forEach((blob, i) => {
    const miniBlob = document.createElement('div');
    miniBlob.className = 'gallery-item-blob';
    miniBlob.style.background = blob.rgb;
    miniBlob.style.width = positions[i].size;
    miniBlob.style.height = positions[i].size;

    if (positions[i].top) miniBlob.style.top = positions[i].top;
    if (positions[i].bottom) miniBlob.style.bottom = positions[i].bottom;
    if (positions[i].left) miniBlob.style.left = positions[i].left;
    if (positions[i].right) miniBlob.style.right = positions[i].right;

    bg.appendChild(miniBlob);
  });

  // Set background base color
  bg.style.background = theme.bgBase.rgb;

  // Name label
  const name = document.createElement('span');
  name.className = 'gallery-item-name';
  name.textContent = theme.name;

  item.appendChild(bg);
  item.appendChild(name);

  // Event listeners
  item.addEventListener('click', () => applyTheme(theme.id));
  item.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      applyTheme(theme.id);
    }
  });

  return item;
}

function renderGallery() {
  const themes = getAllThemes();
  elements.gallery.innerHTML = '';

  themes.forEach(theme => {
    const item = createGalleryItem(theme);
    elements.gallery.appendChild(item);
  });
}

// ==========================================
// Fullscreen Mode
// ==========================================
function openFullscreen() {
  if (!currentThemeId) return;

  const theme = getTheme(currentThemeId);
  elements.fullscreenThemeName.textContent = `${theme.name} ${theme.nameEn}`;
  elements.fullscreenModal.hidden = false;

  // Update text color for fullscreen info
  const info = elements.fullscreenModal.querySelector('.fullscreen-info');
  if (theme.textMode === 'dark') {
    info.style.color = 'rgba(0, 0, 0, 0.9)';
  } else {
    info.style.color = 'rgba(255, 255, 255, 0.9)';
  }
}

function closeFullscreen() {
  elements.fullscreenModal.hidden = true;
}

// ==========================================
// Event Handlers
// ==========================================
let grainEnabled = true;

function handleGrainToggle(e) {
  grainEnabled = e.target.checked;
  toggleGrain(grainEnabled);

  // Also update fullscreen grain
  if (elements.fullscreenGrain) {
    elements.fullscreenGrain.classList.toggle('grain-hidden', !grainEnabled);
  }
}

function handleLowPerfToggle() {
  toggleLowPerf();
}

async function handleCopyCSS() {
  if (!currentThemeId) return;

  const css = generateCSS(currentThemeId);
  const success = await copyToClipboard(css);

  if (success) {
    showToast('已複製動態 CSS！');
  } else {
    showToast('複製失敗，請手動複製');
  }
}

async function handleCopyStatic() {
  if (!currentThemeId) return;

  const css = generateStaticCSS(currentThemeId);
  const success = await copyToClipboard(css);

  if (success) {
    showToast('已複製靜態 CSS！');
  } else {
    showToast('複製失敗，請手動複製');
  }
}

async function handleCopyTailwind() {
  if (!currentThemeId) return;

  const tokens = generateTailwindTokens(currentThemeId);
  const success = await copyToClipboard(tokens);

  if (success) {
    showToast('已複製 Tailwind Token！');
  } else {
    showToast('複製失敗，請手動複製');
  }
}

function handleKeydown(e) {
  // ESC to close fullscreen
  if (e.key === 'Escape' && !elements.fullscreenModal.hidden) {
    closeFullscreen();
  }
}

function handleFullscreenClick(e) {
  // Click on background (not close button) to close
  if (e.target === elements.fullscreenModal) {
    closeFullscreen();
  }
}

// ==========================================
// Initialization
// ==========================================
function bindEvents() {
  // Toggles
  elements.grainToggle.addEventListener('change', handleGrainToggle);
  elements.lowperfToggle.addEventListener('change', handleLowPerfToggle);

  // Copy buttons
  elements.btnCopyCSS.addEventListener('click', handleCopyCSS);
  elements.btnCopyStatic.addEventListener('click', handleCopyStatic);
  elements.btnCopyTailwind.addEventListener('click', handleCopyTailwind);

  // Fullscreen
  elements.btnFullscreen.addEventListener('click', openFullscreen);
  elements.btnCloseFullscreen.addEventListener('click', closeFullscreen);
  elements.fullscreenModal.addEventListener('click', handleFullscreenClick);

  // Keyboard
  document.addEventListener('keydown', handleKeydown);
}

function init() {
  renderGallery();
  bindEvents();

  // Apply default theme
  applyTheme('aurora');

  console.log('🌈 Aura Moods initialized');
}

// Start
document.addEventListener('DOMContentLoaded', init);
