import { Channel, Members } from 'pusher-js';
import { useEffect, useState } from 'react';
import { pusherClient } from '../libs/pusher';
import useActiveList from './useActiveList';

export default function useActiveChannel() {
    const { set, add, remove} = useActiveList();
    const [activeChannel, setActiveChannel] = useState<Channel | null>(null);

    useEffect(() => {
        let channel = activeChannel;

        if (!channel) {
            channel = pusherClient.subscribe('presence-text');
            setActiveChannel(channel);
        }

        channel.bind('pusher:subscription_succeeded', (members: Members) => {
            const initalMembers: string[] = [];

            members.each((member: Record<string, any>) => initalMembers.push(member.id));
            set(initalMembers);
        });

        channel.bind('pusher:member_added', (member: Record<string, any>) => {
            add(member.id);
        });

        channel.bind('pusher:member_removed', (member: Record<string, any>) => {
            remove(member.id);
        });

        return () => {
            if (activeChannel) {
                pusherClient.unsubscribe('presence-text');
                setActiveChannel(null);
            }
        }
    }, [activeChannel, set, add, remove])
}