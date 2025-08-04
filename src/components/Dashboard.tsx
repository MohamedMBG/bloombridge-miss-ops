import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
} from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Revenue",
      value: "$12,847",
      change: "+12.5%",
      icon: DollarSign,
      trend: "up",
    },
    {
      title: "Total Orders",
      value: "147",
      change: "+8.2%",
      icon: ShoppingCart,
      trend: "up",
    },
    {
      title: "Active Customers",
      value: "89",
      change: "+5.1%",
      icon: Users,
      trend: "up",
    },
    {
      title: "Products in Stock",
      value: "234",
      change: "-2.4%",
      icon: Package,
      trend: "down",
    },
  ];

  const recentOrders = [
    {
      id: "#ORD-001",
      customer: "Sarah Johnson",
      amount: "$89.99",
      status: "completed",
      date: "2024-01-15",
    },
    {
      id: "#ORD-002",
      customer: "Emily Davis",
      amount: "$156.50",
      status: "processing",
      date: "2024-01-15",
    },
    {
      id: "#ORD-003",
      customer: "Maria Garcia",
      amount: "$78.25",
      status: "pending",
      date: "2024-01-14",
    },
  ];

  const lowStockItems = [
    { name: "Silver Hoop Earrings", stock: 3, threshold: 10 },
    { name: "Gold Chain Bracelet", stock: 1, threshold: 5 },
    { name: "Rose Gold Ring Set", stock: 2, threshold: 8 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your business overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${
                stat.trend === "up" ? "text-success" : "text-destructive"
              }`}>
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart size={20} />
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{order.id}</div>
                    <div className="text-sm text-muted-foreground">{order.customer}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{order.amount}</div>
                    <Badge
                      variant={
                        order.status === "completed"
                          ? "default"
                          : order.status === "processing"
                          ? "secondary"
                          : "outline"
                      }
                      className={
                        order.status === "completed"
                          ? "bg-success text-success-foreground"
                          : order.status === "processing"
                          ? "bg-warning text-warning-foreground"
                          : ""
                      }
                    >
                      {order.status === "completed" && <CheckCircle size={12} className="mr-1" />}
                      {order.status === "processing" && <Clock size={12} className="mr-1" />}
                      {order.status === "pending" && <AlertTriangle size={12} className="mr-1" />}
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle size={20} className="text-warning" />
              Low Stock Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockItems.map((item) => (
                <div key={item.name} className="flex items-center justify-between p-3 border rounded-lg border-warning/20 bg-warning/5">
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Only {item.stock} left (threshold: {item.threshold})
                    </div>
                  </div>
                  <Badge variant="outline" className="border-warning text-warning">
                    Low Stock
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;