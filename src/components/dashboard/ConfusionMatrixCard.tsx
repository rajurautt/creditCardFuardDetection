
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ConfusionMatrixCardProps {
  matrix: [number, number, number, number]; // [TP, FP, FN, TN]
}

const ConfusionMatrixCard = ({ matrix }: ConfusionMatrixCardProps) => {
  const [truePositives, falsePositives, falseNegatives, trueNegatives] = matrix;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Confusion Matrix</CardTitle>
        <CardDescription>
          Performance evaluation of the best model
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-1 max-w-sm mx-auto">
          <div className="bg-safe/20 border border-safe p-4 rounded-tl-md flex flex-col items-center">
            <span className="text-xs mb-1">True Positives</span>
            <span className="font-bold text-xl">{truePositives}</span>
          </div>
          <div className="bg-destructive/20 border border-destructive p-4 rounded-tr-md flex flex-col items-center">
            <span className="text-xs mb-1">False Positives</span>
            <span className="font-bold text-xl">{falsePositives}</span>
          </div>
          <div className="bg-destructive/20 border border-destructive p-4 rounded-bl-md flex flex-col items-center">
            <span className="text-xs mb-1">False Negatives</span>
            <span className="font-bold text-xl">{falseNegatives}</span>
          </div>
          <div className="bg-safe/20 border border-safe p-4 rounded-br-md flex flex-col items-center">
            <span className="text-xs mb-1">True Negatives</span>
            <span className="font-bold text-xl">{trueNegatives}</span>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
          <div className="flex justify-between">
            <span>Accuracy:</span>
            <span className="font-semibold">
              {((truePositives + trueNegatives) / 
                (truePositives + trueNegatives + falsePositives + falseNegatives) * 100).toFixed(2)}%
            </span>
          </div>
          <div className="flex justify-between">
            <span>Precision:</span>
            <span className="font-semibold">
              {(truePositives / (truePositives + falsePositives) * 100).toFixed(2)}%
            </span>
          </div>
          <div className="flex justify-between">
            <span>Recall:</span>
            <span className="font-semibold">
              {(truePositives / (truePositives + falseNegatives) * 100).toFixed(2)}%
            </span>
          </div>
          <div className="flex justify-between">
            <span>F1 Score:</span>
            <span className="font-semibold">
              {((2 * truePositives) / (2 * truePositives + falsePositives + falseNegatives) * 100).toFixed(2)}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConfusionMatrixCard;
