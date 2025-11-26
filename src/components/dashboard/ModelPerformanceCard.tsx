
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

interface ModelPerformanceProps {
  data: {
    name: string;
    precision: number;
    recall: number;
    f1Score: number;
    auc: number;
  }[];
}

const ModelPerformanceCard = ({ data }: ModelPerformanceProps) => {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Model Performance Comparison</CardTitle>
        <CardDescription>
          Comparing precision, recall, F1-score, and AUC-ROC across models
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 1]} />
              <Tooltip 
                formatter={(value) => [`${(Number(value) * 100).toFixed(2)}%`, '']}
              />
              <Legend />
              <Bar dataKey="precision" fill="#8884d8" name="Precision" />
              <Bar dataKey="recall" fill="#82ca9d" name="Recall" />
              <Bar dataKey="f1Score" fill="#ffc658" name="F1 Score" />
              <Bar dataKey="auc" fill="#ff8042" name="AUC-ROC" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModelPerformanceCard;
