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
        <div className="flex flex-col min-h-screen">
          {/* <header className="bg-gray-900 text-white py-4 px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="#" prefetch={false}>
                <SmileIcon className="h-8 w-auto" />
                <span className="text-lg font-bold">EmoteMaker.ai</span>
              </Link>
              <nav className="hidden md:flex items-center gap-4">
                <Link href="#" className="hover:text-gray-300" prefetch={false}>
                  Home
                </Link>
                <Link href="#" className="hover:text-gray-300" prefetch={false}>
                  Profile
                </Link>
                <Link href="#" className="hover:text-gray-300" prefetch={false}>
                  Marketplace
                </Link>
                <Link href="#" className="hover:text-gray-300" prefetch={false}>
                  Journaling
                </Link>
                <Link href="#" className="hover:text-gray-300" prefetch={false}>
                  Support
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-9 w-9">
                    <img src="/placeholder.svg" alt="@shadcn" />
                    <AvatarFallback>JP</AvatarFallback>
                    <span className="sr-only">Toggle user menu</span>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <img src="/placeholder.svg" alt="@shadcn" />
                        <AvatarFallback>JP</AvatarFallback>
                      </Avatar>
                      <span>John Doe</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header> */}
          <main className="flex-1 bg-gray-100 dark:bg-gray-950 py-10">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
              <div className="grid gap-8">
                <div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h1 className="text-2xl font-bold">Purchase Additional Credits</h1>
                        <p className="text-gray-500 dark:text-gray-400">Boost your creativity with more credits</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">Current Subscription</p>
                          <p className="font-medium">Pro Plan</p>
                        </div>
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">Remaining Credits</p>
                          <p className="font-medium">250</p>
                        </div>
                        <Button variant="secondary">Upgrade Plan</Button>
                      </div>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    <Card>
                      <CardHeader>
                        <CardTitle>Small Pack</CardTitle>
                        <CardDescription>20 Credits | $2.40 | $0.12 per credit</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button className="w-full">Buy Now</Button>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Medium Pack</CardTitle>
                        <CardDescription>50 Credits | $5.00 | $0.10 per credit</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button className="w-full">Buy Now</Button>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Large Pack</CardTitle>
                        <CardDescription>100 Credits | $8.00 | $0.08 per credit</CardDescription>
                        <CardDescription className="text-green-500">
                          Get 10% extra credits on purchases of 100 credits or more!
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button className="w-full">Buy Now</Button>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>XL Pack</CardTitle>
                        <CardDescription>1000 Credits | $80 | $0.08 per credit</CardDescription>
                        <CardDescription className="text-green-500">
                          Get 10% extra credits on purchases of 100 credits or more!
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button className="w-full">Buy Now</Button>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-r from-[#ff6b6b] to-[#ffa500] text-white">
                      <CardHeader>
                        <CardTitle>XXL Pack</CardTitle>
                        <CardDescription>2500 Credits | $175 | $0.07 per credit</CardDescription>
                        <CardDescription className="text-green-500">
                          Get 10% extra credits on purchases of 100 credits or more!
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button className="w-full">Buy Now</Button>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-r from-[#9b59b6] to-[#8e44ad] text-white">
                      <CardHeader>
                        <CardTitle>XXXL Pack</CardTitle>
                        <CardDescription>5000 Credits | $325 | $0.065 per credit</CardDescription>
                        <CardDescription className="text-green-500">
                          Get 10% extra credits on purchases of 100 credits or more!
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button className="w-full">Buy Now</Button>
                      </CardContent>
                    </Card>
                  </div>
                  {/* <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-8">
                    <h2 className="text-xl font-bold mb-4">Payment Information</h2>
                    <div className="grid gap-4">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="name">Name on Card</Label>
                        <Input id="name" placeholder="John Doe" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="expiryMonth">Expiry Month</Label>
                          <Select>
                            <SelectTrigger id="expiryMonth">
                              <SelectValue placeholder="Month" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="01">January</SelectItem>
                              <SelectItem value="02">February</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="expiryYear">Expiry Year</Label>
                          <Select>
                            <SelectTrigger id="expiryYear">
                              <SelectValue placeholder="Year" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="2023">2023</SelectItem>
                              <SelectItem value="2024">2024</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" />
                      </div>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-lg font-bold mb-2">Accepted Payment Methods</h3>
                      <div className="flex items-center gap-4">
                        <CreditCardIcon className="w-6 h-6" />
                        <ShoppingCartIcon className="w-6 h-6" />
                        <AppleIcon className="w-6 h-6" />
                        <CreditCardIcon className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-lg font-bold mb-2">Billing Information</h3>
                      <div className="grid gap-4">
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="billingAddress">Address</Label>
                          <Input id="billingAddress" placeholder="123 Main St" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex flex-col gap-2">
                            <Label htmlFor="city">City</Label>
                            <Input id="city" placeholder="New York" />
                          </div>
                          <div className="flex flex-col gap-2">
                            <Label htmlFor="state">State</Label>
                            <Input id="state" placeholder="NY" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex flex-col gap-2">
                            <Label htmlFor="zip">Zip Code</Label>
                            <Input id="zip" placeholder="10001" />
                          </div>
                          <div className="flex flex-col gap-2">
                            <Label htmlFor="country">Country</Label>
                            <Input id="country" placeholder="United States" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full mt-4">Complete Purchase</Button>
                  </div> */}
                </div>
                {/* <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold mb-4">Cart Overview</h2>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">500 Credits</p>
                        <p className="text-gray-500 dark:text-gray-400">$45</p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <XIcon className="w-5 h-5" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">1000 Credits</p>
                        <p className="text-gray-500 dark:text-gray-400">$80</p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <XIcon className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Total</p>
                    <p className="font-medium">$125</p>
                  </div>
                  <Button className="w-full mt-4">Proceed to Checkout</Button>
                </div> */}
              </div>
            </div>
          </main>
          {/* <footer className="bg-gray-900 text-white py-6 px-6">
            <div className="container mx-auto flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Link href="#" className="hover:text-gray-300" prefetch={false}>
                  Terms of Service
                </Link>
                <Link href="#" className="hover:text-gray-300" prefetch={false}>
                  Privacy Policy
                </Link>
                <Link href="#" className="hover:text-gray-300" prefetch={false}>
                  Support
                </Link>
              </div>
              <p className="text-gray-500 dark:text-gray-400">&copy; 2024 EmoteMaker.ai. All rights reserved.</p>
            </div>
          </footer> */}
        </div>
      )
    }
    
export default CreditsHero

