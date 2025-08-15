import React from 'react'
import { Search, MoreVertical, MessageCircle } from 'lucide-react'
import { Contact } from '../types'
import ContactItem from './ContactItem'

interface SidebarProps {
  contacts: Contact[]
  selectedContact: Contact | null
  onSelectContact: (contact: Contact) => void
}

const Sidebar: React.FC<SidebarProps> = ({ contacts, selectedContact, onSelectContact }) => {
  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="bg-whatsapp-gray p-4 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-whatsapp-primary rounded-full flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-semibold text-gray-800">SCARLET</h1>
        </div>
        <MoreVertical className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-800" />
      </div>

      {/* Search */}
      <div className="p-3 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search or start new chat"
            className="w-full pl-10 pr-4 py-2 bg-whatsapp-gray rounded-lg border-none outline-none text-sm"
          />
        </div>
      </div>

      {/* Contacts List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {contacts.map((contact) => (
          <ContactItem
            key={contact.id}
            contact={contact}
            isSelected={selectedContact?.id === contact.id}
            onClick={() => onSelectContact(contact)}
          />
        ))}
      </div>
    </div>
  )
}

export default Sidebar