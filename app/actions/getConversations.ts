import prisma from '@/app/libs/prismadb';
import getCurrentUser from './getCurrentUser';

export default async function getConversations() {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
        return [];
    }

    try {
        const converstaions = await prisma.conversation.findMany({
            orderBy: {
                lastMessageAt: 'desc'
            },

            where: {
                userIds: {
                    has: currentUser.id
                }
            },
            include: {
                users: true,
                messages: {
                    include: {
                        sender: true,
                        seen: true
                    }
                }
            }
        });

        return converstaions;

    } catch (error) {
        return []
    }
}
