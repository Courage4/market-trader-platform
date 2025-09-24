"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { MessageCircle, Clock, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { recentMessages, RecentMessage } from "./dashboard-data"

export default function DashboardRecentMessages() {
  const router = useRouter()
  const { toast } = useToast()
  const [selectedMessage, setSelectedMessage] = useState<RecentMessage | null>(null)
  const [replyText, setReplyText] = useState("")
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false)

  const handleViewAllMessages = () => {
    router.push("/vendor/messages")
  }

  const handleReplyToMessage = (message: RecentMessage) => {
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
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Reply Sent",
        description: `Your reply has been sent to ${selectedMessage?.buyer}`,
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
    <>
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <MessageCircle className="h-6 w-6 text-emerald-500" />
              Recent Messages
            </h3>
            <p className="text-gray-600 mt-1">Messages from potential buyers</p>
          </div>
          <Button
            onClick={handleViewAllMessages}
            className="btn btn-outline btn-sm"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            View All
          </Button>
        </div>
        <div className="space-y-4">
          {recentMessages.map((message) => (
            <div
              key={message.id}
              className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:shadow-md transition-all duration-300"
            >
              <img
                src={message.avatar || "/placeholder-user.jpg"}
                alt={message.buyer}
                className="w-10 h-10 rounded-full border-2 border-emerald-200"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold text-gray-900 text-sm">{message.buyer}</p>
                  {message.unread && (
                    <span className="badge-primary text-xs">New</span>
                  )}
                </div>
                <p className="text-sm text-gray-700 mb-2 line-clamp-2">{message.message}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {message.time}
                  </p>
                  <Button
                    onClick={() => handleReplyToMessage(message)}
                    className="btn btn-outline btn-sm h-7 text-xs"
                  >
                    <Send className="mr-1 h-3 w-3" />
                    Reply
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reply Dialog */}
      <Dialog open={isReplyDialogOpen} onOpenChange={setIsReplyDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <Send className="h-5 w-5 text-emerald-600" />
              </div>
              Reply to {selectedMessage?.buyer}
            </DialogTitle>
            <DialogDescription>
              Replying to: "{selectedMessage?.message}"
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="form-label">Your Reply</label>
              <Textarea
                placeholder="Type your reply here..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                rows={4}
                className="form-textarea"
              />
            </div>
          </div>
          <DialogFooter className="gap-3">
            <Button 
              onClick={() => setIsReplyDialogOpen(false)}
              className="btn btn-outline"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSendReply} 
              className="btn btn-primary"
            >
              <Send className="mr-2 h-4 w-4" />
              Send Reply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}