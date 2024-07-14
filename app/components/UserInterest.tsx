import React, { useState } from 'react';
import { PlusCircle, Trash } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import LinkPreview from './LinkPreview';

const globalStyles = `
  <style>
    * {
      outline: none !important;
    }
    *:focus {
      outline: none !important;
      box-shadow: none !important;
    }
    *:focus-visible {
      outline: 2px solid transparent !important;
      outline-offset: 2px !important;
    }
  </style>
`;

interface UserInterestProps {
  links?: string[];
  skills?: string[];
  youtubers?: string[];
  onAddInterest?: (category: string, newItem: string) => void;
  onDeleteInterest?: (category: string, item: string) => void;
  isEditable: boolean;
}

const UserInterest: React.FC<UserInterestProps> = ({
  links = [],
  skills = [],
  youtubers = [],
  onAddInterest,
  onDeleteInterest,
  isEditable
}) => {
  const [newItem, setNewItem] = useState<string>('');
  const [activeAddSection, setActiveAddSection] = useState<string | null>(null);

  const handleAddItem = (category: string) => {
    if (newItem.trim() !== '' && onAddInterest) {
      onAddInterest(category, newItem);
      setNewItem('');
      setActiveAddSection(null);
    }
  };

  const renderAddSection = (category: string) => (
    isEditable && (
      <div className="mb-4">
        {activeAddSection === category ? (
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder={`Add new ${category}`}
              className="bg-[#0a0a0a] rounded-full border border-[#36363d] ring-0 focus:ring-0 focus:outline-none"
            />
            <Button onClick={() => handleAddItem(category)} className="focus:ring-0 border border-[#36363d] rounded hover:bg-[#cccccc] hover:text-black focus:outline-none">Add</Button>
          </div>
        ) : (
          <Button
            onClick={() => setActiveAddSection(category)}
            variant="outline"
            className="flex items-center rounded-full justify-center hover:bg-[#cccccc] border border-[#36363d] hover:text-black  bg-[#0a0a0a] focus:ring-0 focus:outline-none"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add {category}
          </Button>
        )}
      </div>
    )
  );

  const renderItems = (items: string[], category: string) => (
    <div className="space-y-4">
      {items.slice().reverse().map((item, index) => (
        <div key={index} className="flex flex-col">
          <div className="flex justify-end items-center bg-red text-white">
            {category === 'links' || category === 'youtubers' ? (
              <a
                href={item}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline hidden text-xs "
              >
                {item}
              </a>
            ) : (
              item
            )}
            {isEditable && onDeleteInterest && (
              <Trash
                className="h-4 w-4 ml-10 cursor-pointer hover:text-red-500"
                onClick={() => onDeleteInterest(category, item)}
              />
            )}
          </div>
          {(category === 'links' || category === 'youtubers') && <LinkPreview url={item} />}
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: globalStyles }} />
      <div className='bg-[#000000] border border-[#36363d] rounded '>
        <Tabs defaultValue="links" className="w-full max-w-[600px]">
          <TabsList className='bg-[#0a0a0a] border border-[#36363d] rounded p-1'>
            <TabsTrigger className='data-[state=active]:bg-white data-[state=active]:text-black rounded focus:ring-0 focus:outline-none' value="links">Links</TabsTrigger>
            <TabsTrigger className='data-[state=active]:bg-white data-[state=active]:text-black rounded focus:ring-0 focus:outline-none' value="skills">Skills</TabsTrigger>
            <TabsTrigger className='data-[state=active]:bg-white data-[state=active]:text-black rounded focus:ring-0 focus:outline-none' value="youtubers">Youtubers</TabsTrigger>
          </TabsList>
          <TabsContent value="links" className='p-4 rounded-md mt-2'>
            {renderAddSection('links')}
            {links.length === 0 && <p className="text-[#CCCCCC]">Nothing here...</p>}
            {renderItems(links, 'links')}
          </TabsContent>
          <TabsContent value="skills" className='p-4 rounded-md mt-2'>
            {renderAddSection('skills')}
            {skills.length === 0 && <p className="text-[#CCCCCC]">Nothing here...</p>}
            {renderItems(skills, 'skills')}
          </TabsContent>
          <TabsContent value="youtubers" className='p-4 rounded-md mt-2'>
            {renderAddSection('youtubers')}
            {youtubers.length === 0 && <p className="text-[#CCCCCC]">Nothing here...</p>}
            {renderItems(youtubers, 'youtubers')}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default UserInterest;
