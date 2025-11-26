
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';

interface DataUploaderProps {
  onDataUploaded: (data: any) => void;
}

const DataUploader = ({ onDataUploaded }: DataUploaderProps) => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
      setError(null);
    }
  };

  const processFile = () => {
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    if (!file.name.endsWith('.csv')) {
      setError('Only CSV files are supported.');
      return;
    }

    setLoading(true);
    setProgress(0);

    // Simulate processing with artificial delay and progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate CSV parsing
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        if (event.target && typeof event.target.result === 'string') {
          const csvData = event.target.result;
          const lines = csvData.split('\n');
          const headers = lines[0].split(',');
          
          // Process CSV data (just a simple demonstration)
          const sampleData = {
            headers,
            rowCount: lines.length - 1,
            sampleRows: lines.slice(1, 6).map(line => line.split(','))
          };

          clearInterval(interval);
          setProgress(100);
          
          setTimeout(() => {
            setLoading(false);
            toast({
              title: "Data uploaded successfully",
              description: `${sampleData.rowCount} rows processed.`,
              duration: 5000,
            });
            onDataUploaded(sampleData);
          }, 500);
        }
      } catch (err) {
        clearInterval(interval);
        setLoading(false);
        setProgress(0);
        setError('Failed to process the file. Please check the format.');
      }
    };

    reader.onerror = () => {
      clearInterval(interval);
      setLoading(false);
      setProgress(0);
      setError('Error reading the file.');
    };

    reader.readAsText(file);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Dataset</CardTitle>
        <CardDescription>
          Upload a CSV file containing credit card transaction data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div 
          className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-upload')?.click()}
        >
          <Upload className="h-10 w-10 text-gray-400 mb-2" />
          <p className="text-sm text-gray-600 mb-1">
            Drag and drop your CSV file here or click to browse
          </p>
          <p className="text-xs text-gray-500">
            Supports CSV files up to 10MB
          </p>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            accept=".csv"
            onChange={handleFileChange}
          />
        </div>
        
        {file && (
          <div className="mt-4">
            <p className="text-sm font-medium">Selected file:</p>
            <p className="text-sm text-gray-600">{file.name} ({(file.size / 1024).toFixed(2)} KB)</p>
          </div>
        )}
        
        {loading && (
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Processing...</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
        
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={processFile} 
          disabled={!file || loading}
          className="w-full"
        >
          {loading ? 'Processing...' : 'Upload Dataset'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DataUploader;
