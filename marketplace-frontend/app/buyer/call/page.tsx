"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import {
  Phone,
  PhoneCall,
  PhoneOff,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Video,
  VideoOff,
  MessageCircle,
  Clock,
  Star,
  Search,
  Filter,
  Plus,
  History,
  User,
  Store,
} from "lucide-react"

export default function BuyerCallPage() {
  const [isInCall, setIsInCall] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isSpeakerOn, setIsSpeakerOn] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterBy, setFilterBy] = useState("all")
  const { toast } = useToast()

  const [currentCall, setCurrentCall] = useState<any>(null)

  // Mock call duration timer
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isInCall) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isInCall])

  const contacts = [
    {
      id: 1,
      name: "Fresh Fruits Ghana",
      type: "vendor",
      phone: "+233 24 123 4567",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.8,
      isOnline: true,
      lastCall: "2024-01-22",
      callCount: 5,
      description: "Premium quality fruits and vegetables",
    },
    {
      id: 2,
      name: "Green Valley Farm",
      type: "vendor",
      phone: "+233 26 789 0123",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.6,
      isOnline: false,
      lastCall: "2024-01-20",
      callCount: 3,
      description: "Organic produce specialists",
    },
    {
      id: 3,
      name: "Customer Support",
      type: "support",
      phone: "+233 30 555 0100",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.9,
      isOnline: true,
      lastCall: "2024-01-18",
      callCount: 2,
      description: "24/7 customer assistance",
    },
    {
      id: 4,
      name: "Tropical Delights",
      type: "vendor",
      phone: "+233 27 456 7890",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.7,
      isOnline: true,
      lastCall: "2024-01-15",
      callCount: 8,
      description: "Exotic fruits and tropical produce",
    },
  ]

  const recentCalls = [
    {
      id: 1,
      contact: "Fresh Fruits Ghana",
      type: "outgoing",
      duration: "5:23",
      time: "2024-01-22 14:30",
      status: "completed",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 2,
      contact: "Customer Support",
      type: "incoming",
      duration: "12:45",
      time: "2024-01-22 10:15",
      status: "completed",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 3,
      contact: "Green Valley Farm",
      type: "outgoing",
      duration: "0:00",
      time: "2024-01-21 16:20",
      status: "missed",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 4,
      contact: "Tropical Delights",
      type: "incoming",
      duration: "8:12",
      time: "2024-01-21 09:45",
      status: "completed",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ]

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) || contact.phone.includes(searchQuery)
    const matchesFilter = filterBy === "all" || contact.type === filterBy
    return matchesSearch && matchesFilter
  })

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const startCall = (contact: any) => {
    setCurrentCall(contact)
    setIsInCall(true)
    setCallDuration(0)
    toast({
      title: "Calling...",
      description: `Connecting to ${contact.name}`,
    })
  }

  const endCall = () => {
    setIsInCall(false)
    setCurrentCall(null)
    setCallDuration(0)
    setIsMuted(false)
    setIsSpeakerOn(false)
    setIsVideoOn(false)
    toast({
      title: "Call Ended",
      description: "Call has been disconnected",
    })
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    toast({
      title: isMuted ? "Unmuted" : "Muted",
      description: `Microphone ${isMuted ? "enabled" : "disabled"}`,
    })
  }

  const toggleSpeaker = () => {
    setIsSpeakerOn(!isSpeakerOn)
    toast({
      title: isSpeakerOn ? "Speaker Off" : "Speaker On",
      description: `Speaker ${isSpeakerOn ? "disabled" : "enabled"}`,
    })
  }

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn)
    toast({
      title: isVideoOn ? "Video Off" : "Video On",
      description: `Video ${isVideoOn ? "disabled" : "enabled"}`,
    })
  }

  if (isInCall && currentCall) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Call Info */}
          <div className="text-center text-white mb-8">
            <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-white/20">
              <AvatarImage src={currentCall.avatar || "/placeholder.svg"} />
              <AvatarFallback className="text-2xl bg-purple-600">{currentCall.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold mb-2">{currentCall.name}</h2>
            <p className="text-purple-200 mb-1">{currentCall.phone}</p>
            <div className="flex items-center justify-center space-x-2">
              <Clock className="w-4 h-4" />
              <span className="text-lg font-mono">{formatDuration(callDuration)}</span>
            </div>
          </div>

          {/* Call Controls */}
          <div className="flex items-center justify-center space-x-6 mb-8">
            <Button
              variant="ghost"
              size="lg"
              className={`rounded-full w-16 h-16 ${
                isMuted ? "bg-red-500 hover:bg-red-600" : "bg-white/20 hover:bg-white/30"
              } text-white`}
              onClick={toggleMute}
            >
              {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </Button>

            <Button
              variant="ghost"
              size="lg"
              className={`rounded-full w-16 h-16 ${
                isSpeakerOn ? "bg-blue-500 hover:bg-blue-600" : "bg-white/20 hover:bg-white/30"
              } text-white`}
              onClick={toggleSpeaker}
            >
              {isSpeakerOn ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
            </Button>

            <Button
              variant="ghost"
              size="lg"
              className={`rounded-full w-16 h-16 ${
                isVideoOn ? "bg-green-500 hover:bg-green-600" : "bg-white/20 hover:bg-white/30"
              } text-white`}
              onClick={toggleVideo}
            >
              {isVideoOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
            </Button>
          </div>

          {/* End Call Button */}
          <div className="text-center">
            <Button
              variant="destructive"
              size="lg"
              className="rounded-full w-20 h-20 bg-red-500 hover:bg-red-600"
              onClick={endCall}
            >
              <PhoneOff className="w-8 h-8" />
            </Button>
          </div>

          {/* Additional Actions */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <Button variant="ghost" className="text-white hover:bg-white/20">
              <MessageCircle className="w-5 h-5 mr-2" />
              Message
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <Phone className="w-8 h-8 text-purple-600" />
          <h1 className="text-3xl font-bold">Voice & Video Calls</h1>
        </div>
        <p className="text-gray-600">Connect with vendors and support</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contacts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search and Filter */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search contacts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Select value={filterBy} onValueChange={setFilterBy}>
                    <SelectTrigger className="w-32">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="vendor">Vendors</SelectItem>
                      <SelectItem value="support">Support</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contacts List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Contacts</span>
              </CardTitle>
              <CardDescription>Your saved contacts and vendors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={contact.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {contact.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold">{contact.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {contact.type === "vendor" ? (
                          <Store className="w-3 h-3 mr-1" />
                        ) : (
                          <User className="w-3 h-3 mr-1" />
                        )}
                        {contact.type}
                      </Badge>
                      {contact.isOnline && <Badge className="bg-green-100 text-green-800 text-xs">Online</Badge>}
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{contact.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>{contact.phone}</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span>{contact.rating}</span>
                      </div>
                      <span>{contact.callCount} calls</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={() => startCall(contact)}>
                      <PhoneCall className="w-4 h-4 mr-2" />
                      Call
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Calls */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <History className="w-5 h-5" />
                <span>Recent Calls</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentCalls.map((call) => (
                <div
                  key={call.id}
                  className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={call.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{call.contact.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="font-medium text-sm truncate">{call.contact}</p>
                      <div
                        className={`w-2 h-2 rounded-full ${call.type === "incoming" ? "bg-green-500" : "bg-blue-500"}`}
                      ></div>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span>{new Date(call.time).toLocaleDateString()}</span>
                      <span>•</span>
                      <span className={call.status === "missed" ? "text-red-500" : ""}>{call.duration}</span>
                    </div>
                  </div>

                  <Button variant="ghost" size="sm">
                    <PhoneCall className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add New Contact
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Phone className="w-4 h-4 mr-2" />
                Customer Support
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <MessageCircle className="w-4 h-4 mr-2" />
                Live Chat
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
