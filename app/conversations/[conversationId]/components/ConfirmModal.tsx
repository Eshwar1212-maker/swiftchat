"use client"

import useConversation from "@/app/hooks/useConversation"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import { toast } from "react-hot-toast"

interface ConfirmModalProps {
    isOpen?:boolean
    onClose: () => void

}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    onClose
}) => {
    const router = useRouter()
    const {conversationId} = useConversation()
    const [isLoading, setIsLoading] = useState(false)
    const onDelete = useCallback(() => {
        setIsLoading(true)
        axios.delete(`/api/conversations/${conversationId}`)
        .then(() => {
            onClose()
            router.push('/conversations')
            router.refresh()
        })
        .catch(() => {
            toast.error("Something went wrong")
        })
        .finally(() => {
            setIsLoading(false)
        })
    }, [conversationId, router, onClose])
  return (
    <div>ConfirmModal</div>
  )
}

export default ConfirmModal