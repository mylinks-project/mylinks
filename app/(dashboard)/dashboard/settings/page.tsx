import React from 'react'
import { SettingsForm } from './components/settings-form';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { format } from 'date-fns';

const SettingsPage = async () => {

  const session = await auth();

  const user = await prisma.user.findFirst({
    where: {
      id: session?.user.id
    }
  });

  if (!user) {
    redirect('/login');
  }

  const formattedUsers = {
    id: user.id,
    name: user.name ?? "",
    username: user.username ?? "",
    email: user.email ?? "",
    image: user?.image ?? undefined,
    emailVerified: user?.emailVerified ? format(user.emailVerified, 'MMMM do,yyyy') : undefined,
    createdAt: user?.createdAt ? format(user.createdAt, 'MMMM do,yyyy') : undefined,
    isOAuth: session?.user.isOAuth ?? false,
  };

  return (
    <div className='flex flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <SettingsForm initialData={formattedUsers} />
      </div>
    </div>
  )
}

export default SettingsPage;
