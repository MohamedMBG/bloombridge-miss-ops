import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";
import InventoryManager from "@/components/InventoryManager";
import OrderManager from "@/components/OrderManager";
import CustomerManager from "@/components/CustomerManager";
import WhatsAppManager from "@/components/WhatsAppManager";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "inventory":
        return <InventoryManager />;
      case "orders":
        return <OrderManager />;
      case "customers":
        return <CustomerManager />;
      case "whatsapp":
        return <WhatsAppManager />;
      case "promotions":
        return <div className="p-6"><h1 className="text-2xl font-bold">Promotions (Coming Soon)</h1></div>;
      case "analytics":
        return <div className="p-6"><h1 className="text-2xl font-bold">Analytics (Coming Soon)</h1></div>;
      case "settings":
        return <div className="p-6"><h1 className="text-2xl font-bold">Settings (Coming Soon)</h1></div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
