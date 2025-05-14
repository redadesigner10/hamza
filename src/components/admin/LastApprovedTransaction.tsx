
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, CreditCard } from 'lucide-react';
import type { Transaction } from '@/types/crypto';
import { formatDate, formatAmount } from '@/utils/formatters';

interface LastApprovedTransactionProps {
  transaction: Transaction & { approvedAt: Date } | null;
}

export const LastApprovedTransaction: React.FC<LastApprovedTransactionProps> = ({ transaction }) => {
  if (!transaction) return null;

  const formatCardNumber = (number?: string) => {
    if (!number) return 'N/A';
    return `•••• ${number.slice(-4)}`;
  };

  const getCardType = (number?: string) => {
    if (!number) return 'Unknown';
    const firstDigit = number.charAt(0);
    
    switch (firstDigit) {
      case '3': return 'American Express';
      case '4': return 'Visa';
      case '5': return 'MasterCard';
      case '6': return 'Discover';
      default: return 'Unknown';
    }
  };

  return (
    <Card className="crypto-card mb-6 border-green-500/20">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Check className="h-5 w-5 mr-2 text-green-500" />
          Last Approved Transaction
        </CardTitle>
        <CardDescription>
          Transaction approved at {formatDate(transaction.approvedAt)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Transaction Details</h3>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between">
                  <span>Type:</span>
                  <span className="font-medium capitalize">{transaction.type}</span>
                </div>
                <div className="flex justify-between">
                  <span>Amount:</span>
                  <span className="font-medium">{formatAmount(transaction.amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span className="font-medium">{transaction.created_at}</span>
                </div>
                {transaction.type === 'buy' && (
                  <div className="flex justify-between">
                    <span>Commission (14%):</span>
                    <span className="font-medium">{formatAmount(transaction.amount * 0.14)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
