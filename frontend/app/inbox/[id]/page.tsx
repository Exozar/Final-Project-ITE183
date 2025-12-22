import { getAccessToken, getUserId } from "../../lib/action";
import apiService from "@/app/services/apiService";
import ConversationDetail from "@/app/Components/inbox/ConversationDetail";
import { UserType } from "../page";


export type MessageType = {
    id: string;
    name: string;
    body: string;
    conversationId: string;
    sent_to: UserType;
    created_by: UserType
}


const ConversationPage = async ({ params }: { params: { id: string } }) => {
    if (!params?.id) {
        return (
            <main className="max-w-[1500px] mx-auto px-6 py-12">
                <p>Invalid conversation ID.</p>
            </main>
        )
    }

    const userId = await getUserId();
    const token = await getAccessToken();


    if (!userId || !token) {
        return (
            <main className="max-w-[1500px] max-auto px-6 py-12">
                <p>You need to be authenticated...</p>
            </main>
        )
    }


    const conversation = await apiService.get(`/api/chat/${params.id}/`)


    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
            <ConversationDetail
                token={token}
                userId={userId}
                // messages={conversation.messages}
                conversation={conversation.conversation}
            />
        </main>
    )
}


export default ConversationPage;
