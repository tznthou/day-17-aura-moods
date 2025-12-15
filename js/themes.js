/**
 * Aura Moods - 氛圍主題配置
 * 8 種精選動態氛圍，每種包含 OKLCH + RGB fallback
 */

export const THEMES = {
  aurora: {
    id: 'aurora',
    name: '極光夢境',
    nameEn: 'Aurora',
    description: '夢幻、科幻',
    textMode: 'light',
    grainOpacity: 0.15,
    bgBase: {
      rgb: 'rgb(15, 15, 35)',
      oklch: 'oklch(15% 0.03 270)'
    },
    blobs: [
      { rgb: 'rgb(80, 120, 220)', oklch: 'oklch(55% 0.18 260)' },
      { rgb: 'rgb(160, 80, 200)', oklch: 'oklch(50% 0.22 310)' },
      { rgb: 'rgb(255, 130, 180)', oklch: 'oklch(70% 0.18 350)' },
      { rgb: 'rgb(100, 200, 255)', oklch: 'oklch(75% 0.12 220)' }
    ]
  },

  sunset: {
    id: 'sunset',
    name: '日落熔岩',
    nameEn: 'Sunset',
    description: '溫暖、活力',
    textMode: 'light',
    grainOpacity: 0.12,
    bgBase: {
      rgb: 'rgb(25, 15, 20)',
      oklch: 'oklch(12% 0.03 350)'
    },
    blobs: [
      { rgb: 'rgb(255, 100, 80)', oklch: 'oklch(65% 0.22 25)' },
      { rgb: 'rgb(255, 160, 50)', oklch: 'oklch(75% 0.2 70)' },
      { rgb: 'rgb(200, 60, 120)', oklch: 'oklch(50% 0.22 350)' },
      { rgb: 'rgb(255, 80, 150)', oklch: 'oklch(60% 0.25 10)' }
    ]
  },

  ocean: {
    id: 'ocean',
    name: '深海珊瑚',
    nameEn: 'Ocean',
    description: '冷靜、專業',
    textMode: 'light',
    grainOpacity: 0.15,
    bgBase: {
      rgb: 'rgb(10, 20, 30)',
      oklch: 'oklch(12% 0.03 230)'
    },
    blobs: [
      { rgb: 'rgb(0, 150, 180)', oklch: 'oklch(60% 0.12 200)' },
      { rgb: 'rgb(50, 100, 200)', oklch: 'oklch(50% 0.15 250)' },
      { rgb: 'rgb(0, 200, 150)', oklch: 'oklch(70% 0.15 170)' },
      { rgb: 'rgb(100, 180, 220)', oklch: 'oklch(70% 0.1 220)' }
    ]
  },

  lavender: {
    id: 'lavender',
    name: '薰衣草田',
    nameEn: 'Lavender',
    description: '放鬆、療癒',
    textMode: 'dark',
    grainOpacity: 0.1,
    bgBase: {
      rgb: 'rgb(240, 235, 250)',
      oklch: 'oklch(94% 0.02 300)'
    },
    blobs: [
      { rgb: 'rgb(200, 170, 255)', oklch: 'oklch(78% 0.12 300)' },
      { rgb: 'rgb(255, 200, 230)', oklch: 'oklch(88% 0.08 350)' },
      { rgb: 'rgb(180, 200, 255)', oklch: 'oklch(82% 0.1 270)' },
      { rgb: 'rgb(230, 180, 255)', oklch: 'oklch(80% 0.12 310)' }
    ]
  },

  jungle: {
    id: 'jungle',
    name: '熱帶雨林',
    nameEn: 'Jungle',
    description: '自然、清新',
    textMode: 'dark',
    grainOpacity: 0.12,
    bgBase: {
      rgb: 'rgb(235, 245, 235)',
      oklch: 'oklch(95% 0.02 140)'
    },
    blobs: [
      { rgb: 'rgb(100, 200, 100)', oklch: 'oklch(72% 0.18 140)' },
      { rgb: 'rgb(180, 220, 80)', oklch: 'oklch(82% 0.2 110)' },
      { rgb: 'rgb(50, 180, 150)', oklch: 'oklch(65% 0.15 170)' },
      { rgb: 'rgb(150, 230, 120)', oklch: 'oklch(85% 0.2 130)' }
    ]
  },

  midnight: {
    id: 'midnight',
    name: '午夜爵士',
    nameEn: 'Midnight',
    description: '神秘、高級',
    textMode: 'light',
    grainOpacity: 0.18,
    bgBase: {
      rgb: 'rgb(8, 8, 18)',
      oklch: 'oklch(8% 0.02 270)'
    },
    blobs: [
      { rgb: 'rgb(30, 40, 100)', oklch: 'oklch(25% 0.1 260)' },
      { rgb: 'rgb(60, 30, 90)', oklch: 'oklch(22% 0.12 300)' },
      { rgb: 'rgb(20, 50, 80)', oklch: 'oklch(28% 0.08 240)' },
      { rgb: 'rgb(50, 40, 120)', oklch: 'oklch(28% 0.15 280)' }
    ]
  },

  peach: {
    id: 'peach',
    name: '桃花源記',
    nameEn: 'Peach',
    description: '可愛、溫柔',
    textMode: 'dark',
    grainOpacity: 0.08,
    bgBase: {
      rgb: 'rgb(255, 248, 245)',
      oklch: 'oklch(98% 0.01 50)'
    },
    blobs: [
      { rgb: 'rgb(255, 180, 170)', oklch: 'oklch(82% 0.1 25)' },
      { rgb: 'rgb(255, 200, 150)', oklch: 'oklch(86% 0.1 70)' },
      { rgb: 'rgb(255, 220, 200)', oklch: 'oklch(92% 0.06 50)' },
      { rgb: 'rgb(255, 170, 200)', oklch: 'oklch(80% 0.12 0)' }
    ]
  },

  cosmic: {
    id: 'cosmic',
    name: '星際迷航',
    nameEn: 'Cosmic',
    description: '未來、探索',
    textMode: 'light',
    grainOpacity: 0.15,
    bgBase: {
      rgb: 'rgb(10, 5, 20)',
      oklch: 'oklch(8% 0.04 300)'
    },
    blobs: [
      { rgb: 'rgb(100, 50, 150)', oklch: 'oklch(40% 0.2 300)' },
      { rgb: 'rgb(50, 80, 180)', oklch: 'oklch(42% 0.18 260)' },
      { rgb: 'rgb(180, 80, 150)', oklch: 'oklch(50% 0.2 330)' },
      { rgb: 'rgb(80, 100, 200)', oklch: 'oklch(50% 0.15 270)' }
    ]
  }
};

/**
 * 取得主題列表（依順序）
 */
export const THEME_ORDER = [
  'aurora',
  'sunset',
  'ocean',
  'lavender',
  'jungle',
  'midnight',
  'peach',
  'cosmic'
];

/**
 * 取得主題 by ID
 */
export function getTheme(id) {
  return THEMES[id] || THEMES.aurora;
}

/**
 * 取得所有主題（有序）
 */
export function getAllThemes() {
  return THEME_ORDER.map(id => THEMES[id]);
}
