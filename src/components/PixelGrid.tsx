
import { useState, useEffect, useRef } from 'react';

interface PixelGridProps {
  letter: string;
  font: string;
  gridSize?: number;
  activeColor?: string;
  backgroundColor?: string;
}

const PixelGrid = ({ 
  letter, 
  font, 
  gridSize = 9, 
  activeColor = '#D946EF',
  backgroundColor = 'white'
}: PixelGridProps) => {
  const gridRef = useRef<HTMLCanvasElement>(null);
  const [pixels, setPixels] = useState<boolean[][]>(Array(gridSize).fill(Array(gridSize).fill(false)));

  useEffect(() => {
    const canvas = gridRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set background
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the letter
    ctx.fillStyle = 'black';
    ctx.font = `bold 400px ${font}, sans-serif`;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    const centerX = canvas.width / 2;
    const centerY = (canvas.height / 2) + 60;
    ctx.fillText(letter, centerX, centerY);

    // Check pixel coverage
    const pixelSize = canvas.width / gridSize;
    const newPixels = Array(gridSize).fill(null).map(() => Array(gridSize).fill(false));

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const imageData = ctx.getImageData(
          j * pixelSize,
          i * pixelSize,
          pixelSize,
          pixelSize
        );
        
        let blackPixels = 0;
        for (let k = 0; k < imageData.data.length; k += 4) {
          if (imageData.data[k] < 128) {
            blackPixels++;
          }
        }

        const coverage = blackPixels / (pixelSize * pixelSize);
        newPixels[i][j] = coverage > 0;
      }
    }

    setPixels(newPixels);
  }, [letter, font, gridSize, backgroundColor]);

  return (
    <div className="relative w-[360px] h-[360px]">
      <canvas
        ref={gridRef}
        width="360"
        height="360"
        className="absolute top-0 left-0 opacity-0"
      />
      <div className={`grid gap-0.5 bg-gray-200 p-0.5`} style={{
        gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`
      }}>
        {pixels.map((row, i) =>
          row.map((isActive, j) => (
            <div
              key={`${i}-${j}`}
              className="aspect-square"
              style={{
                backgroundColor: isActive ? activeColor : backgroundColor
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default PixelGrid;
