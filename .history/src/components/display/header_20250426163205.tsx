'use client';

import { UserButton, useUser } from '@clerk/nextjs';

export default function Header() {
  const { user, isLoaded } = useUser();

  return (
    <header className="w-full h-16  flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold">GhoonaCamp</h1>
      </div>
      <div className="flex items-center gap-4">
        {isLoaded && user && (
          <div className="flex items-center gap-2">
            <span className="text-sm">
              {user.firstName} {user.lastName}
            </span>
            <UserButton afterSignOutUrl="/" />
          </div>
        )}
      </div>
    </header>
  );
}
