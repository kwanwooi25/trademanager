'use client';

import { GNB_HEIGHT, LNB_WIDTH } from '@/const/layout';
import { PATHS } from '@/const/paths';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Logo from '../Logo';
import Navigation from '../Navigation';
import UserMenu from './UserMenu';

export default function GlobalHeader() {
  const session = useSession();
  const isAuthorized = session.data?.user && session.data.user.companyId;

  return (
    <header
      className="py-2 px-4 fixed w-full top-0 z-10 shadow-sm backdrop-blur border-b border-border/70 flex justify-between items-center"
      style={{ height: GNB_HEIGHT }}
    >
      <div className="flex items-center">
        <Link href={PATHS.HOME} style={{ width: LNB_WIDTH }}>
          <Logo withText height={44} />
        </Link>
        {isAuthorized && <Navigation />}
      </div>
      <UserMenu className="z-aboveHeader" />
    </header>
  );
}
