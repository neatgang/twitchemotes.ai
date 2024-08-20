'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { ChevronDown } from "lucide-react"
import { useState } from 'react'; // Import useState
import { cn } from "@/lib/utils"; // Ensure cn is imported from utils

export default function ModelSidebar() {
  // State for managing inputs and selections
  const [newModelName, setNewModelName] = useState('');
  const [subject, setSubject] = useState('');
  const [tags, setTags] = useState(['Style']); // Initial tags
  const [showAdvanced, setShowAdvanced] = useState(false); // State for toggling advanced settings
  const [selectedModel, setSelectedModel] = useState(''); // State to manage selected model
  const [selectedPreset, setSelectedPreset] = useState(''); // State for managing selected preset
  const [newTag, setNewTag] = useState(''); // State for new tag input

  // Import necessary hooks
  const [dropdownVisible, setDropdownVisible] = useState(false); // State to toggle dropdown visibility
  const [dropdownSelection, setDropdownSelection] = useState(''); // State to store the selected dropdown item

  // Update the structure of dropdownItems to include categories and their options
  const dropdownItems = [
    { 
      category: 'Style', 
      options: ['Illustration', 'Line Art', '3D', 'Cartoon', 'Painting', 'Anime', 'Digital Art', 'Realism', 'Photography', 'Minimalism', 'Retro'] 
    },
    { 
      category: 'Subject', 
      options: ['Creature', 'Character Aesthetic', 'Character Base', 'Man', 'Woman', 'Boy', 'Girl', 'Nonbinary', 'Child', 'Old', 'Animal', 'Bird', 'Lizard', 'Alien', 'Monster', 'Fantasy Race', 'Clothing', 'Armor', 'Accessories', 'Object', 'Vehicle', 'Chibi'] 
    },
    'Asset Type', 
    'Theme', 
    'Texture'
  ];

  // Function to handle dropdown selection
  const handleDropdownSelect = (item: string) => {
    setDropdownSelection(item);
    setDropdownVisible(false); // Hide dropdown after selection
    handleAddTag(item); // Assuming you want to add the selected item as a tag
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  // Dummy model data - replace with actual data as needed
  const models = [
    { name: 'SDXL LoRA', apiRoute: '/api/model/sdxl-lora' },
    { name: 'SD 1.5 (legacy)', apiRoute: '/api/model/sd-1.5-legacy' },
    { name: 'Flux', apiRoute: '/api/model/flux' },
  ];

  // Dummy preset data - replace with actual data as needed
  const presets = ['Style', 'Subject']; // Example preset options

  // Function to handle model selection
  const handleModelSelect = (model: any) => {
    setSelectedModel(model);
    // Here you can also perform API calls or other actions based on the selected model
  };

  // Function to handle preset selection and manage it as a tag
  const handlePresetSelect = (preset: string) => {
    setSelectedPreset(preset);

    // Remove any existing preset from the tags list before adding the new one
    const updatedTags = tags.filter(tag => !presets.includes(tag));
    
    // Now add the selected preset to the tags list
    setTags([...updatedTags, preset]);
  };

  // Function to handle adding a new tag
  const handleAddTag = (tag: any) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  // Function to handle removing a tag and updating preset selection state if necessary
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));

    // If the removed tag matches the selected preset, clear the selectedPreset state
    if (selectedPreset === tagToRemove) {
      setSelectedPreset('');
    }
  };

  // Function to handle adding a new tag from input
  const handleAddNewTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag(''); // Clear the input after adding
    }
  };

  // Toggle advanced settings visibility
  const toggleAdvancedSettings = () => {
    setShowAdvanced(!showAdvanced);
  };

  return (
    <div className="w-1/4 bg-[#242424] p-6 rounded-lg space-y-6">
      {/* Input for New Model Name */}
      <Input 
        placeholder="New Model" 
        className="bg-[#1a1a1a] border-none" 
        value={newModelName}
        onChange={(e) => setNewModelName(e.target.value)}
      />
      <div className="w-full">
        <Label>Model Type</Label>
        <div className="flex mt-2 space-x-2 w-full">
          {models.map((model, index) => (
            <Button
              key={index}
              variant="outline"
              className={cn(
                "rounded-lg",
                selectedModel === model.name ? "bg-blue-500 border-blue-500 text-white" : "border-gray-300 text-black",
                "hover:bg-blue-600 hover:border-blue-600" // Example of adding hover styles
              )}
              onClick={() => handleModelSelect(model.name)}
            >
              {model.name}
            </Button>
          ))}
        </div>
      </div>
      <div>
        <Label>Preset</Label>
        <div className="flex mt-2 space-x-2">
          {presets.map((preset, index) => (
            <Button
              key={index}
              className={cn(
                "rounded-lg",
                selectedPreset === preset ? "bg-blue-500 border-blue-500 text-white" : "border-gray-300 text-black",
                "hover:bg-blue-600 hover:border-blue-600"
              )}
              onClick={() => handlePresetSelect(preset)}
              variant="outline"
            >
              {preset}
            </Button>
          ))}
        </div>
      </div>
      {/* Subject Input */}
      <Input 
        placeholder="Subject" 
        className="bg-[#1a1a1a] border-none" 
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
            {/* Dynamic Tags Section */}
            <div>
        <Label>Tags</Label>
        <div className="flex flex-wrap items-center gap-2 mt-2">
          {tags.map((tag, index) => (
            <div key={index} className="bg-blue-500 text-white px-2 py-1 text-sm flex items-center rounded-lg">
              {tag}
              <Button className="ml-2 text-xs text-white" onClick={() => handleRemoveTag(tag)}>&times;</Button>
            </div>
          ))}
        </div>
        <div className="flex flex-col mt-4">
          <div className="flex">
            <Input
              type="text"
              placeholder="Add a tag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              className="bg-[#1a1a1a] border-none text-white placeholder-gray-400 flex-grow"
            />
            <Button onClick={handleAddNewTag} className="bg-blue-500 text-white ml-2">Add</Button>
            <Button onClick={toggleDropdown} className="bg-gray-500 text-white ml-2">Tags</Button>
          </div>

          {/* Dropdown Menu */}
          {dropdownVisible && (
            <div className="relative w-full">
              <div className="absolute bg-white shadow-lg mt-2 rounded-lg w-full z-10 text-black">
                {dropdownItems.map((item, index) => {
                  if (typeof item === 'string') {
                    return (
                      <div
                        key={index}
                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                        onClick={() => handleDropdownSelect(item)}
                      >
                        {item}
                      </div>
                    );
                  } else { // Handle the case where the item has a nested structure
                    return (
                      <div key={index}>
                        <div className="px-4 py-2 font-bold">{item.category}</div>
                        {item.options.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className="px-6 py-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() => handleDropdownSelect(option)}
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Toggle Button for Advanced Settings */}
      <Button variant="outline" className="w-full justify-between text-black" onClick={toggleAdvancedSettings}>
        Custom (Advanced)
        <ChevronDown />
      </Button>
      {/* Conditional Rendering for Advanced Settings */}
      {showAdvanced && (
        <div className="mt-4 space-y-4">
          <div className="flex justify-between items-center">
            <Label>Automatic Training Steps</Label>
            <Switch />
          </div>
          <div>
            <div className="flex justify-between">
              <Label>Total Training Steps</Label>
              <span>350</span>
            </div>
            <Slider defaultValue={[350]} max={1000} step={1} className="mt-2" />
          </div>
          <div>
            <div className="flex justify-between">
              <Label>UNet Learning Rate</Label>
              <span>5e-5</span>
            </div>
            <Slider defaultValue={[5]} max={10} step={1} className="mt-2" />
          </div>
          <div>
            <div className="flex justify-between">
              <Label>Text Encoder Training Ratio</Label>
              <span>0.25</span>
            </div>
            <Slider defaultValue={[25]} max={100} step={1} className="mt-2" />
          </div>
          <div>
            <div className="flex justify-between">
              <Label>Text Encoder Learning Rate</Label>
              <span>1e-6</span>
            </div>
            <Slider defaultValue={[1]} max={10} step={1} className="mt-2" />
          </div>
        </div>
      )}
      <Button className="w-full bg-blue-600">Start Training</Button>
      <Button variant="outline" className="w-full text-black"   >
        Save As Draft
      </Button>
    </div>
  )
}