'use client';
import CustomButton from "@/app/Components/forms/CustomButton";
const ConversationDetail = () => {
    return (
        <>
            <div className="max-h-[400px] overflow-auto flex flex-col space-y-4">
                <div className="w-[80%]py-4 px-6 rounded-xl bg-gray-200">
                    <p className="font-bold text-gray-500">Exorcisto</p>
                    <p className="text-gray-500">Kamusta.</p>
                </div>
                <div className="w-[80%]py-4 ml-[20%] px-6 rounded-xl bg-blue-200">
                    <p className="font-bold text-gray-500">Bryan Salazar</p>
                    <p className="text-gray-500">Okay ra</p>
                </div>
            </div>
            <div className="mt-4 py-4 px-6 flex border border-gray-300 space-x-4 rounded-xl">
                <input
                    type="text"
                    placeholder="Type your message..."
                    className="w-full p-2 bg-gray-200 rounded-xl"
                />
                <CustomButton
                    onClick={() => console.log('clicked')}
                    label="Send"
                    className="w-[100px]"
                />
            </div>
        </>
    )
}
export default ConversationDetail;
