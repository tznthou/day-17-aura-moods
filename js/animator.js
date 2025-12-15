/**
 * Aura Moods - 動畫控制器
 * 控制動畫速度、低效能模式、暫停/播放
 */

// ==========================================
// Lazy DOM References [H02]
// 避免頂層執行 DOM 查詢導致初始化時序問題
// ==========================================
let _root = null;
let _auraBg = null;

function getRoot() {
  if (!_root) {
    _root = document.documentElement;
  }
  return _root;
}

function getAuraBg() {
  if (!_auraBg) {
    _auraBg = document.getElementById('aura-bg');
  }
  return _auraBg;
}

let currentSpeed = 1;
let isPaused = false;
let isLowPerf = false;

/**
 * 設定動畫速度
 * @param {number} speed - 速度倍率 (0-2)
 * @returns {number} 實際設定的速度
 */
export function setSpeed(speed) {
  // 型別驗證 [M03]
  const parsedSpeed = Number(speed);
  if (typeof speed !== 'number' || isNaN(parsedSpeed)) {
    console.warn(`setSpeed: Invalid speed "${speed}", using default 1`);
    speed = 1;
  } else {
    speed = parsedSpeed;
  }

  // 範圍限制
  currentSpeed = Math.max(0, Math.min(2, speed));

  if (currentSpeed === 0) {
    pause();
  } else {
    if (isPaused) play();
    getRoot().style.setProperty('--speed-multiplier', currentSpeed);
  }

  return currentSpeed;
}

/**
 * 取得目前速度
 */
export function getSpeed() {
  return currentSpeed;
}

/**
 * 暫停動畫
 */
export function pause() {
  isPaused = true;
  const auraBg = getAuraBg();
  if (auraBg) {
    auraBg.classList.add('paused');
  }
}

/**
 * 播放動畫
 */
export function play() {
  isPaused = false;
  const auraBg = getAuraBg();
  if (auraBg) {
    auraBg.classList.remove('paused');
  }
}

/**
 * 切換暫停/播放
 */
export function togglePause() {
  if (isPaused) {
    play();
  } else {
    pause();
  }
  return isPaused;
}

/**
 * 是否暫停中
 */
export function isPausedState() {
  return isPaused;
}

/**
 * 啟用低效能模式
 */
export function enableLowPerf() {
  isLowPerf = true;
  document.body.classList.add('low-perf');
}

/**
 * 停用低效能模式
 */
export function disableLowPerf() {
  isLowPerf = false;
  document.body.classList.remove('low-perf');
}

/**
 * 切換低效能模式
 */
export function toggleLowPerf() {
  if (isLowPerf) {
    disableLowPerf();
  } else {
    enableLowPerf();
  }
  return isLowPerf;
}

/**
 * 是否為低效能模式
 */
export function isLowPerfMode() {
  return isLowPerf;
}

/**
 * 設定 Grain 透明度
 * @param {number} opacity - 0-1
 */
export function setGrainOpacity(opacity) {
  getRoot().style.setProperty('--grain-opacity', opacity);
}

/**
 * 顯示/隱藏 Grain
 * @param {boolean} show
 */
export function toggleGrain(show) {
  const grainOverlay = document.querySelector('.grain-overlay');
  if (grainOverlay) {
    grainOverlay.classList.toggle('grain-hidden', !show);
  }
}
