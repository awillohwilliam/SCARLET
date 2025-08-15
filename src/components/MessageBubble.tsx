import React from 'react'
import { Check, CheckCheck } from 'lucide-react'
import { Message } from '../types'

interface MessageBubbleProps {
  message: Message
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const getStatusIcon = () => {
    switch (message.status) {
      case 'sent':
        return <Check className="w-4 h-4 text-gray-400" />
      case 'delivered':
        return <CheckCheck className="w-4 h-4 text-gray-400" />
      case 'read':
        return <CheckCheck className="w-4 h-4 text-blue-500" />
      default:
        return null
    }
  }

  return (
    <div className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'} mb-2`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow-sm ${
          message.isOwn
            ? 'bg-whatsapp-bubble text-gray-800'
            : 'bg-white text-gray-800'
        }`}
      >
        <p className="text-sm leading-relaxed">{message.text}</p>
        <div className={`flex items-center justify-end mt-1 space-x-1 ${
          message.isOwn ? 'text-gray-600' : 'text-gray-500'
        }`}>
          <span className="text-xs">{message.timestamp}</span>
          {message.isOwn && getStatusIcon()}
        </div>
      </div>
    </div>
  )
}

export default MessageBubble