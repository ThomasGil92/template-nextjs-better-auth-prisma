"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { authClient } from "@/lib/auth-client";

interface NavLinksProps {
  links: {
    name: string;
    href: string;
    mustBeAuth?: boolean;
  }[];
}

export default function NavLinks({ links }: NavLinksProps) {
  const pathname = usePathname();
  const session = authClient.useSession();

  return (
    <NavigationMenuList className='flex justify-start'>
      {links.map((link) => {
        return (link.mustBeAuth && session.data) || (!link.mustBeAuth && session.data)||(!link.mustBeAuth && !session.data) ? (
          <NavigationMenuItem key={link.name}>
            <Link passHref href={link.href}>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} ${
                  pathname === link.href
                    ? "bg-accent text-accent-foreground"
                    : ""
                }`}
              >
                {link.name}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ) : null;
      })}
    </NavigationMenuList>
  );
}
