import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  MessageSquare,
  Send,
  Users,
  Clock,
  CheckCheck,
  Phone,
  Settings,
  Plus,
  Zap,
} from "lucide-react";

const WhatsAppManager = () => {
  const chatStats = [
    {
      title: "Active Chats",
      value: "23",
      icon: MessageSquare,
      change: "+5 today",
    },
    {
      title: "Response Rate",
      value: "98%",
      icon: CheckCheck,
      change: "+2% this week",
    },
    {
      title: "Avg Response Time",
      value: "2.3 min",
      icon: Clock,
      change: "-0.5 min",
    },
    {
      title: "Orders via WhatsApp",
      value: "89",
      icon: Phone,
      change: "+12 this month",
    },
  ];

  const recentChats = [
    {
      id: 1,
      customer: "Sarah Johnson",
      lastMessage: "Hi! I'm interested in the silver hoop earrings. Are they still available?",
      time: "2 min ago",
      status: "unread",
      phone: "+1234567890",
    },
    {
      id: 2,
      customer: "Emily Davis",
      lastMessage: "Thank you! The order arrived and I love it! 😍",
      time: "15 min ago",
      status: "read",
      phone: "+1234567891",
    },
    {
      id: 3,
      customer: "Maria Garcia",
      lastMessage: "Can I get a discount if I order 3 pieces?",
      time: "1 hour ago",
      status: "replied",
      phone: "+1234567892",
    },
    {
      id: 4,
      customer: "New Customer",
      lastMessage: "Hello! I saw your accessories on Instagram. Do you have gold bracelets?",
      time: "2 hours ago",
      status: "unread",
      phone: "+1234567893",
    },
  ];

  const automationTemplates = [
    {
      name: "Order Confirmation",
      trigger: "Order Placed",
      message: "Hi {customer_name}! Thank you for your order #{order_id}. We'll prepare it with love and send tracking details soon! 💎",
    },
    {
      name: "Shipping Update",
      trigger: "Order Shipped",
      message: "Great news {customer_name}! Your order #{order_id} is on its way! Track: {tracking_url} 📦✨",
    },
    {
      name: "Welcome Message",
      trigger: "New Customer",
      message: "Welcome to MISS Accessories! 👋 We're excited to help you find the perfect jewelry. Browse our collection or ask us anything! 💎",
    },
  ];

  const getStatusBadge = (status: string) => {
    const configs = {
      unread: { className: "bg-destructive text-destructive-foreground", label: "New" },
      read: { className: "bg-muted text-muted-foreground", label: "Read" },
      replied: { className: "bg-success text-success-foreground", label: "Replied" },
    };
    
    const config = configs[status as keyof typeof configs];
    return (
      <Badge className={config?.className || "bg-secondary"}>
        {config?.label || status}
      </Badge>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">WhatsApp Management</h1>
          <p className="text-muted-foreground">Engage customers and automate communications</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings size={16} className="mr-2" />
            WhatsApp Settings
          </Button>
          <Button className="bg-success text-success-foreground hover:bg-success/90">
            <Plus size={16} className="mr-2" />
            New Template
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {chatStats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-success">{stat.change}</p>
                </div>
                <stat.icon size={24} className="text-success" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Chats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare size={20} />
              Recent Conversations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentChats.map((chat) => (
                <div key={chat.id} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <div className="h-10 w-10 rounded-full bg-success text-success-foreground flex items-center justify-center text-sm font-medium">
                    {chat.customer.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{chat.customer}</div>
                      <div className="text-xs text-muted-foreground">{chat.time}</div>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1 truncate">
                      {chat.lastMessage}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="text-xs text-muted-foreground">{chat.phone}</div>
                      {getStatusBadge(chat.status)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Message */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send size={20} />
              Quick Message
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Customer Phone</label>
              <Input placeholder="+1234567890" />
            </div>
            <div>
              <label className="text-sm font-medium">Message</label>
              <Textarea 
                placeholder="Type your message here..."
                rows={4}
              />
            </div>
            <Button className="w-full bg-success text-success-foreground hover:bg-success/90">
              <Send size={16} className="mr-2" />
              Send Message
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Automation Templates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap size={20} />
            Automation Templates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {automationTemplates.map((template, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{template.name}</h4>
                  <Badge variant="outline">{template.trigger}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{template.message}</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    Test
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Widget Setup */}
      <Card>
        <CardHeader>
          <CardTitle>"Chat with Us" Widget</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Embed this widget on your website to allow customers to start WhatsApp conversations directly.
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <code className="text-sm">
                {`<script src="https://widget.missaccessories.com/whatsapp.js"></script>
<div id="whatsapp-widget" data-phone="+1234567890" data-message="Hi! I'm interested in your accessories."></div>`}
              </code>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Copy Code</Button>
              <Button variant="outline">Preview Widget</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhatsAppManager;