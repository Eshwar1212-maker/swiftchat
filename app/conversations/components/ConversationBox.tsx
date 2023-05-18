'use client'
import { useRouter } from "next/navigation"
import { useCallback, useMemo } from "react"
import { Conversation, Message, User } from "@prisma/client"
import format from "date-fns/format"
import clsx from "clsx"
import { useSession } from "next-auth/react"
import { FullConversationType } from "@/app/types"
import useOtherUser from "@/app/hooks/useOtherUser"
import Avatar from "@/app/components/Avatar"

interface ConversationBoxProps {
  data: FullConversationType,
  selected?: boolean
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
  data, selected
}) => {
  const otherUser = useOtherUser(data);
  const session = useSession()
  const router = useRouter()
  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`)
  }, [data.id, router])

  const lastMessage = useMemo(() => {
    const messages = data.messages || []
    return messages[messages.length - 1]
  }, [data.messages])

  const userEmail = useMemo(() => {
    return session.data?.user?.email
  }, [session.data?.user?.email])

  const hasSeen = useMemo(() => {
    if(!lastMessage) return false
    const seenArray = lastMessage.seen || []
    if(!userEmail) return false
    return seenArray.filter((user) => user.email === userEmail).length !== 0
  }, [userEmail, lastMessage])

  const lastMessageText = useMemo(() => {
      if(lastMessage?.image){
        return 'Photo'
      }
      if(lastMessage.body){
        return lastMessage.body
      }
      return ""
  }, [lastMessage])

  return (
    <div
    onClick={handleClick}
    className={
      clsx(`
        w-full relative flex items-center space-x-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer

      `, selected ? ' bg-neutral-100' : 'bg-white')
    }
    >
      <Avatar user={otherUser}/>
      <div className="min-w-0 flex-1 ">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1"
          >
            <p className="text-md font-medium text-gray-900">
              {data.name || otherUser.name}
            </p>
            {
              true && (
                <p className="
                    text-xs text-gray-400 font-light
                ">
                  {format(new Date(), 'p')}
                </p>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConversationBox