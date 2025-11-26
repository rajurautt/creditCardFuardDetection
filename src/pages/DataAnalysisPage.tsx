
import React, { useState } from 'react';
import DataUploader from '@/components/data-analysis/DataUploader';
import DataSummary from '@/components/data-analysis/DataSummary';
import FeatureImportanceCard from '@/components/data-analysis/FeatureImportanceCard';

// Mock data for feature importance
const featureImportanceData = [
  { name: 'V17', importance: 0.92 },
  { name: 'V14', importance: 0.87 },
  { name: 'V12', importance: 0.85 },
  { name: 'V10', importance: 0.82 },
  { name: 'V16', importance: 0.78 },
  { name: 'V4', importance: 0.76 },
  { name: 'V11', importance: 0.71 },
  { name: 'Amount', importance: 0.67 },
  { name: 'V3', importance: 0.65 },
  { name: 'V7', importance: 0.62 },
  { name: 'V1', importance: 0.57 },
  { name: 'V2', importance: 0.54 },
  { name: 'Time', importance: 0.48 },
];

const DataAnalysisPage = () => {
  const [uploadedData, setUploadedData] = useState<any>(null);
  
  const handleDataUploaded = (data: any) => {
    setUploadedData(data);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Data Analysis</h1>
        <p className="text-muted-foreground">
          Upload and analyze credit card transaction data
        </p>
      </div>
      
      {!uploadedData ? (
        <div className="max-w-md mx-auto">
          <DataUploader onDataUploaded={handleDataUploaded} />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          <DataSummary data={uploadedData} />
          <FeatureImportanceCard features={featureImportanceData} />
        </div>
      )}
    </div>
  );
};

export default DataAnalysisPage;
