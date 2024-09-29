'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from 'react';
import { cn } from "@/lib/utils";

interface ModelSidebarProps {
  onStartTraining: () => void;
  userId?: string;
  isTraining: boolean;
  imageCount: number; // Add this prop
}

export default function ModelSidebar({ onStartTraining, userId, isTraining, imageCount }: ModelSidebarProps) {
  const [newModelName, setNewModelName] = useState('');
  const [subject, setSubject] = useState('');
  const [tags, setTags] = useState(['Style']);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedPreset, setSelectedPreset] = useState('');
  const [newTag, setNewTag] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownSelection, setDropdownSelection] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  const handleDropdownSelect = (item: string) => {
    setDropdownSelection(item);
    setDropdownVisible(false);
    handleAddTag(item);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const models = [
    // { name: 'SDXL LoRA', apiRoute: '/api/model/sdxl-lora' },
    // { name: 'SD 1.5 (legacy)', apiRoute: '/api/model/sd-1.5-legacy' },
    { name: 'Flux', apiRoute: '/api/model/flux' },
  ];

  const presets = ['Style', 'Subject'];

  const handleModelSelect = (model: any) => {
    setSelectedModel(model);
  };

  const handlePresetSelect = (preset: string) => {
    setSelectedPreset(preset);
    const updatedTags = tags.filter(tag => !presets.includes(tag));
    setTags([...updatedTags, preset]);
  };

  const handleAddTag = (tag: any) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
    if (selectedPreset === tagToRemove) {
      setSelectedPreset('');
    }
  };

  const handleAddNewTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const toggleAdvancedSettings = () => {
    setShowAdvanced(!showAdvanced);
  };

  const [iterMultiplier, setIterMultiplier] = useState(1);
  const [isStyle, setIsStyle] = useState(false);

  const isTrainingDisabled = isTraining || imageCount < 4;

  return (
    <div className={cn(
      "bg-[#242424] p-4 rounded-lg transition-all duration-300 ease-in-out",
      "lg:w-1/4 lg:static lg:translate-x-0",
      isSidebarOpen ? "fixed inset-y-0 left-0 w-3/4 z-50 overflow-y-auto" : "fixed -left-full w-3/4"
    )}>
      <Button 
        className="lg:hidden absolute -right-12 top-4 bg-[#242424]"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
      </Button>

      <div className="space-y-4">
        <Input 
          placeholder="New Model" 
          className="bg-[#1a1a1a] border-none" 
          value={newModelName}
          onChange={(e) => setNewModelName(e.target.value)}
        />

        <div>
          <Label className="mb-2 block">Model Type</Label>
          <div className="flex flex-wrap gap-2">
            {models.map((model, index) => (
              <Button
                key={index}
                variant="outline"
                className={cn(
                  "flex-grow",
                  selectedModel === model.name ? "bg-blue-500 border-blue-500 text-white" : "border-gray-300 text-black",
                  "hover:bg-blue-600 hover:border-blue-600"
                )}
                onClick={() => handleModelSelect(model.name)}
              >
                {model.name}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label className="mb-2 block">Preset</Label>
          <div className="flex flex-wrap gap-2">
            {presets.map((preset, index) => (
              <Button
                key={index}
                className={cn(
                  "flex-grow",
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

        <Input 
          placeholder="Subject" 
          className="bg-[#1a1a1a] border-none" 
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <div>
          <Label className="mb-2 block">Tags</Label>
          <div className="flex flex-wrap gap-2">
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
                    } else {
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

        <Button 
          variant="outline" 
          className="w-full justify-between text-black"
          onClick={toggleAdvancedSettings}
        >
          Custom (Advanced)
          {showAdvanced ? <ChevronUp /> : <ChevronDown />}
        </Button>

        {showAdvanced && (
          <div className="space-y-4">
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
            <div>
              <div className="flex justify-between">
                <Label>Iter Multiplier</Label>
                <span>{iterMultiplier}</span>
              </div>
              <Slider 
                value={[iterMultiplier]} 
                onValueChange={(value) => setIterMultiplier(value[0])} 
                min={1} 
                max={10} 
                step={1} 
                className="mt-2" 
              />
            </div>
            <div className="flex justify-between items-center">
              <Label>Is Style</Label>
              <Switch 
                checked={isStyle}
                onCheckedChange={setIsStyle}
              />
            </div>
          </div>
        )}

        <Button 
          onClick={onStartTraining} 
          className="bg-blue-500 text-white w-full"
          disabled={isTrainingDisabled}
        >
          {isTraining ? 'Training in Progress' : (imageCount < 4 ? `Add ${4 - imageCount} more image${4 - imageCount === 1 ? '' : 's'}` : 'Start Training')}
        </Button>
        <Button variant="outline" className="w-full text-black">
          Save As Draft
        </Button>
      </div>
    </div>
  )
}