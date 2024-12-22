import { Navbar, NavbarBrand, NavbarContent, Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { useAuthStore } from "@/store/useAuthStore";
import { ROUTES } from "@/constants/app.constants";
import { useRouter } from "next/navigation";

export default function Header() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push(ROUTES.AUTH.LOGIN);
  };

  return (
    <Navbar className="border-b border-divider bg-background">
      <NavbarBrand>
        <p className="font-bold text-inherit">PropDekho CRM</p>
      </NavbarBrand>

      <NavbarContent justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              color="secondary"
              as="button"
              className="transition-transform"
              src={`https://ui-avatars.com/api/?name=${user?.name}&background=8b5cf6&color=fff`}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{user?.email}</p>
            </DropdownItem>
            <DropdownItem key="settings">Settings</DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={handleLogout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
} 