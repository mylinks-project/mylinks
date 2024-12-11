import React from 'react';
import { ClickClient } from './components/client';
import { ClickColumn } from './components/columns';
import { format } from 'date-fns';
import { prisma } from '@/lib/prisma';

const ClickPage = async (props: { params: Promise<{ linkId: string }> }) => {
  const params = await props.params;

  const clicks = await prisma.click.findMany({
    where: {
      linkId: params.linkId
    },
    include: {
      profileVisit: true
    },
  });

  const formattedClicks: ClickColumn[] = clicks?.map((click) => ({
    id: click.id,
    linkId: click.linkId,
    userId: click.userId,
    visitId: click.visitId || null,
    ipAddress: click.profileVisit.ipAddress,
    country: click.profileVisit.country,
    city: click.profileVisit.city,
    postalCode: click.profileVisit.postalCode,
    device: click.profileVisit.device,
    browser: click.profileVisit.browser,
    referer: click.profileVisit.referer,
    clickedAt: format(click.clickedAt, 'HH:mm MMMM do,yyyy'),
  }))


  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <ClickClient data={formattedClicks} />
      </div>
    </div>
  )
}

export default ClickPage;
