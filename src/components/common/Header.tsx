"use client";

import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import { 
  UserCircleIcon, 
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon 
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { ROUTES } from "@/constants/app.constants";

export default function Header() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push(ROUTES.AUTH.LOGIN);
  };

  return (
    <Navbar
      className="bg-background/70 backdrop-blur-md"
      classNames={{
        wrapper: "px-4",
      }}
    >
      <NavbarContent justify="end">
        <NavbarItem>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button
                variant="light"
                isIconOnly
                className="rounded-full"
              >
                <Avatar
                  icon={<UserCircleIcon className="w-6 h-6" />}
                  classNames={{
                    base: "bg-primary/20",
                    icon: "text-primary",
                  }}
                />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile actions">
              <DropdownItem
                key="profile"
                startContent={<UserCircleIcon className="w-5 h-5" />}
              >
                {user?.email}
              </DropdownItem>
              <DropdownItem
                key="settings"
                startContent={<Cog6ToothIcon className="w-5 h-5" />}
                onPress={() => router.push(ROUTES.SETTINGS)}
              >
                Settings
              </DropdownItem>
              <DropdownItem
                key="logout"
                className="text-danger"
                color="danger"
                startContent={<ArrowRightOnRectangleIcon className="w-5 h-5" />}
                onPress={handleLogout}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
} 