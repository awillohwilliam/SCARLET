import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import ChatArea from './components/ChatArea'
import { Contact, Message } from './types'

const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    lastMessage: 'Hey! How are you doing?',
    timestamp: '2:30 PM',
    unreadCount: 2,
    isOnline: true
  },
  {
    id: '2',
    name: 'Bob Smith',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    lastMessage: 'See you tomorrow!',
    timestamp: '1:45 PM',
    unreadCount: 0,
    isOnline: false
  },
  {
    id: '3',
    name: 'Carol Davis',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    lastMessage: 'Thanks for the help!',
    timestamp: '12:20 PM',
    unreadCount: 1,
    isOnline: true
  },
  {
    id: '4',
    name: 'David Wilson',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
    lastMessage: 'Let me know when you\'re free',
    timestamp: '11:30 AM',
    unreadCount: 0,
    isOnline: false
  }
]

const mockMessages: { [key: string]: Message[] } = {
  '1': [
    {
      id: '1',
      text: 'Hey! How are you doing?',
      timestamp: '2:25 PM',
      isOwn: false,
      status: 'read'
    },
    {
      id: '2',
      text: 'I\'m doing great! Just working on some projects. How about you?',
      timestamp: '2:27 PM',
      isOwn: true,
      status: 'read'
    },
    {
      id: '3',
      text: 'That sounds awesome! I\'d love to hear more about your projects.',
      timestamp: '2:30 PM',
      isOwn: false,
      status: 'delivered'
    }
  ],
  '2': [
    {
      id: '4',
      text: 'Are we still meeting tomorrow?',
      timestamp: '1:40 PM',
      isOwn: true,
      status: 'read'
    },
    {
      id: '5',
      text: 'Yes, absolutely! See you tomorrow!',
      timestamp: '1:45 PM',
      isOwn: false,
      status: 'read'
    }
  ],
  '3': [
    {
      id: '6',
      text: 'Could you help me with the presentation?',
      timestamp: '12:15 PM',
      isOwn: false,
      status: 'read'
    },
    {
      id: '7',
      text: 'Of course! I\'ll send you the template.',
      timestamp: '12:18 PM',
      isOwn: true,
      status: 'read'
    },
    {
      id: '8',
      text: 'Thanks for the help!',
      timestamp: '12:20 PM',
      isOwn: false,
      status: 'delivered'
    }
  ]
}

function App() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(mockContacts[0])
  const [messages, setMessages] = useState<{ [key: string]: Message[] }>(mockMessages)

  const handleSendMessage = (text: string) => {
    if (!selectedContact) return

    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
      status: 'sent'
    }

    setMessages(prev => ({
      ...prev,
      [selectedContact.id]: [...(prev[selectedContact.id] || []), newMessage]
    }))

    // Simulate message status updates
    setTimeout(() => {
      setMessages(prev => ({
        ...prev,
        [selectedContact.id]: prev[selectedContact.id].map(msg =>
          msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
        )
      }))
    }, 1000)

    setTimeout(() => {
      setMessages(prev => ({
        ...prev,
        [selectedContact.id]: prev[selectedContact.id].map(msg =>
          msg.id === newMessage.id ? { ...msg, status: 'read' } : msg
        )
      }))
    }, 2000)
  }

  return (
    <div className="flex h-screen bg-whatsapp-gray">
      <Sidebar
        contacts={mockContacts}
        selectedContact={selectedContact}
        onSelectContact={setSelectedContact}
      />
      <ChatArea
        contact={selectedContact}
        messages={selectedContact ? messages[selectedContact.id] || [] : []}
        onSendMessage={handleSendMessage}
      />
    </div>
  )
}

export default App