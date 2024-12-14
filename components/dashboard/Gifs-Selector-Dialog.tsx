'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Grid } from '@giphy/react-components';
import { Input } from '@/components/ui/input';
import { IGif } from '@giphy/js-types';
import { GiphyFetch } from '@giphy/js-fetch-api';
import Image from 'next/image';
import { HiMiniGif } from "react-icons/hi2";
import { Trash } from 'lucide-react';

const gf = new GiphyFetch('FuiPB7i9s1QFDPQpGUOmwp4MepFvTTmV');

const GifsSelector = ({ value, setValue }: { value?: string, setValue: (value?: string) => void }) => {

  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchGifs = (offset: number) =>
    searchTerm
      ? gf.search(searchTerm, { offset, limit: 10 }) // Search based on user input
      : gf.trending({ offset, limit: 10 }); // Default to trending

  const handleGifClick = (gif: IGif, e: React.SyntheticEvent<HTMLElement, Event>) => {
    e.preventDefault();
    console.log(gif.images.fixed_height.url)
    setValue(gif.images.fixed_height.url);
    setIsDialogOpen(!isDialogOpen)
  };

  return (
    <div className="">
      <div className='space-y-2'>
        {value && (
          <div className='relative w-[180px] h-[180px] rounded-md overflow-hidden space-y-2'>
            <div className='z-10 absolute top-1 right-1'>
              <Button size={'icon'} variant={'destructive'} onClick={() => setValue('')} >
                <Trash className='w-4 h-4' />
              </Button>
            </div>
            <Image src={value} alt="Selected GIF" width={40} height={40} loading={"eager"} className="w-40 h-40 mb-2 rounded-sm" />
          </div>
        )}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button type="button" variant={'secondary'} >
              <HiMiniGif size={400} className='mr-1 w-7 h-7' />Select GIF
            </Button>
          </DialogTrigger>
          <DialogContent className='max-w-md h-[80vh] overflow-y-auto p-4'>
            <DialogHeader>
              <DialogTitle>Select a GIF</DialogTitle>
            </DialogHeader>
            <div className='flex flex-col justify-center items-center gap-y-5 '>
              <Input placeholder='Search Gif' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              <Grid width={390} columns={3} gutter={6} fetchGifs={fetchGifs} onGifClick={handleGifClick} key={searchTerm} />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default GifsSelector;
