"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/hooks/use-toast"
import {
  MessageCircle,
  Send,
  Paperclip,
  Phone,
  Video,
  MoreVertical,
  Search,
  Plus,
  Star,
  Check,
  CheckCheck,
  Smile,
  Camera,
  Mic,
} from "lucide-react"

export default function BuyerChatPage() {
  const [selectedChat, setSelectedChat] = useState<number | null>(1)
  const [message, setMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const chats = [
    {
      id: 1,
      name: "Fresh Fruits Ghana",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Your order is ready for pickup!",
      lastMessageTime: "2024-01-22 14:30",
      unreadCount: 2,
      isOnline: true,
      type: "vendor",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Customer Support",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "How can I help you today?",
      lastMessageTime: "2024-01-22 10:15",
      unreadCount: 0,
      isOnline: true,
      type: "support",
      rating: 4.9,
    },
    {
      id: 3,
      name: "Green Valley Farm",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Thank you for your order!",
      lastMessageTime: "2024-01-21 16:20",
      unreadCount: 0,
      isOnline: false,
      type: "vendor",
      rating: 4.6,
    },
    {
      id: 4,
      name: "Tropical Delights",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "We have fresh pineapples available",
      lastMessageTime: "2024-01-21 09:45",
      unreadCount: 1,
      isOnline: true,
      type: "vendor",
      rating: 4.7,
    },
  ]

  const messages = {
    1: [
      {
        id: 1,
        sender: "vendor",
        content: "Hello! Thank you for your interest in our products.",
        timestamp: "2024-01-22 14:00",
        status: "read",
      },
      {
        id: 2,
        sender: "user",
        content: "Hi! I'd like to know about the availability of fresh bananas.",
        timestamp: "2024-01-22 14:05",
        status: "read",
      },
      {
        id: 3,
        sender: "vendor",
        content: "Yes, we have fresh bananas available. They're GHS 8.00 per bunch.",
        timestamp: "2024-01-22 14:10",
        status: "read",
      },
      {
        id: 4,
        sender: "user",
        content: "Great! Can I place an order for 3 bunches?",
        timestamp: "2024-01-22 14:15",
        status: "read",
      },
      {
        id: 5,
        sender: "vendor",
        content: "I'll prepare 3 bunches for you. Total will be GHS 24.00.",
        timestamp: "2024-01-22 14:20",
        status: "read",
      },
      {
        id: 6,
        sender: "vendor",
        content: "Your order is ready for pickup!",
        timestamp: "2024-01-22 14:30",
        status: "delivered",
      },
    ],
    2: [
      {
        id: 1,
        sender: "support",
        content: "Hello! I'm here to help you with any questions or issues you might have.",
        timestamp: "2024-01-22 10:15",
        status: "read",
      },
    ],
    3: [
      {
        id: 1,
        sender: "vendor",
        content: "Thank you for your order! We'll have it ready soon.",
        timestamp: "2024-01-21 16:20",
        status: "read",
      },
    ],
    4: [
      {
        id: 1,
        sender: "vendor",
        content: "We have fresh pineapples available at a special price today!",
        timestamp: "2024-01-21 09:45",
        status: "delivered",
      },
    ],
  }

  const filteredChats = chats.filter((chat) => chat.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const selectedChatData = chats.find((chat) => chat.id === selectedChat)
  const chatMessages = selectedChat ? messages[selectedChat as keyof typeof messages] || [] : []

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatMessages])

  const sendMessage = () => {
    if (!message.trim() || !selectedChat) return

    // Here you would typically send the message to your backend
    toast({
      title: "Message Sent",
      description: "Your message has been delivered.",
    })

    setMessage("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const getMessageStatus = (status: string) => {
    switch (status) {
      case "sent":
        return <Check className="w-4 h-4 text-gray-400" />
      case "delivered":
        return <CheckCheck className="w-4 h-4 text-gray-400" />
      case "read":
        return <CheckCheck className="w-4 h-4 text-blue-500" />
      default:
        return null
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl h-[calc(100vh-8rem)]">
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-2">
          <MessageCircle className="w-8 h-8 text-purple-600" />
          <h1 className="text-3xl font-bold">Messages</h1>
        </div>
        <p className="text-gray-600">Chat with vendors and support</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
        {/* Chat List */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Chats</CardTitle>
                <Button size="sm" variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search chats..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100vh-20rem)]">
                <div className="space-y-1 p-4">
                  {filteredChats.map((chat) => (
                    <div
                      key={chat.id}
                      className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedChat === chat.id ? "bg-purple-50 border border-purple-200" : "hover:bg-gray-50"
                      }`}
                      onClick={() => setSelectedChat(chat.id)}
                    >
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={chat.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {chat.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-sm truncate">{chat.name}</h3>
                          <span className="text-xs text-gray-500">{formatTime(chat.lastMessageTime)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-600 truncate flex-1">{chat.lastMessage}</p>
                          {chat.unreadCount > 0 && (
                            <Badge className="bg-purple-600 text-white text-xs ml-2">{chat.unreadCount}</Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {chat.type}
                          </Badge>
                          {chat.type === "vendor" && (
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 text-yellow-500 fill-current" />
                              <span className="text-xs text-gray-500">{chat.rating}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Chat Window */}
        <div className="lg:col-span-3">
          {selectedChat && selectedChatData ? (
            <Card className="h-full flex flex-col">
              {/* Chat Header */}
              <CardHeader className="pb-4 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={selectedChatData.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{selectedChatData.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {selectedChatData.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{selectedChatData.name}</h3>
                      <p className="text-sm text-gray-600">{selectedChatData.isOnline ? "Online" : "Offline"}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Video className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 p-0">
                <ScrollArea className="h-[calc(100vh-24rem)] p-4">
                  <div className="space-y-4">
                    {chatMessages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            msg.sender === "user" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          <p className="text-sm">{msg.content}</p>
                          <div
                            className={`flex items-center justify-end space-x-1 mt-1 ${
                              msg.sender === "user" ? "text-purple-200" : "text-gray-500"
                            }`}
                          >
                            <span className="text-xs">{formatTime(msg.timestamp)}</span>
                            {msg.sender === "user" && getMessageStatus(msg.status)}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </CardContent>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex items-end space-x-2">
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Camera className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Mic className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex-1">
                    <Textarea
                      placeholder="Type your message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="min-h-[2.5rem] max-h-32 resize-none"
                      rows={1}
                    />
                  </div>

                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm">
                      <Smile className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={sendMessage}
                      disabled={!message.trim()}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <CardContent className="text-center">
                <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Select a chat</h3>
                <p className="text-gray-600">Choose a conversation to start messaging</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
