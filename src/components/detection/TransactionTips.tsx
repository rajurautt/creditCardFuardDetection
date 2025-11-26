
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, ShieldCheck, AlertTriangle, Lock, Eye } from 'lucide-react';

const TransactionTips = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="border-safe/50">
          <CardHeader className="pb-2">
            <ShieldCheck className="h-5 w-5 text-safe mb-1" />
            <CardTitle className="text-base">Before Transactions</CardTitle>
            <CardDescription>Security measures to take</CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            <ul className="list-disc pl-4 space-y-1">
              <li>Verify the website has a secure connection (HTTPS)</li>
              <li>Only shop on trusted, well-reviewed sites</li>
              <li>Keep your antivirus software updated</li>
              <li>Use virtual cards for online purchases</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="border-amber-500/50">
          <CardHeader className="pb-2">
            <CreditCard className="h-5 w-5 text-amber-500 mb-1" />
            <CardTitle className="text-base">During Transactions</CardTitle>
            <CardDescription>Safety while purchasing</CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            <ul className="list-disc pl-4 space-y-1">
              <li>Never share your CVV or PIN via email or phone</li>
              <li>Check the URL before entering card information</li>
              <li>Avoid using public Wi-Fi for transactions</li>
              <li>Watch for unusual form fields or redirects</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="border-destructive/50">
          <CardHeader className="pb-2">
            <AlertTriangle className="h-5 w-5 text-destructive mb-1" />
            <CardTitle className="text-base">Warning Signs</CardTitle>
            <CardDescription>Fraud indicators</CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            <ul className="list-disc pl-4 space-y-1">
              <li>Unrealistically low prices or deals</li>
              <li>Pressure to act quickly or urgently</li>
              <li>Poor website design or spelling errors</li>
              <li>Limited or suspicious contact information</li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Fraud Prevention Best Practices
          </CardTitle>
          <CardDescription>
            Detailed guidelines to keep your credit card transactions secure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Protect Your Personal Information</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p>Never share sensitive information like your full card number, expiration date, or security code unless you're making a legitimate purchase on a secure website.</p>
                  <p>Be cautious about the information you share on social media that could be used to answer security questions.</p>
                  <p>Shred documents containing financial information before disposing of them.</p>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>Monitor Your Accounts Regularly</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p>Check your credit card statements at least weekly to quickly identify unauthorized charges.</p>
                  <p>Set up transaction alerts to receive notifications for all purchases or transactions over a certain amount.</p>
                  <p>Review your credit report annually for any accounts you don't recognize.</p>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>Use Strong Authentication Methods</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p>Enable two-factor authentication whenever available for financial accounts.</p>
                  <p>Use strong, unique passwords for each of your financial accounts.</p>
                  <p>Consider using a password manager to securely store complex passwords.</p>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger>Be Cautious with Public Wi-Fi</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p>Avoid making financial transactions on public Wi-Fi networks.</p>
                  <p>Use a VPN (Virtual Private Network) when accessing sensitive information away from home.</p>
                  <p>Ensure your home Wi-Fi network is secured with a strong password.</p>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger>What to Do If You Suspect Fraud</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p>Contact your card issuer immediately to report suspicious activity.</p>
                  <p>Request a replacement card with a new number if your card has been compromised.</p>
                  <p>File a report with the Federal Trade Commission (FTC) at IdentityTheft.gov.</p>
                  <p>Place a fraud alert on your credit reports with the three major credit bureaus.</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionTips;
