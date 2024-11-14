import { useSession } from 'next-auth/react';
import { RouterLinks } from '@/models/enums';
import Image from 'next/image';
import React from 'react';
import { Link } from '@/i18n/routing';

export function HeaderAuthActions() {
  const session = useSession();

  return session?.data?.user ?
    <Link className="ml-2" href={RouterLinks.EDITOR}>
      <Image src="/icons/edit.svg" width={35} height={35} alt="Edit"/>
    </Link> : <></>;
}
