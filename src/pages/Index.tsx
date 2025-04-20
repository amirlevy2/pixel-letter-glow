import { useState } from 'react';
import PixelGrid from '../components/PixelGrid';
import WordPixelGrid from '../components/WordPixelGrid';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const HEBREW_ALPHABET = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י', 'כ', 'ל', 'מ', 'נ', 'ס', 'ע', 'פ', 'צ', 'ק', 'ר', 'ש', 'ת'];
const FONTS = ['Heebo', 'Arial Hebrew'];
const GRID_SIZES = Array.from({ length: 23 }, (_, i) => i + 3); // 3 to 25

const Index = () => {
  const [letter, setLetter] = useState('א');
  const [word, setWord] = useState('');
  const [letterFont, setLetterFont] = useState(FONTS[0]);
  const [wordFont, setWordFont] = useState(FONTS[0]);
  const [letterGridSize, setLetterGridSize] = useState(9);
  const [letterActiveColor, setLetterActiveColor] = useState('#D946EF');
  const [letterBgColor, setLetterBgColor] = useState('#FFFFFF');
  const [wordActiveColor, setWordActiveColor] = useState('#D946EF');
  const [wordBgColor, setWordBgColor] = useState('#FFFFFF');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 gap-8">
      <h1 className="text-3xl font-bold mb-8 font-hadassa">Pixel Letter Transform - Hebrew</h1>
      
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <div>
            <label htmlFor="letter" className="block text-sm font-medium text-gray-700 mb-2">
              Select a Hebrew Letter
            </label>
            <select
              id="letter"
              value={letter}
              onChange={(e) => setLetter(e.target.value)}
              className="w-20 text-center px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D946EF] focus:border-transparent text-xl font-hadassa"
            >
              {HEBREW_ALPHABET.map((char) => (
                <option key={char} value={char}>
                  {char}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="letterFont" className="block text-sm font-medium text-gray-700 mb-2">
              Select Font
            </label>
            <Select value={letterFont} onValueChange={setLetterFont}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select font" />
              </SelectTrigger>
              <SelectContent>
                {FONTS.map((font) => (
                  <SelectItem key={font} value={font}>
                    {font}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="letterGridSize" className="block text-sm font-medium text-gray-700 mb-2">
              Grid Size
            </label>
            <Select value={letterGridSize.toString()} onValueChange={(value) => setLetterGridSize(Number(value))}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Size" />
              </SelectTrigger>
              <SelectContent>
                {GRID_SIZES.map((size) => (
                  <SelectItem key={size} value={size.toString()}>
                    {size}x{size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="letterActiveColor" className="block text-sm font-medium text-gray-700 mb-2">
              Pixel Color
            </label>
            <input
              type="color"
              id="letterActiveColor"
              value={letterActiveColor}
              onChange={(e) => setLetterActiveColor(e.target.value)}
              className="w-20 h-10 p-1 rounded cursor-pointer"
            />
          </div>

          <div>
            <label htmlFor="letterBgColor" className="block text-sm font-medium text-gray-700 mb-2">
              Background Color
            </label>
            <input
              type="color"
              id="letterBgColor"
              value={letterBgColor}
              onChange={(e) => setLetterBgColor(e.target.value)}
              className="w-20 h-10 p-1 rounded cursor-pointer"
            />
          </div>
        </div>

        <PixelGrid 
          letter={letter} 
          font={letterFont} 
          gridSize={letterGridSize}
          activeColor={letterActiveColor}
          backgroundColor={letterBgColor}
        />
        
        <p className="mt-4 text-sm text-gray-600 text-center font-hadassa">
          Pixels turn pink when the letter covers any part of the area
        </p>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <div className="flex-1">
            <label htmlFor="word" className="block text-sm font-medium text-gray-700 mb-2">
              Enter a Hebrew Word
            </label>
            <Input
              id="word"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              className="text-xl font-hadassa text-right"
              dir="rtl"
              placeholder="הקלד מילה בעברית"
            />
          </div>
          
          <div>
            <label htmlFor="wordFont" className="block text-sm font-medium text-gray-700 mb-2">
              Select Font
            </label>
            <Select value={wordFont} onValueChange={setWordFont}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select font" />
              </SelectTrigger>
              <SelectContent>
                {FONTS.map((font) => (
                  <SelectItem key={font} value={font}>
                    {font}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="wordActiveColor" className="block text-sm font-medium text-gray-700 mb-2">
              Pixel Color
            </label>
            <input
              type="color"
              id="wordActiveColor"
              value={wordActiveColor}
              onChange={(e) => setWordActiveColor(e.target.value)}
              className="w-20 h-10 p-1 rounded cursor-pointer"
            />
          </div>

          <div>
            <label htmlFor="wordBgColor" className="block text-sm font-medium text-gray-700 mb-2">
              Background Color
            </label>
            <input
              type="color"
              id="wordBgColor"
              value={wordBgColor}
              onChange={(e) => setWordBgColor(e.target.value)}
              className="w-20 h-10 p-1 rounded cursor-pointer"
            />
          </div>
        </div>

        <WordPixelGrid 
          word={word} 
          font={wordFont}
          activeColor={wordActiveColor}
          backgroundColor={wordBgColor}
        />
        
        <p className="mt-4 text-sm text-gray-600 text-center font-hadassa">
          Pixels turn pink when text covers any part of the area
        </p>
      </div>
    </div>
  );
};

export default Index;
