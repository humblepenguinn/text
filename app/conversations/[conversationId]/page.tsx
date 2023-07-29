

import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";
import ConversationBody from "@/app/components/conversation/ConversationBody";
import ConversationHeader from "@/app/components/conversation/ConversationHeader";
import CreateMessage from "@/app/components/conversation/CreateMessage";
import EmptyState from "@/app/components/EmptyState";

interface IParams {
    conversationId: string;
}

const ConversationID = async ({ params }: { params: IParams }) => {
    const conversation = await getConversationById(params.conversationId);
    const messages = await getMessages(params.conversationId);

    if (!conversation) {
        return (
            <div className='lg:pl-80 h-full'>
                <div className='h-full flex flex-col'>
                    <EmptyState />
                </div>
            </div>
        )

    }
    return (
        <div className='lg:pl-80 h-full'>
            <div className='h-full flex flex-col'>
                <ConversationHeader conversation={conversation}/>
                <ConversationBody initalMessages={messages} />
                <CreateMessage />
            </div>
        </div>
    )
}

export default ConversationID;