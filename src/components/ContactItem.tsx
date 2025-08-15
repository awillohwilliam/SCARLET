import React from 'react'
import { Contact } from '../types'

interface ContactItemProps {
  contact: Contact
  isSelected: boolean
  onClick: () => void
}

const ContactItem: React.FC<ContactItemProps> = ({ contact, isSelected, onClick }) => {
  return (
    <div
      className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
        isSelected ? 'bg-whatsapp-light' : ''
      }`}
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={contact.avatar}
          alt={contact.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        {contact.isOnline && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
        )}
      </div>
      
      <div className="ml-3 flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900 truncate">{contact.name}</h3>
          <span className="text-xs text-gray-500">{contact.timestamp}</span>
        </div>
        <div className="flex items-center justify-between mt-1">
          <p className="text-sm text-gray-600 truncate">{contact.lastMessage}</p>
          {contact.unreadCount > 0 && (
            <span className="bg-whatsapp-primary text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
              {contact.unreadCount}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default ContactItem