"use client";

import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { ArrowRight, Clipboard, Loader, Paperclip, Wand2 } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";

// Define the structure of a message
type Message = {
  role: "assistant" | "system" | "user";
  content: MessageContent[];
  images: ImageContent[]; // Add this line
};

type MessageContent = TextContent | ImageContent;

type TextContent = {
  type: "text";
  text: string;
};

type ImageContent = {
  type: "image_url";
  image_url: {
    url: string;
  };
};

function ChatContainer() {
  const [images, setImages] = useState<File[]>([]);
  const [message, setMessage] = useState("Identify gender and age. List face shape. Describe eye size, shape, and distinctive traits. Note eyebrow thickness, shape, and color. Detail nose size and shape. Outline mouth and lip changes. State skin tone and notable features (wrinkles, freckles). Summarize hair color, length, texture. Observe facial expression. Mention additional features like glasses, facial hair. Conclude with standout features."
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSending, setIsSending] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages((prevImages) => {
        // Calculate how many new images we can add
        const availableSlots = 5 - prevImages.length;
        const newImages = filesArray.slice(0, availableSlots);
        return [...prevImages, ...newImages];
      });
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const sendMessage = async () => {
    setIsSending(true); // Disable send and upload buttons

    // Create the content array for the new user message
    const newUserMessageContent: MessageContent[] = [
      {
        type: "text" as const,
        text: message,
      },
      ...images.map((file) => ({
        type: "image_url" as const,
        // Temporary URLs for rendering - will be replaced by the backend response
        image_url: { url: URL.createObjectURL(file) },
      })),
    ];

    // Create a new user message object
    const newUserMessage: Message = {
      role: "user",
      content: newUserMessageContent as (TextContent | ImageContent)[],
      images: images.map((file) => ({ // Add this line
        type: "image_url" as const,
        image_url: { url: URL.createObjectURL(file) },
      })),
    };

    // Update the messages state to include the new user message
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);

    // Convert images to base64 strings for the backend
    const imagePromises = images.map((file) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
    });

    const imageBase64Strings = await Promise.all(imagePromises);

    // Construct the payload with base64 strings
    const payload = {
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: message },
            ...imageBase64Strings.map((base64) => ({
              type: "image_url",
              image_url: { url: base64 },
            })),
          ],
        },
      ],
    };

    try {
      // Send the message to the backend
      const response = await axios.post("/api/vision", payload);

      console.log("API response:", response.data);

      if (!response.data.success) {
        toast.error(response.data.error);
      }

      const newMessage = { ...response.data.message };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    } catch (error) {
      toast.error("Failed to send message");
      // Optionally remove the user message if sending fails or handle the error as needed
    } finally {
      // Clear the message and images state, regardless of whether the send was successful
      setMessage("");
      setImages([]);
      setIsSending(false); // Re-enable send and upload buttons
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
  {messages.map((message, idx) => (
    message.role !== "user" && (
      <div
        key={idx}
        className={`flex mb-4 ${
          message.role === "system" ? "justify-end" : "justify-start"
        }`}
      >
        <div
          className={`rounded-lg p-2 max-w-xs lg:max-w-md ${
            message.role === "system"
              ? "bg-purple-500 text-white"
              : "bg-pink-500 text-white"
          }`}
        >
          {/* Ensure that content is an array before mapping */}
          {Array.isArray(message.content) ? (
            message.content.map((content, index) => {
              if (content.type === "text") {
                return <p key={index}>{content.text}</p>;
              } else if (content.type === "image_url") {
                return (
                  <Image
                    key={index}
                    src={content.image_url.url}
                    alt={`Uploaded by ${message.role}`}
                    className="h-16 w-16 object-cover rounded-lg"
                    width={64}
                    height={64}
                  />
                );
              }
            })
          ) : (
            // If message.content is not an array, render it as a string
            <p>{message.content}</p>
          )}
          <Button
          variant="secondary"
  className="w-full mt-2"
  onClick={() => {
    navigator.clipboard.writeText(JSON.stringify(message.content))
      .then(() => {
        toast.success("Text copied successfully");
      })
      .catch((error) => {
        console.error("Failed to copy text: ", error);
      });
  }}
>
  <Clipboard className="h-5 w-5" />
</Button>
        </div>
      </div>
    )
  ))}
</div>
      {/* Image preview row */}
      <div className="p-4">
        {images.map((image, index) => (
          <div key={index} className="relative inline-block">
            <Image
              src={URL.createObjectURL(image)}
              alt={`upload-preview ${index}`}
              className="h-16 w-16 object-cover rounded-lg mr-2"
              width={64}
              height={64}
            />
            <button
              onClick={() => removeImage(index)}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      {/* Input area */}
      <div className="flex flex-col items-center space-y-2 p-4 bg-white">
  <label className="flex justify-center items-center p-2 rounded-full bg-gray-200 text-gray-500 w-10 h-10 cursor-pointer">
    <Paperclip className="h-5 w-5" />
    <input
      type="file"
      accept="image/*"
      multiple
      onChange={handleImageChange}
      className="hidden"
      disabled={isSending}
    />
  </label>
  <Button
    className="w-full mt-2"
    onClick={sendMessage}
    disabled={isSending}
  >
    {isSending ? (
      <Loader className="h-5 w-5 fa-spin" />
    ) : (
      <div className="flex">
        Generate
        <Wand2 className="pl-1 h-5 w-5" />
      </div>
    )}
  </Button>
</div>
    </div>
  );
}

export default ChatContainer;
