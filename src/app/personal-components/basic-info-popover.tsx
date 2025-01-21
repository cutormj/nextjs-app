import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"

import { useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { doLogout } from '@/actions';
import { Button } from '@/components/ui/button';

// Define the Props interface 
interface BasicInfoPopoverProps { 
    image: string; 
    name: string;
    email: string;
}

const BasicInfoPopover: React.FC<BasicInfoPopoverProps> = ({image, name, email}) => {

    const { data: session } = useSession();

    if(session){
        return (
            <Popover>
                <PopoverTrigger>
                <Avatar>
                  <AvatarImage src={image} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                </PopoverTrigger>
                <PopoverContent>
                    {name} - {email}
                    <form action={doLogout}>
                        {/* <button
                            className="bg-blue-700 text-white p-4 rounded-md text-md"
                            type="submit"
                            
                        >
                            
                        </button> */}
                        <Button>Logout</Button>
                    </form>
                </PopoverContent>
            </Popover>
        
          );
    }
    return null;
};

export default BasicInfoPopover;
