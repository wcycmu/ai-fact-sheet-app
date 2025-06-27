
import React from 'react';

const CodeBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <pre className="bg-base-300 p-4 rounded-md text-content-100 overflow-x-auto text-sm">
    <code>{children}</code>
  </pre>
);

const DeploymentGuide: React.FC = () => {
  return (
    <div className="bg-base-200 p-8 rounded-lg shadow-lg animate-fade-in">
      <h2 className="text-3xl font-extrabold mb-6 text-white text-center">Deployment Instructions</h2>
      <div className="space-y-8 text-content-100">
        
        <div>
          <h3 className="text-xl font-bold text-brand-secondary mb-3">Prerequisites</h3>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>Node.js and npm (or yarn) installed on your machine.</li>
            <li>A Google AI API Key. You can get one from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Google AI Studio</a>.</li>
            <li>A hosting provider like Vercel, Netlify, or Firebase Hosting. We'll use Vercel as an example.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold text-brand-secondary mb-3">Step 1: Set Up Your Project</h3>
          <p className="mb-2">First, ensure all the generated code files are in a single project directory.</p>
          <p className="mb-2">Open your terminal, navigate to your project directory, and install the necessary dependencies:</p>
          <CodeBlock>npm install react react-dom @google/genai</CodeBlock>
        </div>

        <div>
          <h3 className="text-xl font-bold text-brand-secondary mb-3">Step 2: Set Up Environment Variables</h3>
           <p className="mb-2">This application requires your Google AI API key to be set as an environment variable. When deploying to a service like Vercel, you need to configure this in the project settings.</p>
           <p className="mb-2">In your Vercel Project Settings, go to "Environment Variables" and add a new one:</p>
           <ul className="list-disc list-inside space-y-2 pl-2">
                <li><strong>Name:</strong> <code className="bg-base-300 px-1 rounded">VITE_API_KEY</code> (Note: The `VITE_` prefix is crucial for frontend frameworks like Vite to expose it).</li>
                <li><strong>Value:</strong> Paste your Google AI API Key here.</li>
           </ul>
           <p className="mt-4 mb-2">To make this work locally for testing, create a file named <code className="bg-base-300 px-1 rounded">.env.local</code> in your project root and add the following line:</p>
           <CodeBlock>VITE_API_KEY=your_google_ai_api_key_here</CodeBlock>
           <p className="mt-2 text-sm text-yellow-400">Important: You will also need to update <code className="bg-base-300 px-1 rounded">services/geminiService.ts</code> to use <code className="bg-base-300 px-1 rounded">import.meta.env.VITE_API_KEY</code> instead of <code className="bg-base-300 px-1 rounded">process.env.API_KEY</code> to be compatible with a standard Vite setup.</p>
        </div>

        <div>
          <h3 className="text-xl font-bold text-brand-secondary mb-3">Step 3: Deploy to Vercel</h3>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>Push your code to a GitHub, GitLab, or Bitbucket repository.</li>
            <li>Go to <a href="https://vercel.com/new" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Vercel</a> and create a new project by importing your repository.</li>
            <li>Vercel will automatically detect that it's a React project (likely using Vite as a build tool).</li>
            <li>Ensure the Environment Variable you set in Step 2 is correctly linked.</li>
            <li>Click "Deploy". Vercel will build and deploy your site.</li>
            <li>Once deployed, you will get a public URL for your new web app!</li>
          </ul>
        </div>
        
      </div>
    </div>
  );
};

export default DeploymentGuide;

