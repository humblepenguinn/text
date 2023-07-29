import primsa from '@/app/libs/prismadb'
import getCurrentUser from './getCurrentUser';

export default async function getConversationById(conversationId: string) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser?.email) return null;

        const conversation = await primsa.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                users: true,
            }
        });

        return conversation;
    } catch (error) {
        return null
    }
}
