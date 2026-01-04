
import { ColorInfo, Language } from './types';

export const PALETTE_PRESETS: Record<string, { name: Record<Language, string>, colors: ColorInfo[] }> = {
  bw: {
    name: { en: 'Black & White', ru: 'Черно-белое' },
    colors: [
      { id: '1', hex: '#000000' },
      { id: '2', hex: '#FFFFFF' }
    ]
  },
  sepia: {
    name: { en: 'Sepia', ru: 'Сепия' },
    colors: [
      { id: 's1', hex: '#4b2e21' },
      { id: 's2', hex: '#7a5b48' },
      { id: 's3', hex: '#a4846c' },
      { id: 's4', hex: '#d4b79c' },
      { id: 's5', hex: '#eee0d5' }
    ]
  },
  pastel: {
    name: { en: 'Pastel', ru: 'Пастель' },
    colors: [
      { id: 'p1', hex: '#FFB7B2' },
      { id: 'p2', hex: '#FFDAC1' },
      { id: 'p3', hex: '#E2F0CB' },
      { id: 'p4', hex: '#B5EAD7' },
      { id: 'p5', hex: '#C7CEEA' }
    ]
  },
  delica_basics: {
    name: { en: 'Delica Basics', ru: 'Основы Delica' },
    colors: [
      { id: 'db1', hex: '#DB1D33', name: 'DB-1', code: 'Red' },
      { id: 'db2', hex: '#215DA4', name: 'DB-2', code: 'Blue' },
      { id: 'db3', hex: '#F9D104', name: 'DB-3', code: 'Yellow' },
      { id: 'db4', hex: '#4BAE4F', name: 'DB-4', code: 'Green' },
      { id: 'db5', hex: '#F0801E', name: 'DB-5', code: 'Orange' },
      { id: 'db6', hex: '#FFFFFF', name: 'DB-6', code: 'White' },
      { id: 'db7', hex: '#000000', name: 'DB-7', code: 'Black' },
      { id: 'db8', hex: '#B2B2B2', name: 'DB-8', code: 'Silver' },
      { id: 'db9', hex: '#D4AF37', name: 'DB-9', code: 'Gold' }
    ]
  }
};

export const UI_STRINGS = {
  [Language.EN]: {
    upload: 'Upload Image',
    dragDrop: 'Drag and drop or click to upload',
    width: 'Width (beads)',
    height: 'Height (beads)',
    aspect: 'Keep Aspect Ratio',
    dithering: 'Use Dithering',
    showGrid: 'Show Grid',
    zoom: 'Zoom',
    palette: 'Palette',
    presets: 'Presets',
    add: 'Add Color',
    exportPng: 'Export PNG',
    exportPdf: 'Export PDF',
    exportCsv: 'Export CSV',
    legend: 'Legend',
    colorCode: 'Code',
    count: 'Count',
    reset: 'Reset Palette'
  },
  [Language.RU]: {
    upload: 'Загрузить фото',
    dragDrop: 'Перетащите или нажмите для выбора',
    width: 'Ширина (бисер)',
    height: 'Высота (бисер)',
    aspect: 'Сохранять пропорции',
    dithering: 'Использовать дизеринг',
    showGrid: 'Показывать сетку',
    zoom: 'Масштаб',
    palette: 'Палитра',
    presets: 'Пресеты',
    add: 'Добавить цвет',
    exportPng: 'Экспорт PNG',
    exportPdf: 'Экспорт PDF',
    exportCsv: 'Экспорт CSV',
    legend: 'Легенда',
    colorCode: 'Код',
    count: 'Кол-во',
    reset: 'Сброс палитры'
  }
};
