
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface FeatureImportanceCardProps {
  features: {
    name: string;
    importance: number;
  }[];
}

const FeatureImportanceCard = ({ features }: FeatureImportanceCardProps) => {
  // Sort features by importance descending
  const sortedFeatures = [...features].sort((a, b) => b.importance - a.importance);

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Feature Importance</CardTitle>
        <CardDescription>
          Top features that contribute to fraud detection
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sortedFeatures}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 1]} />
              <YAxis 
                dataKey="name" 
                type="category" 
                width={150}
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                formatter={(value) => [`${(Number(value) * 100).toFixed(2)}%`, 'Importance']}
              />
              <Bar dataKey="importance" name="Importance" fill="hsl(var(--highlight))" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureImportanceCard;
