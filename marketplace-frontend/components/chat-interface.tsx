"use client"

import { useState } from "react"
import { 
  MessageCircle, 
  Search, 
  Plus, 
  Phone, 
  Video, 
  MoreHorizontal,
  Paperclip,
  Image as ImageIcon,
  Mic,
  Send,
  Star
} from "lucide-react"
import Image from "next/image"

interface Chat {
  id: string
  name: string
  lastMessage: string
  time: string
  unread: number
  online: boolean
  role: string
  rating?: number
  avatar: string
}

interface Message {
  id: string
  text: string
  time: string
  sent: boolean
  read: boolean
}

const mockChats: Chat[] = [
  {
    id: '1',
    name: 'Fresh Fruits Ghana',
    lastMessage: 'Your order is ready for pickup!',
    time: '2:30 PM',
    unread: 0,
    online: true,
    role: 'vendor',
    rating: 4.8,
    avatar: '/placeholder-user.jpg'
  },
  {
    id: '2',
    name: 'Customer Support',
    lastMessage: 'How can I help you today?',
    time: '1:45 PM',
    unread: 2,
    online: true,
    role: 'support',
    avatar: '/placeholder-user.jpg'
  },
  {
    id: '3',
    name: 'Organic Vegetables',
    lastMessage: 'We have fresh tomatoes available',
    time: '12:30 PM',
    unread: 0,
    online: false,
    role: 'vendor',
    rating: 4.6,
    avatar: '/placeholder-user.jpg'
  },
  {
    id: '4',
    name: 'Fish Market Accra',
    lastMessage: 'Fresh tilapia just arrived',
    time: '11:15 AM',
    unread: 1,
    online: true,
    role: 'vendor',
    rating: 4.7,
    avatar: '/placeholder-user.jpg'
  }
]

const mockMessages: Message[] = [
  {
    id: '1',
    text: 'Yes, we have fresh bananas available. They\'re GHS 8.00 per bunch.',
    time: '02:10 PM',
    sent: false,
    read: true
  },
  {
    id: '2',
    text: 'Great! Can I place an order for 3 bunches?',
    time: '02:15 PM',
    sent: true,
    read: true
  },
  {
    id: '3',
    text: 'I\'ll prepare 3 bunches for you. Total will be GHS 24.00.',
    time: '02:20 PM',
    sent: false,
    read: true
  },
  {
    id: '4',
    text: 'Your order is ready for pickup!',
    time: '02:30 PM',
    sent: false,
    read: true
  }
]

export default function ChatInterface() {
  const [selectedChat, setSelectedChat] = useState<Chat>(mockChats[0])
  const [searchQuery, setSearchQuery] = useState('')
  const [messageInput, setMessageInput] = useState('')

  const filteredChats = mockChats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Handle sending message
      console.log('Sending message:', messageInput)
      setMessageInput('')
    }
  }

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Left Panel - Chat List */}
      <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3 mb-2">
            <MessageCircle className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-semibold text-gray-900">Messages</h1>
          </div>
          <p className="text-sm text-gray-600">Chat with vendors and support</p>
        </div>

        {/* Search and New Chat */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3 mb-3">
            <h2 className="text-lg font-medium text-gray-900">Chats</h2>
            <button className="btn btn-primary btn-sm btn-icon">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input pl-10"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                selectedChat.id === chat.id ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Image
                    src={chat.avatar}
                    alt={chat.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full"
                  />
                  {chat.online && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {chat.name}
                    </h3>
                    <span className="text-xs text-gray-500">{chat.time}</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 truncate mb-1">
                    {chat.lastMessage}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{chat.role}</span>
                    <div className="flex items-center space-x-2">
                      {chat.rating && (
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-gray-600">{chat.rating}</span>
                        </div>
                      )}
                      {chat.unread > 0 && (
                        <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Chat Window */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Image
                  src={selectedChat.avatar}
                  alt={selectedChat.name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full"
                />
                {selectedChat.online && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-900">{selectedChat.name}</h2>
                <p className="text-sm text-gray-500">
                  {selectedChat.online ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="btn btn-ghost btn-icon">
                <Phone className="w-5 h-5" />
              </button>
              <button className="btn btn-ghost btn-icon">
                <Video className="w-5 h-5" />
              </button>
              <button className="btn btn-ghost btn-icon">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {mockMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sent ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sent
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-900 border border-gray-200'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className={`text-xs ${
                    message.sent ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.time}
                  </span>
                  {message.sent && (
                    <div className="flex items-center space-x-1">
                      <div className={`w-3 h-3 rounded-full ${
                        message.read ? 'bg-blue-300' : 'bg-blue-200'
                      }`}></div>
                      <div className={`w-3 h-3 rounded-full ${
                        message.read ? 'bg-blue-300' : 'bg-blue-200'
                      }`}></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <button className="btn btn-ghost btn-icon">
                <Paperclip className="w-5 h-5" />
              </button>
              <button className="btn btn-ghost btn-icon">
                <ImageIcon className="w-5 h-5" />
              </button>
              <button className="btn btn-ghost btn-icon">
                <Mic className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1">
              <input
                type="text"
                placeholder="Type your message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="form-input w-full"
              />
            </div>
            
            <button
              onClick={handleSendMessage}
              className="btn btn-primary btn-icon"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}