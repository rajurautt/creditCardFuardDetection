
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

interface RiskMeterProps {
  riskScore: number;
}

const RiskMeter = ({ riskScore }: RiskMeterProps) => {
  // Normalize risk score between 0-100
  const normalizedScore = Math.min(Math.max(riskScore, 0), 100);
  
  // Determine color and label based on risk score
  const getColorClass = () => {
    if (normalizedScore < 30) return 'bg-safe';
    if (normalizedScore < 70) return 'bg-amber-500';
    return 'bg-destructive';
  };
  
  const getRiskLabel = () => {
    if (normalizedScore < 30) return 'Low Risk';
    if (normalizedScore < 70) return 'Medium Risk';
    return 'High Risk';
  };
  
  const getRiskDescription = () => {
    if (normalizedScore < 30) return 'This transaction appears to be legitimate with low fraud risk.';
    if (normalizedScore < 70) return 'This transaction shows some unusual patterns but may be legitimate.';
    return 'This transaction has multiple high-risk indicators suggesting potential fraud.';
  };

  const Icon = normalizedScore < 50 ? ShieldCheck : AlertTriangle;
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Risk Assessment</CardTitle>
        <CardDescription>Transaction risk evaluation</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="relative h-44 w-44">
            {/* Circular background */}
            <div className="absolute inset-0 rounded-full bg-muted flex items-center justify-center">
              <div className={cn(
                "relative h-32 w-32 rounded-full flex items-center justify-center transition-all duration-700",
                normalizedScore < 30 ? "bg-safe/10" : 
                normalizedScore < 70 ? "bg-amber-500/10" : "bg-destructive/10"
              )}>
                <span className="text-3xl font-bold">
                  {Math.round(normalizedScore)}%
                </span>
              </div>
            </div>
            
            {/* Indicator arc */}
            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
              <circle 
                cx="50" 
                cy="50" 
                r="45" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="8"
                strokeDasharray="283"
                strokeDashoffset={283 - (283 * normalizedScore / 100)}
                className={cn(
                  "transition-all duration-700 ease-in-out",
                  normalizedScore < 30 ? "text-safe" : 
                  normalizedScore < 70 ? "text-amber-500" : "text-destructive"
                )}
              />
            </svg>
            
            {/* Indicator dots */}
            {[0, 30, 60, 90].map((degree) => {
              const radian = ((degree - 90) * Math.PI) / 180;
              const x = 50 + 45 * Math.cos(radian);
              const y = 50 + 45 * Math.sin(radian);
              
              return (
                <div 
                  key={degree}
                  className={cn(
                    "absolute h-2 w-2 rounded-full",
                    normalizedScore >= degree ? "bg-muted-foreground" : "bg-muted"
                  )}
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              );
            })}
          </div>
          
          <div className="flex items-center space-x-2 mt-2">
            <Icon 
              className={cn(
                "h-5 w-5",
                normalizedScore < 30 ? "text-safe" : 
                normalizedScore < 70 ? "text-amber-500" : "text-destructive"
              )}
            />
            <span className="font-medium">{getRiskLabel()}</span>
          </div>
        </div>
        
        <div className="text-sm text-muted-foreground">
          {getRiskDescription()}
        </div>
        
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="border rounded-md p-2">
            <div className="w-full h-1.5 bg-safe mb-1 rounded-full" />
            <span>Low Risk</span>
          </div>
          <div className="border rounded-md p-2">
            <div className="w-full h-1.5 bg-amber-500 mb-1 rounded-full" />
            <span>Medium Risk</span>
          </div>
          <div className="border rounded-md p-2">
            <div className="w-full h-1.5 bg-destructive mb-1 rounded-full" />
            <span>High Risk</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskMeter;
