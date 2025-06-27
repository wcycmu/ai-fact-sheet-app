import React, { useRef, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import type { FactSheetData, GroundingSource } from '../types';
import SourceLink from './SourceLink';

interface FactSheetProps {
  data: FactSheetData;
  sources: GroundingSource[];
}

const FactSheetSection: React.FC<{ title: string; items: string[] }> = ({ title, items }) => (
  <div className="bg-base-200 p-6 rounded-lg shadow-md border border-base-300">
    <h3 className="text-xl font-bold text-brand-secondary border-b-2 border-base-300 pb-2 mb-4">{title}</h3>
    {items.length > 0 ? (
      <ul className="list-disc list-inside space-y-2 text-content-100 pl-2">
        {items.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
    ) : (
      <p className="text-content-200 italic">No information found.</p>
    )}
  </div>
);


const FactSheet: React.FC<FactSheetProps> = ({ data, sources }) => {
  const factSheetRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPdf = async () => {
    const sheetElement = factSheetRef.current;
    if (!sheetElement) {
        alert("Could not find the fact sheet content to download.");
        return;
    }

    setIsDownloading(true);
    // Add a class to apply specific print-friendly styles
    sheetElement.classList.add('print-mode');

    try {
        const canvas = await html2canvas(sheetElement, {
            scale: 2,
            backgroundColor: '#ffffff', // Explicitly set a white background for the capture
            useCORS: true,
        });
        
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: [canvas.width, canvas.height]
        });

        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        
        const fileName = `${data.person_name.toLowerCase().replace(/\s/g, '_')}_fact_sheet.pdf`;
        pdf.save(fileName);
    } catch (error) {
        console.error("Failed to generate PDF:", error);
        alert("Sorry, there was an error creating the PDF. Please try again.");
    } finally {
        // Always remove the class after the operation is complete
        sheetElement.classList.remove('print-mode');
        setIsDownloading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <div ref={factSheetRef} className="p-1">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-content-100">{data.person_name}</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="lg:col-span-2">
            <FactSheetSection title="10 Things You Need to Know" items={data.ten_things_to_know} />
          </div>
          <FactSheetSection title="Primary Connections" items={data.primary_connections} />
          <FactSheetSection title="Education" items={data.education} />
          <div className="lg:col-span-2">
            <FactSheetSection title="Key Memberships & Awards" items={data.key_memberships_awards} />
          </div>
        </div>
        
        {sources.length > 0 && (
          <div className="mt-8 pt-6 border-t border-base-300">
            <h3 className="text-xl font-bold text-brand-secondary mb-4">Sources</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {sources.map((source, index) => <SourceLink key={index} source={source} />)}
            </div>
          </div>
        )}
      </div>

      <div className="text-center mt-12">
        <button
          onClick={handleDownloadPdf}
          disabled={isDownloading}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-wait transform hover:scale-105 disabled:scale-100"
        >
          {isDownloading ? 'Generating PDF...' : 'Download as PDF'}
        </button>
      </div>
    </div>
  );
};

export default FactSheet;