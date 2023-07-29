import getConversations from "../actions/getConversations";
import getUsers from "../actions/getUsers";
import ConversationList from "../components/conversation/ConversationList"
import { SideBar } from "../components/sidebar/Sidebar"

export default async function ConversationsLayout({
    children
}: {
    children: React.ReactNode
}) {
    const conversations = await getConversations();
    const users = await getUsers();

    return (
        // @ts-ignore
        <SideBar>
            <div className='h-full'>
                <ConversationList initalItems={conversations} users={users} />
                {children}
            </div>
        </SideBar>
    )
}