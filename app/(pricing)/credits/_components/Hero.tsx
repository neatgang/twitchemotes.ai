"use client"

import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CollapsibleTrigger, CollapsibleContent, Collapsible } from "@/components/ui/collapsible"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

const pricing = [

]

export const CreditsHero = ({
    isPro = false
  }: {
    isPro: boolean;
  }) => {

    const [loading, setLoading] = useState(false);

    const purchaseCredits = async (packageType: string) => {
      try {
          setLoading(true);
          const response = await axios.get(`/api/stripe/credits?package=${packageType}`);
          window.location.href = response.data.url;
      } catch (error) {
          console.error(error);
          toast.error("Something went wrong");
      } finally {
          setLoading(false);
      }
  };

  return (
    <div className="flex flex-col min-h-screen">
        <main className="flex-1 bg-gray-100 dark:bg-gray-950 py-10">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <div className="grid gap-8">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold">Purchase Additional Credits</h1>
                                <p className="text-gray-500 dark:text-gray-400">Boost your creativity with more credits</p>
                            </div>
                            {/* <div className="flex items-center gap-4">
                                <div>
                                    <p className="text-gray-500 dark:text-gray-400">Current Subscription</p>
                                    <p className="font-medium">Pro Plan</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 dark:text-gray-400">Remaining Credits</p>
                                    <p className="font-medium">250</p>
                                </div>
                                <Button variant="secondary">Upgrade Plan</Button>
                            </div> */}
                        </div>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Small Pack</CardTitle>
                                <CardDescription>20 Credits | $2.40 | $0.12 per credit</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full" onClick={() => purchaseCredits('small')}>Buy Now</Button>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Medium Pack</CardTitle>
                                <CardDescription>50 Credits | $5.00 | $0.10 per credit</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full" onClick={() => purchaseCredits('medium')}>Buy Now</Button>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Large Pack</CardTitle>
                                <CardDescription>100 Credits | $8.00 | $0.08 per credit</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full" onClick={() => purchaseCredits('large')}>Buy Now</Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </main>
    </div>
);
};

export default CreditsHero;
