
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

interface FraudDistributionCardProps {
  data: {
    name: string;
    value: number;
  }[];
}

const COLORS = ['hsl(var(--safe))', 'hsl(var(--fraud))'];

const FraudDistributionCard = ({ data }: FraudDistributionCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Distribution</CardTitle>
        <CardDescription>
          Ratio of fraudulent to legitimate transactions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-60 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(2)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} transactions`, '']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default FraudDistributionCard;
