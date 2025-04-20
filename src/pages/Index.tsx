
import { useState } from 'react';
import PixelGrid from '../components/PixelGrid';

const HEBREW_ALPHABET = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י', 'כ', 'ל', 'מ', 'נ', 'ס', 'ע', 'פ', 'צ', 'ק', 'ר', 'ש', 'ת'];

const Index = () => {
  const [letter, setLetter] = useState('א');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-8">Pixel Letter Transform - Hebrew</h1>
      
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-6">
          <label htmlFor="letter" className="block text-sm font-medium text-gray-700 mb-2">
            Select a Hebrew Letter
          </label>
          <select
            id="letter"
            value={letter}
            onChange={(e) => setLetter(e.target.value)}
            className="w-20 text-center px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D946EF] focus:border-transparent text-xl"
            style={{ fontFamily: 'Arial Hebrew, Arial' }}
          >
            {HEBREW_ALPHABET.map((char) => (
              <option key={char} value={char}>
                {char}
              </option>
            ))}
          </select>
        </div>

        <PixelGrid letter={letter} />
        
        <p className="mt-4 text-sm text-gray-600 text-center">
          Pixels turn pink when the letter covers more than 95% of the area
        </p>
      </div>
    </div>
  );
};

export default Index;
