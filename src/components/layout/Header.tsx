
import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, BarChart2, Home, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-highlight" />
          <h1 className="text-xl font-bold">Credit Card Fraud Detection</h1>
        </div>
        
        <Tabs defaultValue={path} className="w-fit" value={path} onValueChange={(value) => navigate(value)}>
          <TabsList>
            <TabsTrigger value="/" className={cn("gap-2", path === "/" && "text-highlight")}>
              <Home size={16} />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="/data" className={cn("gap-2", path === "/data" && "text-highlight")}>
              <BarChart2 size={16} />
              <span className="hidden sm:inline">Data Analysis</span>
            </TabsTrigger>
            <TabsTrigger value="/detection" className={cn("gap-2", path === "/detection" && "text-highlight")}>
              <AlertTriangle size={16} />
              <span className="hidden sm:inline">Fraud Detection</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </header>
  );
};

export default Header;
