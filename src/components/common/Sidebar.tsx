import { Link } from "@nextui-org/react";
import { 
  HomeIcon, 
  BuildingOfficeIcon, 
  UserGroupIcon,
  BuildingLibraryIcon,
  UsersIcon,
  ClipboardDocumentListIcon,
  TableCellsIcon,
  Squares2X2Icon,
  ChevronDownIcon
} from "@heroicons/react/24/outline";
import { ROUTES } from "@/constants/app.constants";
import { useState } from "react";

export default function Sidebar() {
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const toggleMenu = (key: string) => {
    setExpandedMenus(prev => 
      prev.includes(key) 
        ? prev.filter(item => item !== key)
        : [...prev, key]
    );
  };

  const menuItems = [
    { 
      icon: HomeIcon, 
      label: "Dashboard", 
      href: ROUTES.DASHBOARD 
    },
    {
      icon: BuildingOfficeIcon,
      label: "Properties",
      key: "properties",
      submenu: [
        { 
          label: "All Properties",
          href: ROUTES.PROPERTIES,
          viewOptions: [
            { icon: TableCellsIcon, label: "Table View", href: `${ROUTES.PROPERTIES}?view=table` },
            { icon: Squares2X2Icon, label: "Card View", href: `${ROUTES.PROPERTIES}?view=card` }
          ]
        },
        { 
          label: "Societies",
          href: `${ROUTES.PROPERTIES}/societies`
        }
      ]
    },
    { 
      icon: UsersIcon, 
      label: "Partners", 
      href: ROUTES.PARTNERS 
    },
    { 
      icon: ClipboardDocumentListIcon, 
      label: "Listings", 
      href: ROUTES.LISTINGS 
    },
    { 
      icon: UserGroupIcon, 
      label: "Leads", 
      href: ROUTES.LEADS 
    }
  ];

  return (
    <div className="w-64 bg-background border-r border-divider h-screen overflow-y-auto">
      <div className="flex flex-col gap-2 p-4">
        {menuItems.map((item) => (
          <div key={item.href || item.key}>
            {item.submenu ? (
              <div className="space-y-2">
                <button
                  onClick={() => toggleMenu(item.key)}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-primary-500/20 text-foreground-600"
                >
                  <div className="flex items-center gap-2">
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </div>
                  <ChevronDownIcon 
                    className={`w-4 h-4 transition-transform ${
                      expandedMenus.includes(item.key) ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedMenus.includes(item.key) && (
                  <div className="ml-5 space-y-1 border-l border-divider pl-4">
                    {item.submenu.map((subItem) => (
                      <div key={subItem.href}>
                        <Link
                          href={subItem.href}
                          className="flex items-center gap-2 p-2 rounded-lg hover:bg-primary-500/20 text-foreground-600"
                        >
                          {subItem.label}
                        </Link>
                        {subItem.viewOptions && (
                          <div className="ml-4 space-y-1">
                            {subItem.viewOptions.map((viewOption) => (
                              <Link
                                key={viewOption.href}
                                href={viewOption.href}
                                className="flex items-center gap-2 p-2 text-sm rounded-lg hover:bg-primary-500/20 text-foreground-600"
                              >
                                <viewOption.icon className="w-4 h-4" />
                                {viewOption.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                href={item.href}
                className="flex items-center gap-2 p-3 rounded-lg hover:bg-primary-500/20 text-foreground-600"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 