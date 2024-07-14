import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface LinkPreviewProps {
  url: string;
}

interface Metadata {
  title: string;
  description: string;
  image: string;
}

const LinkPreview: React.FC<LinkPreviewProps> = ({ url }) => {
  const [metadata, setMetadata] = useState<Metadata | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const response = await fetch(`/api/fetch-metadata/?url=${encodeURIComponent(url)}`);
        const data = await response.json();
        setMetadata(data);
      } catch (error) {
        console.error('Error fetching metadata:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetadata();
  }, [url]);

 

  if (!metadata) {
    return <div className="text-[#CCCCCC]"></div>;
  }

  return (
    <div className="flex flex-col border border-[#36363d] rounded-md overflow-hidden bg-[#0a0a0a] mt-2">
      {metadata.image && (
        <div className="relative h-32 w-full">
          <Image src={metadata.image} alt={metadata.title} layout="fill" objectFit="cover" />
        </div>
      )}
      <div className="p-2">
        <h3 className="text-sm font-semibold text-white">{metadata.title}</h3>
        <p className="text-xs text-[#CCCCCC] mt-1">{metadata.description}</p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:underline mt-1 block">
          {url}
        </a>
      </div>
    </div>
  );



};

export default LinkPreview;