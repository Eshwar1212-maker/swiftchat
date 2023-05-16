import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiChat } from 'react-icons/hi'
import { HiArrowLeftOnRectangle, HiUsers } from 'react-icons/hi2'
import { signOut } from "next-auth/react";
import useConversation from "./useConversation";

const useRoutes = () => {
    const pathNmae = usePathname()
    const { conversationId } = useConversation()
    const routes = useMemo(() => {
        return [
            {
                href: '/conversations',
                label: 'Chat',
                icon: HiChat,
                active: pathNmae === '/conversations' || !!conversationId
            },
            {
                href: '/users',
                label: 'Users',
                icon: HiUsers,
                active: pathNmae === '/users'
            },
            {
                path: '#',
                label: 'Sign Out',
                icon: HiArrowLeftOnRectangle,
                onClick: () => signOut()
            }
        ]
    },[pathNmae, conversationId])
    return routes
}
export default useRoutes