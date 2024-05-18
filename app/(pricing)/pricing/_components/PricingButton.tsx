import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export const SubscriptionButton = ({
  selectedPlan = null,
}: {
  selectedPlan: "basic" | "standard" | "premium" | null;
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onClick = async () => {
    try {
      setLoading(true);

      let subscriptionType;
      switch (selectedPlan) {
        case "basic":
          subscriptionType = "basic";
          break;
        case "standard":
          subscriptionType = "standard";
          break;
        case "premium":
          subscriptionType = "premium";
          break;
        default:
          return;
      }

      const response = await axios.get(`/api/stripe/subscriptions/${subscriptionType}`, {
        params: {
          isPro: true,
        },
      });

      window.location.href = response.data.url;
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const buttonText = (() => {
    switch (selectedPlan) {
      case "basic":
        return "Choose Basic";
      case "standard":
        return "Choose Standard";
      case "premium":
        return "Choose Premium";
      default:
        return "Upgrade";
    }
  })();

  return (
    <Button
      variant={selectedPlan ? "default" : "ghost"}
      disabled={loading}
      onClick={onClick}
      className="md:block w-full flex items-center"
    >
      {buttonText}
    </Button>
  );
};