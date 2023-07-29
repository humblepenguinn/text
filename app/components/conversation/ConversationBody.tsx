'use client';

import useConversation from "@/app/hooks/useConversation";
import { pusherClient } from "@/app/libs/pusher";
import { FullMessageType } from "@/app/types";
import axios from "axios";
import { find } from "lodash";
import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";

interface ConversationBodyProps {
    initalMessages: FullMessageType[];
}
export default function ConversationBody({
    initalMessages,
}: ConversationBodyProps) {
    const [messages, setMessages] = useState(initalMessages);
    const bottomRef = useRef<HTMLDivElement>(null);

    const {conversationId} = useConversation();

    useEffect(() => {
        axios.post(`/api/conversations/${conversationId}/seen`)
    }, [conversationId])

    useEffect(() => {
        pusherClient.subscribe(conversationId);
        bottomRef?.current?.scrollIntoView();

        const messageHandler = (message: FullMessageType) => {
            axios.post(`/api/conversations/${conversationId}/seen`)
            setMessages((current) => {
                if (find(current, {id: message.id})) {
                    return current;
                }

                return [...current, message];
            })

            bottomRef?.current?.scrollIntoView();
        }

        const updateMessageHandler = (message: FullMessageType) => {
            setMessages((current) => current.map(currentMessage => {
                if (currentMessage.id === message.id) {
                    return message;
                }

                return currentMessage;
            }))
        }

        pusherClient.bind('messages:new', messageHandler)
        pusherClient.bind('message:update', updateMessageHandler)


        return () => {
            pusherClient.unsubscribe(conversationId);
            pusherClient.unbind('messages:new', messageHandler);
            pusherClient.unbind('message:update', updateMessageHandler);
        }
    }, [conversationId])
    return (
        <div className='flex-1 overflow-y-auto'>
            {
                messages.map((message, i) => (
                    <MessageBox isLast={i === messages.length - 1} key={message.id} data={message} />
                ))
            }
            <div ref={bottomRef} className='pt-24' />
        </div>
    )
}