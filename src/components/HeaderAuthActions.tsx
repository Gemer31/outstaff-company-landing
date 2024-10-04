import { useSession } from 'next-auth/react';
import { Button } from '@/UI/Button';
import { RouterLinks } from '@/models/enums';
import Image from 'next/image';
import React from 'react';

export function HeaderAuthActions() {
  const session = useSession();

  return session?.data?.user ? <Button
    className="mr-2 p-1"
    loading={false}
    href={RouterLinks.EDITOR}
  >
    <Image src="/icons/edit.svg" width={30} height={30} alt="Edit"/>
  </Button> : <></>;
}
