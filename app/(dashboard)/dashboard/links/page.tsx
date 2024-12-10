import React from 'react';
import { LinkClient } from './components/client';
import { LinkColumn } from './components/columns';
import { format } from 'date-fns';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

const LinkPage = async () => {

  const session = await auth();

  const user = await prisma.user.findFirst({
    where: {
      id: session?.user.id
    }
  });

  const links = await prisma.link.findMany({
    where:{
      userId:user?.id,
    },
    include: {
      clicks: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedLinks:LinkColumn[] = links?.map((link) => ({
    id: link.id,
    userId: link.userId,
    title: link.title,
    platform: link.platform,
    url: link.url,
    order: link.order,
    isVisible: link.isVisible,
    createdAt: format(link.createdAt, 'MMMM do,yyyy'),
    clicks:link.clicks.length,
  }))


  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <LinkClient data={formattedLinks} />
      </div>
    </div>
  )
}

export default LinkPage;
