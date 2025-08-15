import React, { useState, useRef, useEffect } from 'react'
import { Phone, Video, MoreVertical, Smile, Paperclip, Mic, Send } from 'lucide-react'
import { Contact, Message } from '../types'
import MessageBubble from './MessageBubble'

interface ChatAreaProps {
  contact: Contact | null
  messages: Message[]
  onSendMessage: (text: string) => void
}

const ChatArea: React.FC<ChatAreaProps> = ({ contact, messages, onSendMessage }) => {
  const [messageText, setMessageText] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (messageText.trim()) {
      onSendMessage(messageText.trim())
      setMessageText('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (!contact) {
    return (
      <div className="flex-1 flex items-center justify-center bg-whatsapp-gray">
        <div className="text-center">
          <div className="w-64 h-64 mx-auto mb-8 opacity-20">
            <svg viewBox="0 0 303 172" className="w-full h-full">
              <path fill="currentColor" d="M229.565 160.229c-6.429-.439-13.353-1.292-20.728-2.556-8.44-1.446-16.996-3.233-25.623-5.352-12.297-3.022-24.525-6.791-36.63-11.296-19.363-7.207-38.267-16.37-56.546-27.423-18.28-11.052-35.935-23.995-52.832-38.777C21.273 60.967 7.82 44.8 0 27.027L9.536 0c10.705 21.442 26.406 40.017 46.76 55.295 20.354 15.278 44.362 27.26 71.73 35.78 27.368 8.52 57.096 13.578 88.774 15.106 31.678 1.528 65.307.525 100.23-3.008L303 131.2c-24.49 7.321-49.423 13.388-74.435 18.029z"/>
            </svg>
          </div>
          <h2 className="text-2xl font-light text-gray-600 mb-2">SCARLET Web</h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Send and receive messages without keeping your phone online.
            Use SCARLET on up to 4 linked devices and 1 mobile phone.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Chat Header */}
      <div className="bg-whatsapp-gray p-4 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={contact.avatar}
              alt={contact.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            {contact.isOnline && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            )}
          </div>
          <div>
            <h2 className="font-medium text-gray-900">{contact.name}</h2>
            <p className="text-sm text-gray-500">
              {contact.isOnline ? 'online' : 'last seen recently'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Phone className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-800" />
          <Video className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-800" />
          <MoreVertical className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-800" />
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-hide bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxwYXR0ZXJuIGlkPSJhIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiPgogICAgICA8cmVjdCBmaWxsPSIjZjBmMmY1IiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiLz4KICAgICAgPGNpcmNsZSBmaWxsPSIjZTVlN2ViIiBjeD0iMTAiIGN5PSIxMCIgcj0iMSIvPgogICAgPC9wYXR0ZXJuPgogIDwvZGVmcz4KICA8cmVjdCBmaWxsPSJ1cmwoI2EpIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+Cjwvc3ZnPg==')] bg-repeat">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-whatsapp-gray p-4 flex items-end space-x-3">
        <div className="flex space-x-2">
          <Smile className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800" />
          <Paperclip className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800" />
        </div>
        
        <div className="flex-1 relative">
          <textarea
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message"
            className="w-full px-4 py-2 bg-white rounded-lg border border-gray-200 resize-none outline-none focus:border-whatsapp-primary max-h-32 min-h-[40px]"
            rows={1}
            style={{ height: 'auto' }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement
              target.style.height = 'auto'
              target.style.height = target.scrollHeight + 'px'
            }}
          />
        </div>
        
        {messageText.trim() ? (
          <Send
            className="w-6 h-6 text-whatsapp-primary cursor-pointer hover:text-whatsapp-secondary"
            onClick={handleSend}
          />
        ) : (
          <Mic className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800" />
        )}
      </div>
    </div>
  )
}

export default ChatArea