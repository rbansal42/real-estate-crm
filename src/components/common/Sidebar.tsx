import { Link } from "@nextui-org/react";
import { HomeIcon, BuildingOfficeIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { ROUTES } from "@/constants/app.constants";

export default function Sidebar() {
  const menuItems = [
    { icon: HomeIcon, label: "Dashboard", href: ROUTES.DASHBOARD },
    { icon: BuildingOfficeIcon, label: "Properties", href: ROUTES.PROPERTIES },
    { icon: UserGroupIcon, label: "Leads", href: ROUTES.LEADS },
  ];

  return (
    <div className="w-64 bg-background border-r border-divider h-screen">
      <div className="flex flex-col gap-2 p-4">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-2 p-3 rounded-lg hover:bg-primary-500/20 text-foreground-600"
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
} 