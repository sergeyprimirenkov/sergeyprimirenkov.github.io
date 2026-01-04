
import { ColorInfo } from '../types';

/**
 * Converts HEX to RGB components
 */
function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

/**
 * Perception-weighted color distance
 */
function colorDist(c1: [number, number, number], c2: [number, number, number]): number {
  const rmean = (c1[0] + c2[0]) / 2;
  const r = c1[0] - c2[0];
  const g = c1[1] - c2[1];
  const b = c1[2] - c2[2];
  return Math.sqrt((((512 + rmean) * r * r) >> 8) + 4 * g * g + (((767 - rmean) * b * b) >> 8));
}

/**
 * Finds the closest color in the palette
 */
function findClosestColor(r: number, g: number, b: number, palette: ColorInfo[]): { color: ColorInfo, rgb: [number, number, number] } {
  let minDistance = Infinity;
  let closest = palette[0];
  let closestRgb: [number, number, number] = [0, 0, 0];

  for (const p of palette) {
    const pRgb = hexToRgb(p.hex);
    const dist = colorDist([r, g, b], pRgb);
    if (dist < minDistance) {
      minDistance = dist;
      closest = p;
      closestRgb = pRgb;
    }
  }
  return { color: closest, rgb: closestRgb };
}

/**
 * Process the image into a bead pattern
 */
export async function processBeadPattern(
  sourceImage: HTMLImageElement,
  width: number,
  height: number,
  palette: ColorInfo[],
  useDithering: boolean
): Promise<{ imageData: ImageData, counts: Map<string, number> }> {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) throw new Error('Could not get context');

  // Draw scaled image
  ctx.drawImage(sourceImage, 0, 0, width, height);
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  const counts = new Map<string, number>();

  if (useDithering) {
    // Floyd-Steinberg Dithering
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;
        const oldR = data[i];
        const oldG = data[i + 1];
        const oldB = data[i + 2];

        const { color, rgb: [newR, newG, newB] } = findClosestColor(oldR, oldG, oldB, palette);

        data[i] = newR;
        data[i + 1] = newG;
        data[i + 2] = newB;

        const errR = oldR - newR;
        const errG = oldG - newG;
        const errB = oldB - newB;

        // Spread error to neighbors
        const distributeError = (nx: number, ny: number, factor: number) => {
          if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
            const ni = (ny * width + nx) * 4;
            data[ni] = Math.min(255, Math.max(0, data[ni] + errR * factor));
            data[ni + 1] = Math.min(255, Math.max(0, data[ni + 1] + errG * factor));
            data[ni + 2] = Math.min(255, Math.max(0, data[ni + 2] + errB * factor));
          }
        };

        distributeError(x + 1, y, 7 / 16);
        distributeError(x - 1, y + 1, 3 / 16);
        distributeError(x, y + 1, 5 / 16);
        distributeError(x + 1, y + 1, 1 / 16);

        counts.set(color.id, (counts.get(color.id) || 0) + 1);
      }
    }
  } else {
    // Standard color mapping
    for (let i = 0; i < data.length; i += 4) {
      const { color, rgb: [r, g, b] } = findClosestColor(data[i], data[i + 1], data[i + 2], palette);
      data[i] = r;
      data[i + 1] = g;
      data[i + 2] = b;
      counts.set(color.id, (counts.get(color.id) || 0) + 1);
    }
  }

  return { imageData, counts };
}
