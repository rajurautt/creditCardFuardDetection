
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface DataSummaryProps {
  data: {
    headers: string[];
    rowCount: number;
    sampleRows: string[][];
  };
}

const DataSummary = ({ data }: DataSummaryProps) => {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Dataset Summary</CardTitle>
            <CardDescription>
              Overview of the uploaded transaction dataset
            </CardDescription>
          </div>
          <Badge variant="outline">{data.rowCount.toLocaleString()} Rows</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                {data.headers.map((header, idx) => (
                  <TableHead key={idx} className="whitespace-nowrap">
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.sampleRows.map((row, rowIdx) => (
                <TableRow key={rowIdx}>
                  {row.map((cell, cellIdx) => (
                    <TableCell key={cellIdx}>
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-2 text-sm text-muted-foreground">
          Showing first 5 rows of {data.rowCount.toLocaleString()} total rows
        </div>
      </CardContent>
    </Card>
  );
};

export default DataSummary;
