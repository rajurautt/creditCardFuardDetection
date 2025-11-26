
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CreditCard, Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Define the schema for transaction data
const transactionSchema = z.object({
  amount: z.string().min(1, "Amount is required")
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val), "Must be a valid number")
    .refine((val) => val >= 0, "Amount must be positive"),
  time: z.string().min(1, "Time delta is required")
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val), "Must be a valid number")
    .refine((val) => val >= 0, "Time must be positive"),
  v1: z.string().optional()
    .transform((val) => val === "" ? 0 : parseFloat(val))
    .refine((val) => !isNaN(val), "Must be a valid number"),
  v2: z.string().optional()
    .transform((val) => val === "" ? 0 : parseFloat(val))
    .refine((val) => !isNaN(val), "Must be a valid number"),
  v3: z.string().optional()
    .transform((val) => val === "" ? 0 : parseFloat(val))
    .refine((val) => !isNaN(val), "Must be a valid number"),
  v4: z.string().optional()
    .transform((val) => val === "" ? 0 : parseFloat(val))
    .refine((val) => !isNaN(val), "Must be a valid number"),
});

// Define the input form values type using string for form inputs
type TransactionFormInputs = {
  amount: string;
  time: string;
  v1: string;
  v2: string;
  v3: string;
  v4: string;
};

// Define the processed type after zod transformation for the onSubmit handler
type TransactionFormValues = z.infer<typeof transactionSchema>;

interface TransactionFormProps {
  onSubmit: (values: TransactionFormValues) => void;
  isLoading: boolean;
}

// Sample transaction presets for quick testing
const TRANSACTION_PRESETS = [
  {
    name: "Low Amount",
    values: { amount: "50.75", time: "5400", v1: "-1.3598", v2: "1.1918", v3: "0.2661", v4: "0.1664" }
  },
  {
    name: "High Amount",
    values: { amount: "3500.00", time: "25000", v1: "-2.7871", v2: "-0.3274", v3: "1.0787", v4: "-0.7080" }
  },
  {
    name: "Suspicious",
    values: { amount: "2150.33", time: "10800", v1: "-4.7359", v2: "-3.5230", v3: "-5.3104", v4: "-1.9271" }
  }
];

const TransactionForm = ({ onSubmit, isLoading }: TransactionFormProps) => {
  const form = useForm<TransactionFormInputs>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      amount: "",
      time: "",
      v1: "",
      v2: "",
      v3: "",
      v4: ""
    }
  });

  const handleSubmit = (values: TransactionFormInputs) => {
    // The resolver will handle the transformation to numbers
    onSubmit(values as unknown as TransactionFormValues);
  };

  const usePreset = (preset: typeof TRANSACTION_PRESETS[0]) => {
    form.reset(preset.values);
  };

  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="bg-muted/30 pb-8">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mt-10 -mr-10 z-0"></div>
        <div className="absolute top-0 left-0 w-16 h-16 bg-primary/5 rounded-full -mt-6 -ml-6 z-0"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <CreditCard className="h-5 w-5 text-primary" />
            <CardTitle>Transaction Analysis</CardTitle>
          </div>
          <CardDescription>
            Enter transaction details to check for potential fraud
          </CardDescription>
        </div>
      </CardHeader>
      
      <Tabs defaultValue="manual" className="w-full">
        <div className="px-6 pt-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
            <TabsTrigger value="presets">Quick Presets</TabsTrigger>
          </TabsList>
        </div>
        
        <CardContent className="pt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <TabsContent value="manual" className="space-y-4 mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 123.45" {...field} type="number" step="0.01" />
                        </FormControl>
                        <FormDescription>Transaction amount in original currency</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 86400" {...field} type="number" />
                        </FormControl>
                        <FormDescription>Seconds elapsed between this transaction and first transaction</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="v1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>V1 (PCA Feature)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. -1.3598071336738" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="v2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>V2 (PCA Feature)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 1.19185711131486" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="v3"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>V3 (PCA Feature)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 0.26615071205963" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="v4"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>V4 (PCA Feature)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 0.16648011335321" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="bg-muted p-3 rounded-md text-xs flex items-start gap-2 text-muted-foreground">
                  <AlertCircle className="h-4 w-4 mt-0.5" />
                  <p>
                    For academic purposes, we've simplified the model to use only a subset of features. In production, models typically use 30+ PCA features from the dataset.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="presets" className="mt-0">
                <div className="space-y-4">
                  <div className="bg-muted/50 p-3 rounded-md text-sm">
                    Select a preset to quickly test the fraud detection model with pre-filled transaction data.
                  </div>
                  
                  <div className="space-y-3">
                    {TRANSACTION_PRESETS.map((preset, index) => (
                      <div 
                        key={index}
                        className="border rounded-lg p-3 hover:border-primary hover:bg-accent/30 cursor-pointer transition-colors"
                        onClick={() => usePreset(preset)}
                      >
                        <div className="font-medium">{preset.name} Transaction</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          <div className="flex justify-between">
                            <span>Amount: ${preset.values.amount}</span>
                            <span>Time: {preset.values.time}s</span>
                          </div>
                          <div className="grid grid-cols-4 gap-1 mt-1 text-xs">
                            <span>V1: {preset.values.v1}</span>
                            <span>V2: {preset.values.v2}</span>
                            <span>V3: {preset.values.v3}</span>
                            <span>V4: {preset.values.v4}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <CardFooter className="px-0 pt-6">
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Analyze Transaction"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default TransactionForm;
