'use client';

import ProtectedHeader from '@/app/personal-components/ProtectedHeader';
// import UserMenu from '@/app/personal-components/UserMenu';
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
        <ProtectedHeader 
          image={session.user?.image || ''} 
          name={session.user?.name || ''}
          email={session.user?.email || ''}
        />
        <div className="grid grid-flow-col auto-cols-max">
          <div className='bg-red-600'>01</div>
          <div className='bg-blue-900'>02</div>
          <div className='bg-green-400'>03</div>
        </div>

      </div>
    );
  }

  return null; // The page will redirect to sign-in if unauthenticated
};

export default ProtectedPage;
