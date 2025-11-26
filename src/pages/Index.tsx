
import React from 'react';
import StatCard from '@/components/dashboard/StatCard';
import ModelPerformanceCard from '@/components/dashboard/ModelPerformanceCard';
import FraudDistributionCard from '@/components/dashboard/FraudDistributionCard';
import ConfusionMatrixCard from '@/components/dashboard/ConfusionMatrixCard';
import TrendingTransactions from '@/components/dashboard/TrendingTransactions';
import { Activity, AlertTriangle, BarChart3, Shield, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

// Demo data - in a real application, this would come from a backend
const modelPerformanceData = [
  { name: 'Logistic Reg.', precision: 0.85, recall: 0.75, f1Score: 0.80, auc: 0.82 },
  { name: 'Random Forest', precision: 0.92, recall: 0.83, f1Score: 0.87, auc: 0.94 },
  { name: 'XGBoost', precision: 0.94, recall: 0.85, f1Score: 0.89, auc: 0.96 },
];

const fraudDistributionData = [
  { name: 'Legitimate', value: 284315 },
  { name: 'Fraudulent', value: 492 },
];

const confusionMatrixData: [number, number, number, number] = [420, 72, 27, 56936]; // TP, FP, FN, TN

const transactionTrendsData = [
  { day: 'Mon', legitimate: 42800, fraud: 75 },
  { day: 'Tue', legitimate: 39500, fraud: 68 },
  { day: 'Wed', legitimate: 44200, fraud: 82 },
  { day: 'Thu', legitimate: 46100, fraud: 74 },
  { day: 'Fri', legitimate: 50300, fraud: 91 },
  { day: 'Sat', legitimate: 36900, fraud: 53 },
  { day: 'Sun', legitimate: 24500, fraud: 49 },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/80 via-primary to-primary/90 p-8 text-white shadow-lg">
        <div className="absolute inset-0 opacity-20">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="none" stroke="white" strokeWidth="0.5" />
            <path d="M0,0 L100,100 M100,0 L0,100" fill="none" stroke="white" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="white" strokeWidth="0.5" />
          </svg>
        </div>
        <div className="relative z-10 max-w-xl space-y-4">
          <h1 className="text-4xl font-bold mb-2">Credit Card Fraud Detection</h1>
          <p className="text-lg opacity-90">
            Interactive AI system to detect and analyze fraudulent credit card transactions
          </p>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => navigate('/detection')} className="bg-white text-primary hover:bg-white/90">
              <CreditCard className="mr-2 h-4 w-4" />
              Check Transaction
            </Button>
            <Button variant="outline" onClick={() => navigate('/data')} className="bg-transparent border-white text-white hover:bg-white/10">
              <BarChart3 className="mr-2 h-4 w-4" />
              Analyze Data
            </Button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Transactions" 
          value={284807}
          description="Total number of processed transactions"
          icon={<Activity className="h-4 w-4" />}
        />
        <StatCard 
          title="Fraud Detected" 
          value={492}
          description="Fraudulent transactions identified"
          icon={<AlertTriangle className="h-4 w-4" />}
          className="border-destructive/50"
        />
        <StatCard 
          title="Fraud Rate" 
          value="0.17%"
          description="Percentage of fraudulent transactions"
          icon={<BarChart3 className="h-4 w-4" />}
        />
        <StatCard 
          title="Best Model F1" 
          value="0.89"
          description="XGBoost model performance"
          icon={<Shield className="h-4 w-4" />}
          trend={{
            value: 5.2,
            isPositive: true
          }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <ModelPerformanceCard data={modelPerformanceData} />
          <div className="mt-6">
            <TrendingTransactions data={transactionTrendsData} />
          </div>
        </div>
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
          <FraudDistributionCard data={fraudDistributionData} />
          <ConfusionMatrixCard matrix={confusionMatrixData} />
        </div>
      </div>
    </div>
  );
};

export default Index;
