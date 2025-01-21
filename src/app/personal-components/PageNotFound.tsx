import React from 'react';
import Link from 'next/link';

const PageNotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-8">Page Not Found</p>
      <Link href="/">
          Go back to Home
      </Link>
    </div>
  );
};

export default PageNotFound;
