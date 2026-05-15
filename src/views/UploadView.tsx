import { useRef, useState } from 'react';
import { upload } from '../lib/clientProcess';
import type { UploadOutput } from '../lib/clientProcess';

interface UploadViewProps {
  onReady: (output: UploadOutput) => void;
}

const ACCEPTED = '.svg,.lbrn2,.xcs,.png,.jpg,.jpeg,.webp';

export function UploadView({ onReady }: UploadViewProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleFile(file: File) {
    setError(null);
    setLoading(true);
    try {
      const output = await upload(file);
      onReady(output);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to process file');
    } finally {
      setLoading(false);
    }
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <h1 className="text-2xl font-bold text-brand-900 mb-2 text-center">
          Laser Template Builder
        </h1>
        <p className="text-brand-700 text-center mb-8 text-sm">
          Upload a template file to get started
        </p>

        <div
          className={`border-2 border-dashed rounded-xl p-12 flex flex-col items-center gap-4 cursor-pointer transition-colors
            ${dragging ? 'border-brand-500 bg-brand-100' : 'border-brand-200 bg-white hover:border-brand-400 hover:bg-brand-50'}`}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
        >
          <svg className="w-10 h-10 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
          <div className="text-center">
            <p className="font-medium text-brand-700">
              {loading ? 'Processing…' : 'Drop a file here, or click to browse'}
            </p>
            <p className="text-xs text-brand-500 mt-1">SVG · LBRN2 · XCS · PNG · JPG · WEBP</p>
          </div>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED}
          className="hidden"
          onChange={onInputChange}
        />

        {error && (
          <p className="mt-4 text-sm text-red-600 text-center">{error}</p>
        )}
      </div>
    </div>
  );
}
