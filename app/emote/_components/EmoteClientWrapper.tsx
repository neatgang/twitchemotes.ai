'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const EmoteClientWrapper = ({ children, emoteId }: { children: React.ReactNode, emoteId: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const success = searchParams.get('success');
  const paymentIntentId = searchParams.get('payment_intent');

  useEffect(() => {
    const handleSuccessfulPurchase = async (paymentIntentId: string) => {
      try {
        await axios.post('/api/purchases', { 
          emoteId: emoteId,
          paymentIntentId: paymentIntentId
        });
        toast.success('Purchase successful!');
        router.refresh();
      } catch (error) {
        console.error('Error handling successful purchase:', error);
        toast.error('There was an issue completing your purchase. Please contact support.');
      }
    };

    if (success === 'true' && paymentIntentId) {
      handleSuccessfulPurchase(paymentIntentId);
    }
  }, [success, paymentIntentId, emoteId, router]);

  return (
  <div>{children}</div>
  )
};

export default EmoteClientWrapper;