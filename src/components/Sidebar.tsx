import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  MessageSquare,
  Settings,
  Tag,
  BarChart3,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "inventory", label: "Inventory", icon: Package },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "customers", label: "Customers", icon: Users },
    { id: "promotions", label: "Promotions", icon: Tag },
    { id: "whatsapp", label: "WhatsApp", icon: MessageSquare },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div
      className={cn(
        "flex h-screen flex-col border-r border-border bg-card transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center border-b border-border px-4">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">M</span>
            </div>
            <span className="font-bold text-lg">MISS Accessories</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn("ml-auto", isCollapsed && "ml-0")}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? "default" : "ghost"}
            className={cn(
              "w-full justify-start gap-3 h-10",
              isCollapsed && "justify-center px-2"
            )}
            onClick={() => onTabChange(item.id)}
          >
            <item.icon size={20} />
            {!isCollapsed && <span>{item.label}</span>}
          </Button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;