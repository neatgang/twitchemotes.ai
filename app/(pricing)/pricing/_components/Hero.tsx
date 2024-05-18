"use client"

import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CollapsibleTrigger, CollapsibleContent, Collapsible } from "@/components/ui/collapsible"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { CreditCardIcon, DollarSignIcon } from "lucide-react"
import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"

const pricing = [

]

export const PricingHero = ({
    isPro = false
  }: {
    isPro: boolean;
  }) => {

    const [loading, setLoading] = useState(false);

    const onBasicSubscribe = async () => {
        try {
          setLoading(true);
      
          const response = await axios.get("/api/stripe/subscriptions/basic")
      
          window.location.href = response.data.url;
        } catch (error) {
            console.log(error)
          toast.error("Something went wrong");
        } finally {
          setLoading(false);
        }
      };

      const onStandardSubscribe = async () => {
        try {
          setLoading(true);
      
          const response = await axios.get("/api/stripe/subscriptions/standard")
      
          window.location.href = response.data.url;
        } catch (error) {
            console.log(error)
          toast.error("Something went wrong");
        } finally {
          setLoading(false);
        }
      };

      const onPremiumSubscribe = async () => {
        try {
          setLoading(true);
      
          const response = await axios.get("/api/stripe/subscriptions/premium")
      
          window.location.href = response.data.url;
        } catch (error) {
            console.log(error)
          toast.error("Something went wrong");
        } finally {
          setLoading(false);
        }
      };

  return (

<div className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-purple-500 to-pink-500">
<div className="container px-4 md:px-6">
  <div className="flex flex-col items-center justify-center space-y-4 text-center">
    <div className="space-y-2">
      <div className="inline-block rounded-lg bg-white px-3 py-1 text-sm text-purple-600">Pricing</div>
      <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl">
        Simple pricing for everyone
      </h2>
      <p className="max-w-[700px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
        Choose a plan that fits your needs. No hidden costs, cancel anytime.
      </p>
    </div>
  </div>
  <div className="mx-auto mt-5 grid max-w-screen-lg grid-cols-1 gap-6 md:mt-16 md:grid-cols-2 lg:mt-20 lg:grid-cols-3">
    <Card className="flex flex-col bg-white rounded-lg shadow-lg">
      <CardHeader className="px-6 py-4 border-b">
        <CardTitle className="text-2xl font-bold">Basic</CardTitle>
        <CardDescription className="text-lg text-gray-500">$5/month</CardDescription>
      </CardHeader>
      <CardContent className="px-6 py-4">
        <ul className="space-y-4">
          <li className="flex items-center gap-2">
            <CreditCardIcon className="h-5 w-5 text-purple-500" />
            <span>50 credits/month</span>
          </li>
          <li className="flex items-center gap-2">
            <DollarSignIcon className="h-5 w-5 text-purple-500" />
            <span>Additional credits at $0.12 each</span>
          </li>
        </ul>
      </CardContent>
      <CardFooter className="px-6 py-4 border-t">
      <Button className="w-full bg-purple-500 text-white hover:bg-purple-600" variant="outline" onClick={onBasicSubscribe}>
  Choose Basic
</Button>
      </CardFooter>
    </Card>
    <Card className="flex flex-col bg-white rounded-lg shadow-lg border-2 border-purple-500">
      <CardHeader className="px-6 py-4 border-b bg-purple-500 text-white">
        <CardTitle className="text-2xl font-bold">Standard</CardTitle>
        <CardDescription className="text-lg text-white">$10/month (Best Value)</CardDescription>
      </CardHeader>
      <CardContent className="px-6 py-4">
        <ul className="space-y-4">
          <li className="flex items-center gap-2">
            <CreditCardIcon className="h-5 w-5 text-purple-500" />
            <span>150 credits/month</span>
          </li>
          <li className="flex items-center gap-2">
            <DollarSignIcon className="h-5 w-5 text-purple-500" />
            <span>Additional credits at $0.10 each</span>
          </li>
        </ul>
      </CardContent>
      <CardFooter className="px-6 py-4 border-t">
        <Button className="w-full bg-purple-500 text-white hover:bg-purple-600" onClick={onStandardSubscribe}>Choose Standard</Button>
      </CardFooter>
    </Card>
    <Card className="flex flex-col bg-white rounded-lg shadow-lg">
      <CardHeader className="px-6 py-4 border-b">
        <CardTitle className="text-2xl font-bold">Premium</CardTitle>
        <CardDescription className="text-lg text-gray-500">$24/month</CardDescription>
      </CardHeader>
      <CardContent className="px-6 py-4">
        <ul className="space-y-4">
          <li className="flex items-center gap-2">
            <CreditCardIcon className="h-5 w-5 text-purple-500" />
            <span>300 credits/month</span>
          </li>
          <li className="flex items-center gap-2">
            <DollarSignIcon className="h-5 w-5 text-purple-500" />
            <span>Additional credits at $0.08 each</span>
          </li>
        </ul>
      </CardContent>
      <CardFooter className="px-6 py-4 border-t">
        <Button className="w-full bg-purple-500 text-white hover:bg-purple-600" variant="outline" onClick={onPremiumSubscribe}>
          Choose Premium
        </Button>
      </CardFooter>
    </Card>
  </div>
</div>
</div>

  )} 

  export default PricingHero

