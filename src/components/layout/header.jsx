import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { NavLink } from "react-router";
import { useAuth } from "@clerk/clerk-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

const routes = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
  },
  {
    name: "Account",
    dropdown: [
      {
        path: "/auth",
        name: "Sign In",
      },
      {
        path: "/account-details",
        name: "Details",
      },
      {
        name: "Log Out",
      },
    ],
  },
];

const Header = () => {
  const { isLoaded, isSignedIn, signOut } = useAuth();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {routes.slice(0, -1).map((route) => (
          <NavigationMenuItem key={route.path}>
            <NavLink
              to={route.path}
              className={({ isActive }) =>
                isActive ? "text-red-500" : "text-black"
              }
            >
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {route.name}
              </NavigationMenuLink>
            </NavLink>
          </NavigationMenuItem>
        ))}
        <NavigationMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <NavigationMenuLink className={`cursor-pointer ${navigationMenuTriggerStyle()}`}>
                {routes[routes.length - 1].name}
              </NavigationMenuLink>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={"w-56"}>
              {!isLoaded ? (
                <DropdownMenuItem>
                  <span className="animate-pulse">Loading...</span>
                </DropdownMenuItem>
              ) : isSignedIn ? (
                <>
                  <DropdownMenuItem>
                    <Button variant="ghost" asChild>
                      <NavLink to={routes[routes.length - 1].dropdown[1].path}>
                        {routes[routes.length - 1].dropdown[1].name}
                      </NavLink>
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Button variant="ghost" onClick={signOut}>
                      {routes[routes.length - 1].dropdown[2].name}
                    </Button>
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem>
                  <NavLink to={routes[routes.length - 1].dropdown[0].path}>
                    {routes[routes.length - 1].dropdown[0].name}
                  </NavLink>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Header;
