"use client";

import axios from "axios";
import { useState } from "react";
import { Zap } from "lucide-react";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";

export const SubscriptionButton = ({
  isPro = false
}: {
  isPro: boolean;
}) => {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      setLoading(true);
  
      const response = await axios.get("/api/stripe/", {
        params: {
          isPro,
        },
      });
  
      window.location.href = response.data.url;
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
<Button variant={isPro ? "ghost" : "default"} disabled={loading} onClick={onClick} className="md:block w-full flex items-center">
  {isPro ? "Manage Subscription" : "Upgrade"}
  {/* {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />} */}
</Button>
  )
};