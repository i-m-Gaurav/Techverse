import React, { useState } from 'react';
import { PlusCircle, Trash } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

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
  onAddInterest: (category: string, newItem: string) => void;
  onDeleteInterest: (category: string, item: string) => void;
}

const UserInterest: React.FC<UserInterestProps> = ({
  links = [],
  skills = [],
  youtubers = [],
  onAddInterest,
  onDeleteInterest
}) => {
  const [newItem, setNewItem] = useState<string>('');
  const [activeAddSection, setActiveAddSection] = useState<string | null>(null);

  const handleAddItem = (category: string) => {
    if (newItem.trim() !== '') {
      onAddInterest(category, newItem);
      setNewItem('');
      setActiveAddSection(null);
    }
  };

  const renderAddSection = (category: string) => (
    <div className="mb-4">
      {activeAddSection === category ? (
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder={`Add new ${category}`}
            className="bg-gray-900 ring-0 focus:ring-0 focus:outline-none"
          />
          <Button onClick={() => handleAddItem(category)} className="focus:ring-0 focus:outline-none">Add</Button>
        </div>
      ) : (
        <Button
          onClick={() => setActiveAddSection(category)}
          variant="outline"
          className="flex items-center rounded-full justify-center hover:bg-gray-700 hover:text-white bg-gray-800 focus:ring-0 focus:outline-none"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add {category}
        </Button>
      )}
    </div>
  );

  const renderItems = (items: string[], category: string) => (
    <ul className="space-y-1">
      {items.map((item, index) => (
        <li key={index} className="flex justify-between items-center text-white">
          {item}
          <Trash
            className="h-4 w-4 cursor-pointer hover:text-red-500"
            onClick={() => onDeleteInterest(category, item)}
          />
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: globalStyles }} />
      <div className='bg-gray-900 '>
        <Tabs defaultValue="links" className="w-full max-w-[400px]">
          <TabsList className='bg-gray-800 rounded-md p-1'>
            <TabsTrigger className='data-[state=active]:bg-gray-700 rounded-md focus:ring-0 focus:outline-none' value="links">Links</TabsTrigger>
            <TabsTrigger className='data-[state=active]:bg-gray-700 rounded-md focus:ring-0 focus:outline-none' value="skills">Skills</TabsTrigger>
            <TabsTrigger className='data-[state=active]:bg-gray-700 rounded-md focus:ring-0 focus:outline-none' value="youtubers">Youtubers</TabsTrigger>
          </TabsList>
          <TabsContent value="links" className=' p-4 rounded-md mt-2'>
            {renderAddSection('links')}
            <h3 className="text-lg font-semibold text-white mb-2">Links</h3>
            {renderItems(links, 'links')}
          </TabsContent>
          <TabsContent value="skills" className=' p-4 rounded-md mt-2'>
            {renderAddSection('skills')}
            <h3 className="text-lg font-semibold text-white mb-2">Skills</h3>
            {renderItems(skills, 'skills')}
          </TabsContent>
          <TabsContent value="youtubers" className=' p-4 rounded-md mt-2'>
            {renderAddSection('youtubers')}
            <h3 className="text-lg font-semibold text-white mb-2">Youtubers</h3>
            {renderItems(youtubers, 'youtubers')}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default UserInterest;
