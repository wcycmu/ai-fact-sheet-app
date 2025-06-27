import React, { useState, useCallback } from 'react';
import { generateFactSheet } from './services/geminiService';
import { FactSheetData, GroundingSource } from './types';
import FactSheet from './components/FactSheet';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';

const App: React.FC = () => {
  const [personName, setPersonName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [factSheetData, setFactSheetData] = useState<FactSheetData | null>(null);
  const [sources, setSources] = useState<GroundingSource[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!personName.trim()) {
      setError('Please enter a name.');
      return;
    }
    setHasSearched(true);
    setIsLoading(true);
    setError(null);
    setFactSheetData(null);
    setSources([]);

    try {
      const { data, sources: fetchedSources } = await generateFactSheet(personName);
      setFactSheetData(data);
      setSources(fetchedSources);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to generate fact sheet. ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [personName]);

  return (
    <div className="min-h-screen font-sans p-4 sm:p-6 md:p-8 flex flex-col items-center justify-start animate-fade-in">
      <header className="text-center my-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary mb-2">
          AI Fact Sheet Generator
        </h1>
        <p className="text-content-200 text-lg">
          Generate a detailed fact sheet for any public figure using Gemini.
        </p>
      </header>

      <div className="w-full max-w-4xl mx-auto bg-base-200 rounded-2xl shadow-lg border border-base-300 p-6 sm:p-8">
        <main>
          <form onSubmit={handleSubmit} className="mb-8 flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={personName}
              onChange={(e) => setPersonName(e.target.value)}
              placeholder="Enter a person's name (e.g., 'Marie Curie')"
              className="flex-grow bg-white border-2 border-base-300 rounded-lg px-4 py-3 text-content-100 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary focus:outline-none transition-all duration-300"
              disabled={isLoading}
              aria-label="Person's Name"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transform hover:scale-105 disabled:scale-100"
              disabled={isLoading}
            >
              {isLoading ? <Loader /> : 'Generate Fact Sheet'}
            </button>
          </form>

          <div className="mt-8 min-h-[300px]">
            {isLoading && (
              <div className="flex flex-col items-center justify-center text-center animate-fade-in">
                <Loader />
                <p className="mt-4 text-content-200 animate-pulse">
                  Searching the web and summarizing facts about {personName}...
                </p>
              </div>
            )}
            {error && <ErrorMessage message={error} />}
            {factSheetData && !isLoading && <FactSheet data={factSheetData} sources={sources} />}
            {!hasSearched && !isLoading && !error && (
               <div className="text-center bg-base-100 p-8 rounded-lg border-2 border-dashed border-base-300 animate-fade-in">
                <h2 className="text-2xl font-bold text-content-100 mb-2">Welcome!</h2>
                <p className="text-content-200">Enter a name above to get started. The AI will search Google and generate a detailed summary for you.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;