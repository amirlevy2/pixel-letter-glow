
import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import html2canvas from 'html2canvas';

interface WordPixelGridProps {
  word: string;
  font: string;
  activeColor?: string;
  backgroundColor?: string;
  shape?: 'square' | 'circle';
}

const WordPixelGrid = forwardRef<{ downloadAsImage: () => void }, WordPixelGridProps>(({ 
  word, 
  font,
  activeColor = '#D946EF',
  backgroundColor = 'white',
  shape = 'square'
}, ref) => {
  const gridWidth = 30; // Fixed width
  const gridHeight = 9; // Fixed height
  const gridRef = useRef<HTMLCanvasElement>(null);
  const [pixels, setPixels] = useState<boolean[][]>(Array(gridHeight).fill(Array(gridWidth).fill(false)));

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

    // Draw the word
    ctx.fillStyle = 'black';
    ctx.font = `bold 350px ${font}, sans-serif`;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2 + 50;
    ctx.fillText(word, centerX, centerY);

    // Check pixel coverage
    const pixelSize = canvas.width / gridWidth;
    const newPixels = Array(gridHeight).fill(null).map(() => Array(gridWidth).fill(false));

    for (let i = 0; i < gridHeight; i++) {
      for (let j = 0; j < gridWidth; j++) {
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
  }, [word, font, backgroundColor]);

  const downloadAsImage = () => {
    const grid = document.createElement('div');
    grid.className = `grid gap-0.5 bg-gray-200 p-0.5`;
    grid.style.width = '720px';
    grid.style.height = '216px';
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = `repeat(${gridWidth}, minmax(0, 1fr))`;

    pixels.forEach(row => {
      row.forEach(isActive => {
        const pixel = document.createElement('div');
        pixel.className = 'aspect-square';
        pixel.style.backgroundColor = isActive ? activeColor : backgroundColor;
        if (shape === 'circle') {
          pixel.style.borderRadius = '50%';
        }
        grid.appendChild(pixel);
      });
    });

    html2canvas(grid).then(canvas => {
      const link = document.createElement('a');
      link.download = `pixel-word-${word}.png`;
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  // Expose the downloadAsImage method to parent components
  useImperativeHandle(ref, () => ({
    downloadAsImage
  }));

  return (
    <div className="relative w-[720px] h-[216px]">
      <canvas
        ref={gridRef}
        width="720"
        height="216"
        className="absolute top-0 left-0 opacity-0"
      />
      <div className={`grid grid-cols-30 gap-0.5 bg-gray-200 p-0.5`}>
        {pixels.map((row, i) =>
          row.map((isActive, j) => (
            <div
              key={`${i}-${j}`}
              className={`aspect-square ${shape === 'circle' ? 'rounded-full' : ''}`}
              style={{
                backgroundColor: isActive ? activeColor : backgroundColor
              }}
            />
          ))
        )}
      </div>
    </div>
  );
});

WordPixelGrid.displayName = 'WordPixelGrid';

export default WordPixelGrid;
