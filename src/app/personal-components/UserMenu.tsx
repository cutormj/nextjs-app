import { doLogout } from '@/actions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Button } from '@/components/ui/button';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
  import {
    Card,
    CardTitle,
    CardDescription
  } from "@/components/ui/card"
  
  

interface UserMenuProps {
  image: string;
  name: string;
  email: string
}

const UserMenu: React.FC<UserMenuProps> = ({ image, name, email }) => {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <Avatar>
                <AvatarImage src={image} />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>
                
                <Card className='border-0'>
                    <CardTitle className='text-md'>{name}</CardTitle>
                    <CardDescription className='text-sm'>{email}</CardDescription>
                </Card>

            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={doLogout} className='cursor-pointer text-red-600 focus:text-white focus:bg-red-500'>
                Logout
                {/* <form action={doLogout}>
                    <Button>Logout</Button>
                </form>
                <Button onClick={doLogout}></Button> */}
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>

    // <DropdownMenu.Root>
    //   <DropdownMenu.Trigger className="bg-blue-500 text-white px-4 py-2 rounded">
    //     
    //   </DropdownMenu.Trigger>
    //   <DropdownMenu.Content className="bg-white shadow-lg rounded p-2">
    //     <DropdownMenu.Item className="p-2 hover:bg-gray-100">
    //       {name}
    //     </DropdownMenu.Item>
    //     <DropdownMenu.Item className="p-2 hover:bg-gray-100">
    //       {email}
    //     </DropdownMenu.Item>
    //     <DropdownMenu.Item className="p-2 hover:bg-gray-100">
    //         <form action={doLogout}>
    //             <Button>Logout</Button>
    //         </form>
    //     </DropdownMenu.Item>
    //   </DropdownMenu.Content>
    // </DropdownMenu.Root>
  );
};

export default UserMenu;
