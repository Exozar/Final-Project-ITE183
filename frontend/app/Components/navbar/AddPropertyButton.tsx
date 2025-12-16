'use client';
import useLoginModal from "@/app/hooks/useLoginModal";
import useAddPropertyModal from "@/app/hooks/AddPropertyModal";

interface AddPropertyButtonProps {
    userId?: string | null;
}

const AddPropertyButton: React.FC<AddPropertyButtonProps> = ({
    userId
}) => {

    const loginModal = useLoginModal();
    const addPropertyModal = useAddPropertyModal();
    const airbnbYourHome = () => {
        if (userId) {
            addPropertyModal.open()
        } else {
            loginModal.open();
        }
    }
    return (
        <div
            onClick={airbnbYourHome}
            className="p-2 text-sm font-semibold rounded-full hover:bg-gray-200 ">
            Djangobnb your home
        </div>
    )
}
export default AddPropertyButton;
