import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { HiChat } from 'react-icons/hi';
import {
    HiArrowLeftOnRectangle,
    HiUsers
} from 'react-icons/hi2';

import { signOut } from "next-auth/react";
import useConversation from "./useConversation";

export default function useRoutes() {
    const pathname = usePathname();
    const  { conversationId } = useConversation();

    const routes = useMemo(() => [
        {
            label: 'Chat',
            href: '/conversations',
            icon: HiChat,
            isactive: pathname === '/conversations' || !!conversationId
        },
        {
            label: 'Home',
            href: '/home',
            icon: HiUsers,
            isactive: pathname === '/home'
        },
        {
            label: 'Sign out',
            href: '#',
            onClick: () => signOut(),
            icon: HiArrowLeftOnRectangle,
        }
    ], [pathname, conversationId]);

    return routes;
}