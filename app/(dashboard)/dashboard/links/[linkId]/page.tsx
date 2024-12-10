import React from 'react'
import { LinkForm } from './components/link-form';
import { prisma } from '@/lib/prisma';

const LinkPage = async( props: { params: Promise<{ linkId: string }> }) => {

  const params = await props.params;

    let link;

  if (params.linkId !== 'new') {
    link = await prisma.link.findUnique({
      where: {
        id: params.linkId
      },
    });
  }


  return (
    <div className='flex flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <LinkForm
          initialData={link}
        />
      </div>
    </div>
  )
}

export default LinkPage;
