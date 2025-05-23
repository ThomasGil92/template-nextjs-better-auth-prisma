import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavigationMenuItem, NavigationMenuList } from "../ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import SignoutButton from "./SignoutButton";
import { NavigationMenu } from "../ui/navigation-menu";
import NavLinks from "./NavLinks";

export default async function Navbar() {
  const session = await auth.api.getSession({
    headers: await headers(), // some endpoint might require headers
  });

  const links = [{ name: "Accueil", href: "/", mustBeAuth:false },{ name: "Dashboard", href: "/dashboard", mustBeAuth:true }];

  return (
    <NavigationMenu className='w-full flex justify-between items-center py-3 px-48'>
      <NavLinks links={links} />

      <NavigationMenuList>
        <NavigationMenuItem>
          {session && session.session ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className='size-10'>
                  <AvatarImage
                    src='https://github.com/shadcn.png'
                    alt='@shadcn'
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-56'>
                <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem>
                  <SignoutButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href='/signin'>Se connecter</Link>
          )}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
