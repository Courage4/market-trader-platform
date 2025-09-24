"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { MessageCircle, Send, Search, Filter, Users, Clock, Mail, Reply, Check, X, AlertCircle } from "lucide-react"

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
      type: "inquiry"
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
      type: "delivery"
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
      type: "feedback"
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
      type: "bulk"
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
      type: "quality"
    },
    {
      id: 6,
      buyer: "David Osei",
      buyerEmail: "david@example.com",
      subject: "Partnership Inquiry",
      message: "Hi! I run a restaurant chain and would like to discuss a long-term supply partnership with your farm.",
      time: "4 days ago",
      date: "2024-01-16",
      unread: false,
      productId: 4,
      productName: "Sweet Red Apples",
      type: "partnership"
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

  const handleMarkAsRead = (messageId: number) => {
    toast({
      title: "Message marked as read",
      description: "Message has been marked as read",
    })
  }

  const getMessageTypeIcon = (type: string) => {
    switch (type) {
      case 'inquiry': return <MessageCircle className="h-4 w-4" />
      case 'delivery': return <Send className="h-4 w-4" />
      case 'feedback': return <Check className="h-4 w-4" />
      case 'bulk': return <Users className="h-4 w-4" />
      case 'quality': return <AlertCircle className="h-4 w-4" />
      case 'partnership': return <Users className="h-4 w-4" />
      default: return <MessageCircle className="h-4 w-4" />
    }
  }

  const getMessageTypeColor = (type: string) => {
    switch (type) {
      case 'inquiry': return 'bg-blue-100 text-blue-700'
      case 'delivery': return 'bg-green-100 text-green-700'
      case 'feedback': return 'bg-emerald-100 text-emerald-700'
      case 'bulk': return 'bg-orange-100 text-orange-700'
      case 'quality': return 'bg-purple-100 text-purple-700'
      case 'partnership': return 'bg-cyan-100 text-cyan-700'
      default: return 'bg-gray-100 text-gray-700'
    }
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
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="flex items-center gap-3 mb-4">
            <MessageCircle className="h-8 w-8 text-orange-500" />
            <div>
              <h1 className="text-4xl font-bold text-gradient">Message Center</h1>
              <p className="text-lg text-gray-600 mt-2">
                Manage conversations with your customers
                {unreadCount > 0 && (
                  <Badge className="badge-secondary ml-3">
                    {unreadCount} unread
                  </Badge>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-orange-500" />
                <Input
                  placeholder="Search messages, customers, subjects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-14 bg-orange-50/50 border-orange-200 rounded-xl text-gray-800 placeholder:text-gray-500 focus:border-orange-500 focus:ring-orange-500/20 transition-all duration-300"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Button className="h-14 px-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>
        </div>

        {/* Messages List */}
        {filteredMessages.length === 0 ? (
          <Card className="card">
            <CardContent className="py-16 text-center">
              <MessageCircle className="h-16 w-16 mx-auto text-gray-300 mb-6" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">No messages found</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                {searchTerm ? "Try adjusting your search terms" : "You don't have any messages yet"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredMessages.map((message) => (
              <Card
                key={message.id}
                className={`card-interactive ${message.unread ? "border-orange-200 bg-orange-50/30" : ""}`}
              >
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-gray-900">{message.buyer}</h3>
                          {message.unread && (
                            <Badge className="badge-secondary">
                              New
                            </Badge>
                          )}
                          <Badge className={`badge-outline ${getMessageTypeColor(message.type)}`}>
                            {getMessageTypeIcon(message.type)}
                            <span className="ml-1 capitalize">{message.type}</span>
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          {message.buyerEmail}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <Clock className="h-4 w-4" />
                        {message.time}
                      </div>
                      <Badge className="badge-outline">
                        {message.productName}
                      </Badge>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">{message.subject}</h4>
                    <p className="text-gray-700 leading-relaxed">{message.message}</p>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      onClick={() => handleReplyToMessage(message)}
                      className="btn btn-primary flex items-center gap-2"
                    >
                      <Reply className="h-4 w-4" />
                      Reply
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleMarkAsRead(message.id)}
                      className="btn btn-outline flex items-center gap-2"
                    >
                      <Check className="h-4 w-4" />
                      Mark as Read
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Reply Dialog */}
        <Dialog open={isReplyDialogOpen} onOpenChange={setIsReplyDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3 text-xl">
                <Reply className="h-6 w-6 text-orange-500" />
                Reply to {selectedMessage?.buyer}
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Re: {selectedMessage?.subject}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Original Message */}
              <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <MessageCircle className="h-4 w-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Original Message</p>
                    <p className="text-xs text-gray-600">From {selectedMessage?.buyer}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 italic">"{selectedMessage?.message}"</p>
              </div>

              {/* Reply Form */}
              <div className="space-y-4">
                <div>
                  <label className="form-label mb-2 block">Your Reply</label>
                  <Textarea
                    placeholder="Type your reply here..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    rows={6}
                    className="form-textarea"
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="gap-3">
              <Button 
                variant="outline" 
                onClick={() => setIsReplyDialogOpen(false)}
                className="btn btn-outline"
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button 
                onClick={handleSendReply} 
                className="btn btn-primary flex items-center gap-2"
              >
                <Send className="h-4 w-4" />
                Send Reply
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
