
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { 
  Upload, 
  Settings, 
  Download, 
  Plus, 
  Trash2, 
  Check, 
  ZoomIn, 
  Grid as GridIcon,
  Palette,
  Image as ImageIcon,
  ChevronDown,
  Languages,
  X
} from 'lucide-react';
import { ColorInfo, PatternSettings, Language, BeadCount } from './types';
import { PALETTE_PRESETS, UI_STRINGS } from './constants';
import { processBeadPattern } from './utils/imageProcessing';

const DEFAULT_PALETTE = PALETTE_PRESETS.delica_basics.colors;

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>(Language.EN);
  const [image, setImage] = useState<string | null>(null);
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null);
  const [processedImageData, setProcessedImageData] = useState<ImageData | null>(null);
  const [counts, setCounts] = useState<Map<string, number>>(new Map());
  const [isProcessing, setIsProcessing] = useState(false);
  const [palette, setPalette] = useState<ColorInfo[]>(() => {
    const saved = localStorage.getItem('bead_palette');
    return saved ? JSON.parse(saved) : DEFAULT_PALETTE;
  });

  const [settings, setSettings] = useState<PatternSettings>(() => {
    const saved = localStorage.getItem('bead_settings');
    return saved ? JSON.parse(saved) : {
      width: 100,
      height: 100,
      maintainAspectRatio: true,
      useDithering: false,
      showGrid: true,
      zoom: 400
    };
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = UI_STRINGS[language];

  // Persist palette
  useEffect(() => {
    localStorage.setItem('bead_palette', JSON.stringify(palette));
  }, [palette]);

  // Persist settings
  useEffect(() => {
    localStorage.setItem('bead_settings', JSON.stringify(settings));
  }, [settings]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setImage(dataUrl);
        const img = new Image();
        img.onload = () => {
          setOriginalImage(img);
          if (settings.maintainAspectRatio) {
            const ratio = img.width / img.height;
            setSettings(prev => ({ ...prev, height: Math.round(prev.width / ratio) }));
          }
        };
        img.src = dataUrl;
      };
      reader.readAsDataURL(file);
    }
  };

  const updateSetting = <K extends keyof PatternSettings>(key: K, value: PatternSettings[K]) => {
    setSettings(prev => {
      const next = { ...prev, [key]: value };
      if (key === 'width' && prev.maintainAspectRatio && originalImage) {
        next.height = Math.round((value as number) / (originalImage.width / originalImage.height));
      } else if (key === 'height' && prev.maintainAspectRatio && originalImage) {
        next.width = Math.round((value as number) * (originalImage.width / originalImage.height));
      }
      return next;
    });
  };

  const runProcessing = useCallback(async () => {
    if (!originalImage || palette.length === 0) return;
    setIsProcessing(true);
    try {
      const { imageData, counts: newCounts } = await processBeadPattern(
        originalImage,
        settings.width,
        settings.height,
        palette,
        settings.useDithering
      );
      setProcessedImageData(imageData);
      setCounts(newCounts);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  }, [originalImage, settings.width, settings.height, settings.useDithering, palette]);

  useEffect(() => {
    const timeout = setTimeout(() => runProcessing(), 300);
    return () => clearTimeout(timeout);
  }, [runProcessing]);

  // Render processed image to display canvas
  useEffect(() => {
    if (!processedImageData || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const scale = settings.zoom / 100;
    canvas.width = settings.width * scale;
    canvas.height = settings.height * scale;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw beads
    for (let y = 0; y < settings.height; y++) {
      for (let x = 0; x < settings.width; x++) {
        const i = (y * settings.width + x) * 4;
        const r = processedImageData.data[i];
        const g = processedImageData.data[i + 1];
        const b = processedImageData.data[i + 2];
        
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.beginPath();
        // A circle-ish bead shape
        const radius = (scale / 2) * 0.9;
        ctx.roundRect(x * scale + 1, y * scale + 1, scale - 2, scale - 2, scale / 4);
        ctx.fill();
        
        if (settings.showGrid && scale > 4) {
          ctx.strokeStyle = 'rgba(0,0,0,0.1)';
          ctx.lineWidth = 0.5;
          ctx.strokeRect(x * scale, y * scale, scale, scale);
        }
      }
    }
  }, [processedImageData, settings.width, settings.height, settings.zoom, settings.showGrid]);

  const addColor = () => {
    const newColor: ColorInfo = {
      id: Math.random().toString(36).substr(2, 9),
      hex: '#ff0000',
      name: 'Custom',
      code: ''
    };
    setPalette([...palette, newColor]);
  };

  const removeColor = (id: string) => {
    setPalette(palette.filter(c => c.id !== id));
  };

  const updateColor = (id: string, hex: string) => {
    setPalette(palette.map(c => c.id === id ? { ...c, hex } : c));
  };

  const downloadPng = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `bead-pattern-${settings.width}x${settings.height}.png`;
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  const downloadCsv = () => {
    if (!processedImageData) return;
    let csv = `X,Y,HEX\n`;
    for (let y = 0; y < settings.height; y++) {
      for (let x = 0; x < settings.width; x++) {
        const i = (y * settings.width + x) * 4;
        const r = processedImageData.data[i];
        const g = processedImageData.data[i + 1];
        const b = processedImageData.data[i + 2];
        const hex = `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
        csv += `${x},${y},${hex}\n`;
      }
    }
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `bead-pattern.csv`;
    link.click();
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">B</div>
          <h1 className="text-xl font-bold text-slate-800">BeadPattern Pro</h1>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setLanguage(l => l === Language.EN ? Language.RU : Language.EN)}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors flex items-center gap-1 text-sm font-medium"
          >
            <Languages size={18} />
            {language.toUpperCase()}
          </button>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 text-sm font-semibold shadow-sm"
          >
            <Upload size={18} />
            <span className="hidden sm:inline">{t.upload}</span>
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageUpload} 
            accept="image/*" 
            className="hidden" 
          />
        </div>
      </header>

      <main className="flex-1 flex flex-col md:flex-row overflow-hidden h-[calc(100vh-65px)]">
        {/* Sidebar Controls */}
        <aside className="w-full md:w-80 lg:w-96 bg-white border-r overflow-y-auto p-6 space-y-8 shadow-sm">
          {/* Sizes */}
          <section className="space-y-4">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Settings size={14} />
              {t.width} & {t.height}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-500">{t.width}</label>
                <input 
                  type="number" 
                  value={settings.width}
                  onChange={(e) => updateSetting('width', Math.min(500, Math.max(1, parseInt(e.target.value) || 1)))}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-500">{t.height}</label>
                <input 
                  type="number" 
                  value={settings.height}
                  onChange={(e) => updateSetting('height', Math.min(500, Math.max(1, parseInt(e.target.value) || 1)))}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="relative">
                <input 
                  type="checkbox" 
                  checked={settings.maintainAspectRatio}
                  onChange={(e) => updateSetting('maintainAspectRatio', e.target.checked)}
                  className="peer hidden"
                />
                <div className="w-5 h-5 border-2 rounded peer-checked:bg-indigo-600 peer-checked:border-indigo-600 transition-all flex items-center justify-center">
                  <Check size={12} className="text-white opacity-0 peer-checked:opacity-100" />
                </div>
              </div>
              <span className="text-sm text-slate-600 group-hover:text-indigo-600 transition-colors">{t.aspect}</span>
            </label>
          </section>

          {/* Palette Controls */}
          <section className="space-y-4">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Palette size={14} />
              {t.palette}
            </h2>
            
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-500">{t.presets}</label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(PALETTE_PRESETS).map(([id, preset]) => (
                  <button
                    key={id}
                    onClick={() => setPalette(preset.colors)}
                    className="px-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 rounded text-slate-700 transition-colors"
                  >
                    {preset.name[language]}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {palette.map((c) => (
                <div key={c.id} className="group relative">
                  <input 
                    type="color" 
                    value={c.hex}
                    onChange={(e) => updateColor(c.id, e.target.value)}
                    className="w-8 h-8 rounded-full border-2 border-white shadow-sm cursor-pointer overflow-hidden block"
                  />
                  <button 
                    onClick={() => removeColor(c.id)}
                    className="absolute -top-1 -right-1 bg-white rounded-full shadow-md p-0.5 opacity-0 group-hover:opacity-100 transition-opacity text-red-500"
                  >
                    <X size={10} />
                  </button>
                </div>
              ))}
              <button 
                onClick={addColor}
                className="w-8 h-8 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 hover:border-indigo-500 hover:text-indigo-500 transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          </section>

          {/* Rendering Settings */}
          <section className="space-y-4">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <ImageIcon size={14} />
              Rendering
            </h2>
            <div className="space-y-3">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={settings.useDithering}
                  onChange={(e) => updateSetting('useDithering', e.target.checked)}
                  className="hidden peer"
                />
                <div className="w-5 h-5 border-2 rounded peer-checked:bg-indigo-600 peer-checked:border-indigo-600 transition-all flex items-center justify-center">
                  <Check size={12} className="text-white opacity-0 peer-checked:opacity-100" />
                </div>
                <span className="text-sm text-slate-600 group-hover:text-indigo-600 transition-colors">{t.dithering}</span>
              </label>
              
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={settings.showGrid}
                  onChange={(e) => updateSetting('showGrid', e.target.checked)}
                  className="hidden peer"
                />
                <div className="w-5 h-5 border-2 rounded peer-checked:bg-indigo-600 peer-checked:border-indigo-600 transition-all flex items-center justify-center">
                  <Check size={12} className="text-white opacity-0 peer-checked:opacity-100" />
                </div>
                <span className="text-sm text-slate-600 group-hover:text-indigo-600 transition-colors">{t.showGrid}</span>
              </label>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-medium text-slate-500 flex items-center gap-1">
                    <ZoomIn size={12} />
                    {t.zoom}
                  </label>
                  <span className="text-xs font-bold text-indigo-600">{settings.zoom}%</span>
                </div>
                <input 
                  type="range" 
                  min="100" 
                  max="1000" 
                  step="50"
                  value={settings.zoom}
                  onChange={(e) => updateSetting('zoom', parseInt(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>
            </div>
          </section>

          {/* Export */}
          <section className="space-y-3 pt-4 border-t">
            <button 
              onClick={downloadPng}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-colors text-sm font-semibold"
            >
              <Download size={16} />
              {t.exportPng}
            </button>
            <button 
              onClick={downloadCsv}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-sm font-semibold text-slate-700"
            >
              <Download size={16} />
              {t.exportCsv}
            </button>
          </section>
        </aside>

        {/* Pattern Viewer */}
        <section className="flex-1 bg-slate-200 overflow-auto relative p-8 flex flex-col items-center min-h-[400px]">
          {!image && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 bg-slate-100 gap-4">
              <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center">
                <ImageIcon size={32} />
              </div>
              <p className="font-medium">{t.dragDrop}</p>
            </div>
          )}
          
          {isProcessing && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-lg flex items-center gap-2 border border-indigo-100">
              <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs font-bold text-slate-600">Processing Pattern...</span>
            </div>
          )}

          <div className="shadow-2xl bg-white p-4 rounded-lg">
             <canvas ref={canvasRef} className="max-w-full h-auto cursor-crosshair shadow-sm border border-slate-100" />
          </div>

          {/* Legend Section */}
          <div className="w-full max-w-2xl mt-8 bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <GridIcon size={18} className="text-indigo-600" />
                {t.legend}
              </h2>
              <span className="text-xs font-medium text-slate-500">
                Total Beads: <span className="text-slate-900 font-bold">{settings.width * settings.height}</span>
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="pb-2 font-semibold text-slate-500">{t.palette}</th>
                    <th className="pb-2 font-semibold text-slate-500">{t.colorCode}</th>
                    <th className="pb-2 font-semibold text-slate-500 text-right">{t.count}</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {palette.map((color) => {
                    const count = counts.get(color.id) || 0;
                    if (count === 0) return null;
                    return (
                      <tr key={color.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 flex items-center gap-3">
                          <div 
                            className="w-6 h-6 rounded border shadow-sm"
                            style={{ backgroundColor: color.hex }}
                          />
                          <span className="font-mono text-xs">{color.hex.toUpperCase()}</span>
                        </td>
                        <td className="py-3 text-slate-600">{color.code || color.name || '-'}</td>
                        <td className="py-3 text-right font-bold text-slate-800">{count}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
