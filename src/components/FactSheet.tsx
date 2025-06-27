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
  <div className="mb-6">
    <h3 className="text-xl font-bold text-brand-secondary border-b-2 border-base-300 pb-2 mb-3">{title}</h3>
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

    try {
        const canvas = await html2canvas(sheetElement, {
            scale: 2, // Increase scale for better resolution
            backgroundColor: '#1f2937', // Match the dark background
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
        setIsDownloading(false);
    }
  };

  return (
    <>
      <div ref={factSheetRef} className="bg-base-200 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-white">{data.person_name}</h2>
        
        <FactSheetSection title="10 Things You Need to Know" items={data.ten_things_to_know} />
        <FactSheetSection title="Primary Connections" items={data.primary_connections} />
        <FactSheetSection title="Education" items={data.education} />
        <FactSheetSection title="Key Memberships & Awards" items={data.key_memberships_awards} />
        
        {sources.length > 0 && (
          <div className="mt-8 pt-4 border-t border-base-300">
            <h3 className="text-lg font-bold text-brand-secondary mb-3">Sources</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {sources.map((source, index) => <SourceLink key={index} source={source} />)}
            </div>
          </div>
        )}
      </div>

      <div className="text-center mt-8">
        <button
          onClick={handleDownloadPdf}
          disabled={isDownloading}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-wait"
        >
          {isDownloading ? 'Generating PDF...' : 'Download as PDF'}
        </button>
      </div>
    </>
  );
};

export default FactSheet;