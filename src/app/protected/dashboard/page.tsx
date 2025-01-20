'use client';

import { doLogout } from '@/actions';
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
        <h1>Protected Page</h1>
        <p>Welcome, {session.user?.name}!</p>
        <p>Email: {session.user?.email}</p>
        <p><img src={session.user?.image || ''} alt="Profile" /></p>

        <form action={doLogout}>
                    <button
                        className="bg-blue-700 text-white p-4 rounded-md text-md"
                        type="submit"
                        
                    >
                        Logout
                    </button>
                </form>
      </div>
    );
  }

  return null; // The page will redirect to sign-in if unauthenticated
};

export default ProtectedPage;
