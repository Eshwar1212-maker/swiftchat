'use client'

import useConversation from "@/app/hooks/useConversation"
import { FullMessageType } from "@/app/types"
import MessageBox from "./MessageBox"
import { useRef, useState } from "react"

interface  BodyProps{
  initialMessages: FullMessageType[]

}

const Body: React.FC<BodyProps> = ({initialMessages}) => {

  const [messages, setMessages] = useState(initialMessages)
  const bottomRef = useRef<HTMLDivElement>(null)
  const {conversationId} = useConversation()
console.log(messages);


  return (
    <div className="flex-1 overflow-y-auto">
        {messages.map((message, i) => {
          return <MessageBox 
                  isLast={i === messages.length - 1}
                  key={message.id}
                  data={message}
                  />
        })}
        <div className="pt-24" ref={bottomRef} />
    </div>
  )
}

export default Body