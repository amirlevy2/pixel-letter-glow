
import { useState, useEffect, useRef } from 'react';

interface WordPixelGridProps {
  word: string;
}

const WordPixelGrid = ({ word }: WordPixelGridProps) => {
  const gridRef = useRef<HTMLCanvasElement>(null);
  const [pixels, setPixels] = useState<boolean[][]>(Array(9).fill(Array(30).fill(false)));

  useEffect(() => {
    const canvas = gridRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set white background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the word with maximum size and positioning
    ctx.fillStyle = 'black';
    ctx.font = 'bold 350px Heebo, Arial Hebrew, sans-serif'; // Increased font size dramatically
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2 + 50; // Adjusted vertical positioning
    ctx.fillText(word, centerX, centerY);

    // Check pixel coverage
    const pixelSize = canvas.width / 30;
    const newPixels = Array(9).fill(null).map(() => Array(30).fill(false));

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 30; j++) {
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
  }, [word]);

  return (
    <div className="relative w-[720px] h-[216px]">
      <canvas
        ref={gridRef}
        width="720"
        height="216"
        className="absolute top-0 left-0 opacity-0"
      />
      <div className="grid grid-cols-30 gap-0.5 bg-gray-200 p-0.5">
        {pixels.map((row, i) =>
          row.map((isActive, j) => (
            <div
              key={`${i}-${j}`}
              className={`aspect-square ${
                isActive ? 'bg-[#D946EF]' : 'bg-white'
              }`}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default WordPixelGrid;
