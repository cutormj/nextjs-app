'use client';

import UserMenu from '@/app/personal-components/UserMenu';
import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';


const ProtectedPage: React.FC = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn(); // Redirect to sign-in page if unauthenticated
    }
  }, [status]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (session) {
    return (
      <div>

        <UserMenu 
          image={session.user?.image || ''} 
          name={session.user?.name || ''}
          email={session.user?.email || ''}
        />

      </div>
    );
  }

  return null; // The page will redirect to sign-in if unauthenticated
};

export default ProtectedPage;
