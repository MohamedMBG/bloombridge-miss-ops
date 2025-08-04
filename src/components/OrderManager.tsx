import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ShoppingCart,
  Search,
  Filter,
  Eye,
  MessageSquare,
  Download,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  Package,
} from "lucide-react";

const OrderManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const orders = [
    {
      id: "#ORD-001",
      customer: "Sarah Johnson",
      customerPhone: "+1234567890",
      items: ["Silver Hoop Earrings", "Pearl Necklace"],
      total: 179.98,
      status: "completed",
      paymentStatus: "paid",
      shippingStatus: "delivered",
      orderDate: "2024-01-15",
      deliveryDate: "2024-01-18",
    },
    {
      id: "#ORD-002", 
      customer: "Emily Davis",
      customerPhone: "+1234567891",
      items: ["Gold Chain Bracelet", "Diamond Stud Earrings"],
      total: 289.98,
      status: "processing",
      paymentStatus: "paid",
      shippingStatus: "preparing",
      orderDate: "2024-01-15",
      deliveryDate: "2024-01-19",
    },
    {
      id: "#ORD-003",
      customer: "Maria Garcia", 
      customerPhone: "+1234567892",
      items: ["Rose Gold Ring Set"],
      total: 69.99,
      status: "pending",
      paymentStatus: "pending",
      shippingStatus: "not_shipped",
      orderDate: "2024-01-14",
      deliveryDate: null,
    },
    {
      id: "#ORD-004",
      customer: "Jessica Wilson",
      customerPhone: "+1234567893", 
      items: ["Diamond Stud Earrings", "Silver Hoop Earrings"],
      total: 229.98,
      status: "shipped",
      paymentStatus: "paid",
      shippingStatus: "in_transit",
      orderDate: "2024-01-13",
      deliveryDate: "2024-01-17",
    },
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const configs = {
      pending: { className: "bg-warning text-warning-foreground", icon: Clock },
      processing: { className: "bg-blue-500 text-white", icon: Package },
      shipped: { className: "bg-blue-600 text-white", icon: Package },
      completed: { className: "bg-success text-success-foreground", icon: CheckCircle },
      cancelled: { className: "bg-destructive text-destructive-foreground", icon: AlertTriangle },
    };
    
    const config = configs[status as keyof typeof configs];
    const IconComponent = config?.icon || Clock;
    
    return (
      <Badge className={config?.className || "bg-secondary"}>
        <IconComponent size={12} className="mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const orderStats = [
    {
      title: "Total Orders",
      value: orders.length.toString(),
      icon: ShoppingCart,
    },
    {
      title: "Pending Orders",
      value: orders.filter(o => o.status === "pending").length.toString(),
      icon: Clock,
    },
    {
      title: "Completed Orders",
      value: orders.filter(o => o.status === "completed").length.toString(),
      icon: CheckCircle,
    },
    {
      title: "Total Revenue",
      value: `$${orders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}`,
      icon: DollarSign,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Order Management</h1>
          <p className="text-muted-foreground">Track and manage customer orders</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download size={16} className="mr-2" />
            Export Orders
          </Button>
          <Button variant="outline">
            <Calendar size={16} className="mr-2" />
            Date Range
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {orderStats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <stat.icon size={24} className="text-primary" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search orders by ID or customer name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <Filter size={16} className="mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Orders Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <div className="font-mono font-medium">{order.id}</div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.customer}</div>
                      <div className="text-sm text-muted-foreground">{order.customerPhone}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      {order.items.map((item, index) => (
                        <div key={index} className="text-sm">
                          {item}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">${order.total.toFixed(2)}</span>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(order.status)}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{order.orderDate}</div>
                    {order.deliveryDate && (
                      <div className="text-xs text-muted-foreground">
                        Delivery: {order.deliveryDate}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye size={14} />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-success">
                        <MessageSquare size={14} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderManager;