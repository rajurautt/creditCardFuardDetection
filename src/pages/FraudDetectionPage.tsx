
import React, { useState } from 'react';
import TransactionForm from '@/components/detection/TransactionForm';
import FraudResult from '@/components/detection/FraudResult';
import RiskMeter from '@/components/detection/RiskMeter';
import TransactionTips from '@/components/detection/TransactionTips';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Define types for the transaction data
type TransactionData = {
  amount: number;
  time: number;
  v1: number;
  v2: number;
  v3: number;
  v4: number;
};

type ResultData = {
  prediction: 'fraud' | 'legitimate';
  probability: number;
  featureContributions: {
    name: string;
    value: number;
  }[];
};

const FraudDetectionPage = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ResultData | null>(null);
  const [activeTab, setActiveTab] = useState("analyze");
  
  const handleSubmit = (values: TransactionData) => {
    setIsAnalyzing(true);
    
    // Simulate API request delay
    setTimeout(() => {
      // Generate mock results based on the input values
      let isFraud = false;
      
      // Make transactions with high amounts more likely to be fraud
      if (values.amount > 1000) {
        isFraud = Math.random() > 0.5;
      } else if (values.v1 < -3 || values.v2 < -3) {
        isFraud = Math.random() > 0.7;
      } else {
        isFraud = Math.random() > 0.9;
      }
      
      const probability = isFraud ? 0.7 + Math.random() * 0.3 : 0.7 + Math.random() * 0.25;
      
      // Generate dynamic feature contributions
      const featureContributions = [
        { name: 'Amount', value: values.amount > 500 ? 0.4 : -0.3 },
        { name: 'Time', value: values.time > 10000 ? 0.2 : -0.1 },
        { name: 'V1', value: values.v1 < 0 ? 0.25 : -0.2 },
        { name: 'V2', value: values.v2 < 0 ? 0.15 : -0.25 },
        { name: 'V3', value: values.v3 < 0 ? 0.3 : -0.15 },
        { name: 'V4', value: values.v4 < 0 ? 0.1 : -0.3 },
      ];
      
      const mockResult: ResultData = {
        prediction: isFraud ? 'fraud' : 'legitimate',
        probability,
        featureContributions,
      };
      
      setResult(mockResult);
      setIsAnalyzing(false);
      
      toast.success(
        isFraud ? 
          'Transaction analyzed - Fraud detected!' :
          'Transaction analyzed - Appears legitimate'
      );
    }, 2000);
  };
  
  const handleReset = () => {
    setResult(null);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Fraud Detection</h1>
          <p className="text-muted-foreground">
            Analyze transactions to detect potential fraud
          </p>
        </div>
        <div className="hidden md:flex items-center gap-2 bg-muted/50 p-2 rounded-lg">
          <ShieldCheck className="h-5 w-5 text-safe" />
          <span className="text-sm">Powered by AI fraud detection</span>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="analyze">Analyze Transaction</TabsTrigger>
          <TabsTrigger value="tips">Security Tips</TabsTrigger>
        </TabsList>
        <TabsContent value="analyze" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {result ? (
                <div className="space-y-4">
                  <FraudResult 
                    result={result} 
                    onReset={handleReset}  
                  />
                  
                  <div className="text-center">
                    <Button 
                      variant="outline" 
                      onClick={handleReset}
                      className="gap-2"
                      size="sm"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Check Another Transaction
                    </Button>
                  </div>
                </div>
              ) : (
                <TransactionForm 
                  onSubmit={handleSubmit} 
                  isLoading={isAnalyzing} 
                />
              )}
            </div>
            
            <div>
              <RiskMeter riskScore={result ? (result.prediction === 'fraud' ? result.probability * 100 : 100 - result.probability * 100) : 0} />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="tips">
          <TransactionTips />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FraudDetectionPage;
