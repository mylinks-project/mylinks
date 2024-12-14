import React from 'react';
import { ProfileClient } from './components/client';
import { format } from 'date-fns';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { ProfileVisitColumn } from '@/types/types';

const ProfileAnalyticsPage = async () => {

  const session = await auth();
  const userId = session?.user.id;

  const profileVisits = await prisma.profileVisit.findMany({
    where: {
      userId,
    },
    include: {
      clicks: true
    },
    orderBy: {
      visitAt: 'desc'
    }
  });

  const formattedClicks: ProfileVisitColumn[] = profileVisits?.map((visit) => ({
    id: visit.id,
    userId: visit.userId,
    visitorId: visit.visitorId || null,
    clicks: visit.clicks.length,
    ipAddress: visit.ipAddress,
    country: visit.country,
    city: visit.city,
    postalCode: visit.postalCode,
    device: visit.device,
    browser: visit.browser,
    referer: visit.referer,
    visitAt: format(visit.visitAt, 'HH:mm MMMM do,yyyy'),
  }))


  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <ProfileClient data={formattedClicks} />
      </div>
    </div>
  )
}

export default ProfileAnalyticsPage;
