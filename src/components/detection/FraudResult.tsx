
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface FraudResultProps {
  result: {
    prediction: 'fraud' | 'legitimate';
    probability: number;
    featureContributions: {
      name: string;
      value: number;
    }[];
  };
  onReset: () => void;
}

const FraudResult = ({ result, onReset }: FraudResultProps) => {
  const isFraud = result.prediction === 'fraud';
  
  // Format feature contributions to show positive and negative influences
  const featureData = result.featureContributions.map(fc => {
    return {
      name: fc.name,
      value: fc.value,
      // Add color property to use for the fill
      color: fc.value >= 0 ? 'hsl(var(--destructive))' : 'hsl(var(--safe))'
    };
  });
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className={isFraud ? 'bg-destructive/10' : 'bg-safe/10'}>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            {isFraud ? (
              <>
                <AlertCircle className="h-5 w-5 text-destructive" />
                <span>Fraud Alert</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="h-5 w-5 text-safe" />
                <span>Transaction Legitimate</span>
              </>
            )}
          </CardTitle>
          <Badge variant={isFraud ? 'destructive' : 'outline'} className={!isFraud ? 'bg-safe text-safe-foreground' : ''}>
            {isFraud ? 'Fraud' : 'Safe'}
          </Badge>
        </div>
        <CardDescription>
          {isFraud 
            ? 'This transaction has been flagged as potentially fraudulent' 
            : 'This transaction appears to be legitimate'}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-semibold mb-2">Confidence Score</h4>
            <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
              <div 
                className={`h-4 ${isFraud ? 'bg-destructive' : 'bg-safe'}`}
                style={{ width: `${result.probability * 100}%` }}
              ></div>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {isFraud 
                ? `Model is ${(result.probability * 100).toFixed(1)}% confident this transaction is fraudulent` 
                : `Model is ${(result.probability * 100).toFixed(1)}% confident this transaction is legitimate`}
            </p>
          </div>
          
          <div>
            <Tabs defaultValue="chart">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="chart">Feature Analysis</TabsTrigger>
                <TabsTrigger value="table">Feature Table</TabsTrigger>
              </TabsList>
              <TabsContent value="chart" className="mt-4">
                <div className="h-60 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={featureData}
                      margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        width={80}
                        tick={{ fontSize: 12 }}
                      />
                      <Tooltip 
                        formatter={(value) => [
                          `Impact: ${Number(value) > 0 ? 'Increases' : 'Decreases'} fraud likelihood by ${Math.abs(Number(value) * 100).toFixed(2)}%`,
                          ''
                        ]}
                      />
                      <Bar 
                        dataKey="value" 
                        fill="#8884d8" // Default fill
                        radius={[4, 4, 4, 4]}
                        // Use the color field to determine the fill
                        fillOpacity={1}
                        stroke="none"
                        name="Impact"
                      >
                        {featureData.map((entry, index) => (
                          <rect 
                            key={`rect-${index}`}
                            x={0} 
                            y={0} 
                            width={0} 
                            height={0}
                            fill={entry.value >= 0 ? 'hsl(var(--destructive))' : 'hsl(var(--safe))'}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-xs text-muted-foreground mt-2 flex items-center">
                  <Info className="h-3 w-3 mr-1" />
                  Positive values increase fraud likelihood, negative values decrease it
                </p>
              </TabsContent>
              <TabsContent value="table" className="mt-4">
                <div className="text-sm">
                  <div className="grid grid-cols-2 font-medium border-b py-2">
                    <span>Feature</span>
                    <span className="text-right">Contribution</span>
                  </div>
                  {featureData.map((feature, index) => (
                    <div key={index} className="grid grid-cols-2 py-2 border-b last:border-0">
                      <span>{feature.name}</span>
                      <span className={`text-right ${feature.value >= 0 ? 'text-destructive' : 'text-safe'}`}>
                        {feature.value >= 0 ? '+' : ''}{(feature.value * 100).toFixed(2)}%
                      </span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onReset} className="w-full">
          Check Another Transaction
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FraudResult;
