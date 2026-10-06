"use client";

import { MessageDock } from '@/components/ui/message-dock'

export function FloatingDock() {
  return (
    <MessageDock
      theme="light"
      placeholder={(name) => `Ask ${name} about the menu...`}
      onMessageSend={(msg, char) => {
        console.log(`Sending to ${char.name}: ${msg}`)
        alert(`Message sent to ${char.name}: ${msg}`)
      }}
    />
  )
}
