import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  Search,
  MessageSquare,
  Phone,
  Mail,
  ShoppingBag,
  Star,
  TrendingUp,
  UserPlus,
  Eye,
  Edit,
} from "lucide-react";

const CustomerManager = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const customers = [
    {
      id: "CUST-001",
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+1234567890",
      whatsapp: "+1234567890",
      totalOrders: 8,
      totalSpent: 1247.92,
      lastOrder: "2024-01-15",
      status: "vip",
      joinDate: "2023-08-15",
      avgOrderValue: 155.99,
    },
    {
      id: "CUST-002",
      name: "Emily Davis",
      email: "emily.davis@email.com",
      phone: "+1234567891",
      whatsapp: "+1234567891",
      totalOrders: 5,
      totalSpent: 689.95,
      lastOrder: "2024-01-15",
      status: "regular",
      joinDate: "2023-11-22",
      avgOrderValue: 137.99,
    },
    {
      id: "CUST-003",
      name: "Maria Garcia",
      email: "maria.g@email.com",
      phone: "+1234567892",
      whatsapp: "+1234567892",
      totalOrders: 2,
      totalSpent: 149.98,
      lastOrder: "2024-01-14",
      status: "new",
      joinDate: "2024-01-10",
      avgOrderValue: 74.99,
    },
    {
      id: "CUST-004",
      name: "Jessica Wilson",
      email: "jessica.w@email.com",
      phone: "+1234567893",
      whatsapp: "+1234567893",
      totalOrders: 12,
      totalSpent: 1856.88,
      lastOrder: "2024-01-13",
      status: "vip",
      joinDate: "2023-06-10",
      avgOrderValue: 154.74,
    },
    {
      id: "CUST-005",
      name: "Amanda Brown",
      email: "amanda.b@email.com",
      phone: "+1234567894",
      whatsapp: "+1234567894",
      totalOrders: 1,
      totalSpent: 89.99,
      lastOrder: "2024-01-12",
      status: "new",
      joinDate: "2024-01-12",
      avgOrderValue: 89.99,
    },
  ];

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  const getStatusBadge = (status: string) => {
    const configs = {
      vip: { className: "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white", label: "VIP" },
      regular: { className: "bg-primary text-primary-foreground", label: "Regular" },
      new: { className: "bg-success text-success-foreground", label: "New" },
    };
    
    const config = configs[status as keyof typeof configs];
    return (
      <Badge className={config?.className || "bg-secondary"}>
        {status === "vip" && <Star size={12} className="mr-1" />}
        {config?.label || status}
      </Badge>
    );
  };

  const customerStats = [
    {
      title: "Total Customers",
      value: customers.length.toString(),
      icon: Users,
    },
    {
      title: "VIP Customers",
      value: customers.filter(c => c.status === "vip").length.toString(),
      icon: Star,
    },
    {
      title: "New This Month",
      value: customers.filter(c => c.status === "new").length.toString(),
      icon: UserPlus,
    },
    {
      title: "Avg Order Value",
      value: `$${(customers.reduce((sum, c) => sum + c.avgOrderValue, 0) / customers.length).toFixed(2)}`,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Customer Management</h1>
          <p className="text-muted-foreground">Manage customer relationships and profiles</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <UserPlus size={16} className="mr-2" />
          Add Customer
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {customerStats.map((stat) => (
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

      {/* Customer Database */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Database</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search customers by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Customers Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Order</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {customer.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-muted-foreground">{customer.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail size={12} />
                        {customer.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone size={12} />
                        {customer.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{customer.totalOrders}</div>
                      <div className="text-sm text-muted-foreground">
                        Avg: ${customer.avgOrderValue.toFixed(2)}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">${customer.totalSpent.toFixed(2)}</span>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(customer.status)}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{customer.lastOrder}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye size={14} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit size={14} />
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

export default CustomerManager;