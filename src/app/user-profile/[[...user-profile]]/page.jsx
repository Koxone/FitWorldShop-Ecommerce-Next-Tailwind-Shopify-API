// app/user-profile/[[...user-profile]]/page.jsx
'use client';

import { UserProfile, SignOutButton } from '@clerk/nextjs';

export default function UserProfilePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white">
      {/* Tu UserProfile embebido */}
      <div className="relative">
        <UserProfile
          routing="path"
          path="/user-profile"
          appearance={{
            elements: {
              card: 'bg-neutral-900 relative text-white border border-neutral-700 shadow-lg',
            },
          }}
        />
        {/* Botón de Cerrar sesión */}
        <div className="absolute bottom-4 left-1/2 mt-6 flex translate-x-[-50%] justify-center md:bottom-5 md:left-28">
          <SignOutButton>
            <button className="cursor-pointer rounded bg-blue-600 px-4 py-3 text-white transition-all duration-400 ease-in-out hover:bg-red-700 md:py-3.5">
              Cerrar sesión
            </button>
          </SignOutButton>
        </div>
      </div>
    </main>
  );
}
