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
  Package,
  Search,
  Plus,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";

const InventoryManager = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const products = [
    {
      id: "PRD-001",
      name: "Silver Hoop Earrings",
      sku: "SHE-001",
      category: "Earrings",
      price: 29.99,
      stock: 3,
      threshold: 10,
      status: "low_stock",
      lastUpdated: "2024-01-15",
    },
    {
      id: "PRD-002",
      name: "Gold Chain Bracelet",
      sku: "GCB-002",
      category: "Bracelets",
      price: 89.99,
      stock: 1,
      threshold: 5,
      status: "critical",
      lastUpdated: "2024-01-14",
    },
    {
      id: "PRD-003",
      name: "Diamond Stud Earrings",
      sku: "DSE-003",
      category: "Earrings",
      price: 199.99,
      stock: 15,
      threshold: 8,
      status: "in_stock",
      lastUpdated: "2024-01-15",
    },
    {
      id: "PRD-004",
      name: "Pearl Necklace",
      sku: "PN-004",
      category: "Necklaces",
      price: 149.99,
      stock: 8,
      threshold: 6,
      status: "in_stock",
      lastUpdated: "2024-01-13",
    },
    {
      id: "PRD-005",
      name: "Rose Gold Ring Set",
      sku: "RGRS-005",
      category: "Rings",
      price: 69.99,
      stock: 2,
      threshold: 8,
      status: "low_stock",
      lastUpdated: "2024-01-15",
    },
  ];

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string, stock: number) => {
    if (status === "critical") {
      return (
        <Badge className="bg-destructive text-destructive-foreground">
          <AlertTriangle size={12} className="mr-1" />
          Critical
        </Badge>
      );
    }
    if (status === "low_stock") {
      return (
        <Badge className="bg-warning text-warning-foreground">
          <AlertTriangle size={12} className="mr-1" />
          Low Stock
        </Badge>
      );
    }
    return (
      <Badge className="bg-success text-success-foreground">
        In Stock ({stock})
      </Badge>
    );
  };

  const inventoryStats = [
    {
      title: "Total Products",
      value: products.length.toString(),
      icon: Package,
      color: "primary",
    },
    {
      title: "Low Stock Items",
      value: products.filter(p => p.status === "low_stock").length.toString(),
      icon: AlertTriangle,
      color: "warning",
    },
    {
      title: "Critical Stock",
      value: products.filter(p => p.status === "critical").length.toString(),
      icon: AlertTriangle,
      color: "destructive",
    },
    {
      title: "Total Value",
      value: `$${products.reduce((sum, p) => sum + (p.price * p.stock), 0).toFixed(2)}`,
      icon: DollarSign,
      color: "success",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Inventory Management</h1>
          <p className="text-muted-foreground">Track and manage your product inventory</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus size={16} className="mr-2" />
          Add Product
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {inventoryStats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <stat.icon 
                  size={24} 
                  className={`text-${stat.color}`}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Product Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search products by name or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Products Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-muted-foreground">{product.id}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>
                    <span className={product.stock <= product.threshold ? "text-warning font-medium" : ""}>
                      {product.stock}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      /{product.threshold} min
                    </span>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(product.status, product.stock)}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye size={14} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit size={14} />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 size={14} />
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

export default InventoryManager;