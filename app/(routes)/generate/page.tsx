"use client";

import axios from "axios"
import * as z from "zod";

import { Download, ImageIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { formSchema, } from "./constants";
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Heading } from "@/components/Heading";
import { Loader } from "@/components/Loader";
import Empty from "@/components/Empty";

type Image = {
  id: string;
  output: string[];
};

// const images: Image[] 


const ImagePage = () => {
    const router = useRouter();
    const [images, setImages] = useState<Image[]>([]);

    // const amountOptions = [
    //     { value: "1", label: "1" },
    //     { value: "2", label: "2" },
    //     { value: "3", label: "3" },
    //     { value: "4", label: "4" },
    // ];

    // const colorOptions = ["blue", "red", "pink", "green", "orange", "yellow", "white", "black"].map(color => ({ value: color, label: color }));
    // const shapeOptions = ["square", "circle", "rounded"].map(shape => ({ value: shape, label: shape }));
    // const styleOptions = ["claymorphic", "3d rendered", "pixelated", "illustrated with color pencil"].map(style => ({ value: style, label: style }));

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
            // negativePrompt: "",
            // amount: "1",
        },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setImages([]);
            // const finalPrompt = `a modern ${values.shape} icon in ${values.color} of ${values.prompt}, ${values.style}, minimialistic, high quality, trending on art station, unreal engine graphics quality`;
            const finalPrompt = `A TOK emoji of a ${values.prompt}`;
            const response = await axios.post("/api/generate", {
                finalPrompt,
                ...values,
                // amount: parseInt(values.amount),
            });
            setImages(response.data);
            form.reset();
        } catch (error: any) {
            console.log(error);
        } finally {
            router.refresh();
        }
    };

    return (
        <div>
            <Heading
                title="EmoteMaker.ai"
                description="Generate emotes from a prompt."
                Icon={ImageIcon}
                iconColor="text-pink-500"
                bgColor="bg-pink-500/10"
            />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2" onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-12">
                                        <div className="text-l font-bold">Describe your emote</div>
                                        <FormControl className="m-0 p-0">
                                            <Input
                                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                disabled={isLoading}
                                                placeholder="A picture of a horse in the Swiss alps."
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            {/* <FormField
                                name="negativePrompt"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-12">
                                        <div className="text-l font-bold">What you don&apos;t want in your emote</div>
                                        <FormControl className="m-0 p-0">
                                            <Input
                                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                disabled={isLoading}
                                                placeholder="Not a picture of a horse in the Swiss alps."
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            /> */}
                            {/* <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem className="col-span-12">
                                        <div className="text-l font-bold">How many emotes in this style do you want to generate?</div>
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue defaultValue={field.value} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {amountOptions.map((option) => (
                                                    <SelectItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            /> */}
                            {/* <FormField
  control={form.control}
  name="color"
  render={({ field }) => (
    <FormItem className="col-span-12">
      <div className="text-l font-bold">Choose a color</div>
      <Select
        disabled={isLoading}
        onValueChange={field.onChange}
        value={field.value}
        defaultValue={field.value}
      >
        <FormControl>
          <SelectTrigger>
            <SelectValue defaultValue={field.value} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {colorOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormItem>
  )}
/>
<FormField
  control={form.control}
  name="shape"
  render={({ field }) => (
    <FormItem className="col-span-12">
      <div className="text-l font-bold">Choose a shape</div>
      <Select
        disabled={isLoading}
        onValueChange={field.onChange}
        value={field.value}
        defaultValue={field.value}
      >
        <FormControl>
          <SelectTrigger>
            <SelectValue defaultValue={field.value} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {shapeOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormItem>
  )}
/>
<FormField
  control={form.control}
  name="style"
  render={({ field }) => (
    <FormItem className="col-span-12">
      <div className="text-l font-bold">Choose a style</div>
      <Select
        disabled={isLoading}
        onValueChange={field.onChange}
        value={field.value}
        defaultValue={field.value}
      >
        <FormControl>
          <SelectTrigger>
            <SelectValue defaultValue={field.value} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {styleOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormItem>
  )}
/> */}
                            <Button className="col-span-12 w-full" type="submit" disabled={isLoading} size="icon">
                                Generate
                            </Button>
                            {/* <Button className="col-span-12 w-full" variant="link" onClick={() => router.push('/image/prompts')}>
                                View Prompts
                            </Button> */}
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-20">
                            <Loader />
                        </div>
                    )}
                    {/* {images.length === 0 && !isLoading && (
                        <Empty label="No images generated." />
                    )} */}
                    <div className="grid grid-cols-1 mid:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
                    {images.map((image: Image) => (
    <div className="pb-4" key={image.id}>
      <Card
        key={image.id}
        className="rounded-lg overflow-hidden"
      >
        <div className="relative aspect-square">
          {image.output.map((src, index) => (
            <Image
              key={index}
              alt="Image"
              fill
              src={src}
            />
          ))}
        </div>
        <CardFooter className="p-2">
          {image.output.map((src, index) => (
            <Button key={index} variant="secondary" className="w-full" onClick={() => window.open(src)}>
              <Download className="h-4 w-4 mr-2">
                Download
              </Download>
            </Button>
          ))}
        </CardFooter>
      </Card>
    </div>
  ))}
</div>
                </div>
            </div>
        </div>
    );
}

export default ImagePage;