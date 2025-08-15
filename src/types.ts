export interface Contact {
  id: string
  name: string
  avatar: string
  lastMessage: string
  timestamp: string
  unreadCount: number
  isOnline: boolean
}

export interface Message {
  id: string
  text: string
  timestamp: string
  isOwn: boolean
  status: 'sent' | 'delivered' | 'read'
}