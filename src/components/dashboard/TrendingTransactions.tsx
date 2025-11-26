
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface TrendingTransactionsProps {
  data: {
    day: string;
    legitimate: number;
    fraud: number;
  }[];
}

const TrendingTransactions = ({ data }: TrendingTransactionsProps) => {
  // Format large numbers with K suffix - explicitly returning a string
  const formatYAxis = (value: number): string => {
    return value >= 1000 ? `${(value / 1000).toFixed(0)}k` : `${value}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Transaction Trends</CardTitle>
        <CardDescription>Legitimate vs fraudulent transactions over the past week</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
              <XAxis dataKey="day" />
              <YAxis yAxisId="left" orientation="left" tickFormatter={formatYAxis} />
              <YAxis yAxisId="right" orientation="right" tickFormatter={formatYAxis} />
              <Tooltip
                formatter={(value: number, name: string) => {
                  return [
                    name === 'legitimate' 
                      ? value.toLocaleString() 
                      : value.toLocaleString(),
                    name === 'legitimate' ? 'Legitimate Transactions' : 'Fraudulent'
                  ];
                }}
              />
              <Legend 
                formatter={(value) => {
                  return value === 'legitimate' ? 'Legitimate' : 'Fraudulent';
                }} 
              />
              <Bar 
                yAxisId="left" 
                dataKey="legitimate" 
                name="legitimate" 
                fill="hsl(var(--highlight))" 
                radius={[4, 4, 0, 0]} 
              />
              <Bar 
                yAxisId="right" 
                dataKey="fraud" 
                name="fraud" 
                fill="hsl(var(--destructive))" 
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendingTransactions;
