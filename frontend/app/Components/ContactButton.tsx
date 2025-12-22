import { startConversation } from '../lib/action';

interface ContactButtonProps {
    landlordId: string;
}

const ContactButton = ({ landlordId }: ContactButtonProps) => {
    return (
        <form action={startConversation.bind(null, landlordId)}>
            <button
                type="submit"
                className="mt-6 py-4 px-6 cursor-pointer bg-airbnb text-white rounded-xl hover:bg-airbnb-dark transition"
            >
                Contact
            </button>
        </form>
    )
}
export default ContactButton;