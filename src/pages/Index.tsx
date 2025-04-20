
import { useState } from 'react';
import PixelGrid from '../components/PixelGrid';

const Index = () => {
  const [letter, setLetter] = useState('A');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-8">Pixel Letter Transform</h1>
      
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-6">
          <label htmlFor="letter" className="block text-sm font-medium text-gray-700 mb-2">
            Enter a Letter
          </label>
          <input
            type="text"
            id="letter"
            maxLength={1}
            value={letter}
            onChange={(e) => setLetter(e.target.value.toUpperCase())}
            className="w-20 text-center px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D946EF] focus:border-transparent"
          />
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
