import { useSession } from 'next-auth/react';
import { RouterLinks } from '@/models/enums';
import Image from 'next/image';
import React from 'react';
import { Link } from '@/i18n/routing';

export function HeaderAuthActions() {
  const session = useSession();
  // const pathname = usePathname();
  // const router = useRouter();
  // useEffect(() => {
  //   if (pathname === RouterLinks.EDITOR && !session?.data?.user) {
  //     router.push(RouterLinks.HOME);
  //   }
  // }, [pathname]);

  return session?.data?.user ?
    <Link className="ml-2" href={RouterLinks.EDITOR}>
      <Image src="/icons/edit.svg" width={35} height={35} alt="Edit"/>
    </Link> : <></>;
}
