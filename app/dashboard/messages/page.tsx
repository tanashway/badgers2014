'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  Plus,
  User,
  MoreVertical,
  Send,
  Paperclip,
  Image as ImageIcon
} from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isMe: boolean;
}

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
}

const chats: Chat[] = [
  {
    id: '1',
    name: 'Team General',
    lastMessage: 'Great practice today everyone!',
    timestamp: '5m ago',
    unread: 3,
    online: true
  },
  {
    id: '2',
    name: 'Coach Updates',
    lastMessage: 'Schedule for next week is posted',
    timestamp: '23m ago',
    unread: 0,
    online: true
  },
  {
    id: '3',
    name: 'Tournament Group',
    lastMessage: 'Don\'t forget to submit your forms',
    timestamp: '1h ago',
    unread: 1,
    online: false
  },
  {
    id: '4',
    name: 'Parents Discussion',
    lastMessage: 'Carpool arrangements for Saturday',
    timestamp: '2h ago',
    unread: 0,
    online: true
  }
];

const messages: Message[] = [
  {
    id: '1',
    sender: 'Coach Mike',
    content: 'Great practice today everyone! Remember to review the new plays we discussed.',
    timestamp: '5:30 PM',
    isMe: false
  },
  {
    id: '2',
    sender: 'Sarah Johnson',
    content: 'Thanks coach! Quick question about the defensive formation...',
    timestamp: '5:32 PM',
    isMe: false
  },
  {
    id: '3',
    sender: 'Me',
    content: 'I can help explain that during tomorrow\'s practice if you\'d like.',
    timestamp: '5:35 PM',
    isMe: true
  },
  {
    id: '4',
    sender: 'Coach Mike',
    content: 'That would be great! We can do a quick demo before the main practice.',
    timestamp: '5:36 PM',
    isMe: false
  }
];

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState<string>('1');
  const [messageInput, setMessageInput] = useState('');

  return (
    <div className="h-[calc(100vh-9rem)]">
      <div className="grid grid-cols-4 h-full gap-6">
        {/* Chats Sidebar */}
        <Card className="p-4 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Messages</h2>
            <Button size="icon" variant="ghost">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search messages..."
              className="pl-9"
            />
          </div>

          <div className="space-y-2 flex-1 overflow-auto">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedChat === chat.id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent'
                }`}
                onClick={() => setSelectedChat(chat.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <User className="h-6 w-6" />
                      {chat.online && (
                        <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-green-500" />
                      )}
                    </div>
                    <span className="font-medium">{chat.name}</span>
                  </div>
                  <span className="text-xs">{chat.timestamp}</span>
                </div>
                <p className={`text-sm truncate ${
                  selectedChat === chat.id
                    ? 'text-primary-foreground/70'
                    : 'text-muted-foreground'
                }`}>
                  {chat.lastMessage}
                </p>
                {chat.unread > 0 && (
                  <div className="mt-2 flex justify-end">
                    <div className="bg-primary text-primary-foreground px-2 py-0.5 rounded-full text-xs">
                      {chat.unread}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Chat Area */}
        <Card className="col-span-3 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-3">
              <User className="h-6 w-6" />
              <div>
                <h3 className="font-medium">Team General</h3>
                <p className="text-sm text-muted-foreground">23 members</p>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] ${message.isMe ? 'bg-primary text-primary-foreground' : 'bg-accent'} rounded-lg p-3`}>
                  {!message.isMe && (
                    <p className="text-sm font-medium mb-1">{message.sender}</p>
                  )}
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${message.isMe ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <ImageIcon className="h-4 w-4" />
              </Button>
              <Input
                placeholder="Type a message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className="flex-1"
              />
              <Button>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}