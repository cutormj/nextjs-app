import { getUserByUsername } from "@/actions/index";
import React from 'react';
import PublicProfileHeader from "../personal-components/PublicProfileHeader";
import PageNotFound from "../personal-components/PageNotFound";

async function page({ params }: { params: { id: string } }) {
  const user = await getUserByUsername(params.id);
  console.log("HERE IS THE USER!!", user);

  // Ensure default values for undefined properties 
  const userImage = user?.image || '/default-image.png'; 
  const username = user?.username || 'Unknown User';
  
  if (!user) {
    // Render the PageNotFound component if user is not found
    return <PageNotFound />;
  }

  // Render the PublicProfileHeader component if user is found
  return (
    <PublicProfileHeader  username={username } image={userImage} />
  );
}

export default page;
