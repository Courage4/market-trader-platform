"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { MessageCircle, Send, Search, Filter, Users, Clock } from "lucide-react"

export default function VendorMessages() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMessage, setSelectedMessage] = useState<any>(null)
  const [replyText, setReplyText] = useState("")
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false)
  const { toast } = useToast()

  const messages = [
    {
      id: 1,
      buyer: "Sarah Johnson",
      buyerEmail: "sarah@example.com",
      subject: "Tomato Availability",
      message: "Hi, are your fresh tomatoes still available? I need about 5kg for my restaurant.",
      time: "2 hours ago",
      date: "2024-01-20",
      unread: true,
      productId: 1,
      productName: "Fresh Tomatoes",
    },
    {
      id: 2,
      buyer: "Mike Chen",
      buyerEmail: "mike@example.com",
      subject: "Delivery Inquiry",
      message: "Can you deliver to the downtown area? I'm interested in your organic vegetables.",
      time: "5 hours ago",
      date: "2024-01-20",
      unread: false,
      productId: 2,
      productName: "Organic Carrots",
    },
    {
      id: 3,
      buyer: "Emma Davis",
      buyerEmail: "emma@example.com",
      subject: "Thank You",
      message: "Thank you for the fresh vegetables! They were perfect for our family dinner. Will order again soon.",
      time: "1 day ago",
      date: "2024-01-19",
      unread: false,
      productId: 3,
      productName: "Green Lettuce",
    },
    {
      id: 4,
      buyer: "John Smith",
      buyerEmail: "john@example.com",
      subject: "Bulk Order",
      message: "I'm interested in placing a bulk order for my grocery store. Can we discuss pricing?",
      time: "2 days ago",
      date: "2024-01-18",
      unread: false,
      productId: 1,
      productName: "Fresh Tomatoes",
    },
    {
      id: 5,
      buyer: "Lisa Wong",
      buyerEmail: "lisa@example.com",
      subject: "Product Quality",
      message: "Your products look great! Do you have organic certification for your vegetables?",
      time: "3 days ago",
      date: "2024-01-17",
      unread: false,
      productId: 2,
      productName: "Organic Carrots",
    },
  ]

  const filteredMessages = messages.filter(
    (message) =>
      message.buyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const unreadCount = messages.filter((m) => m.unread).length

  const handleReplyToMessage = (message: any) => {
    setSelectedMessage(message)
    setIsReplyDialogOpen(true)
  }

  const handleSendReply = async () => {
    if (!replyText.trim()) {
      toast({
        title: "Error",
        description: "Please enter a reply message",
        variant: "destructive",
      })
      return
    }

    try {
      // Mock API call - replace with actual implementation
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Reply Sent",
        description: `Your reply has been sent to ${selectedMessage.buyer}`,
      })

      setIsReplyDialogOpen(false)
      setReplyText("")
      setSelectedMessage(null)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send reply. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <MessageCircle className="h-8 w-8 text-primary" />
              Message Center
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage conversations with your customers
              {unreadCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {unreadCount} unread
                </Badge>
              )}
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Messages List */}
        <div className="space-y-4">
          {filteredMessages.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No messages found</h3>
                <p className="text-muted-foreground">
                  {searchTerm ? "Try adjusting your search terms" : "You don't have any messages yet"}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredMessages.map((message) => (
              <Card
                key={message.id}
                className={`cursor-pointer transition-all hover:shadow-md ${message.unread ? "border-primary/50 bg-primary/5" : ""}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{message.buyer}</h3>
                          {message.unread && (
                            <Badge variant="default" className="text-xs">
                              New
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{message.buyerEmail}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                        <Clock className="h-3 w-3" />
                        {message.time}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {message.productName}
                      </Badge>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium mb-2">{message.subject}</h4>
                    <p className="text-muted-foreground">{message.message}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleReplyToMessage(message)}>
                      <Send className="mr-2 h-3 w-3" />
                      Reply
                    </Button>
                    <Button size="sm" variant="outline">
                      Mark as Read
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Reply Dialog */}
        <Dialog open={isReplyDialogOpen} onOpenChange={setIsReplyDialogOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Reply to {selectedMessage?.buyer}</DialogTitle>
              <DialogDescription>Re: {selectedMessage?.subject}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium mb-1">Original Message:</p>
                <p className="text-sm text-muted-foreground">"{selectedMessage?.message}"</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Your Reply</label>
                <Textarea
                  placeholder="Type your reply here..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  rows={4}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSendReply} className="flex-1">
                  <Send className="mr-2 h-4 w-4" />
                  Send Reply
                </Button>
                <Button variant="outline" onClick={() => setIsReplyDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
