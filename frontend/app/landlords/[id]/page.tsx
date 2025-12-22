import Image from "next/image";
import PropertyLists from "@/app/Components/properties/PropertyLists";
import apiService from "@/app/services/apiService";
import { getUserId } from "@/app/lib/action";
import ContactButton from "@/app/Components/ContactButton";


const LandlordDetailPage = async (props: { params: { id: string } }) => {
    const params = await props.params;
    const landlord = await apiService.get(`/api/auth/landlord/${params.id}/`);
    const userId = await getUserId();

    return (
        <main className="max-w-[1500px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <aside className="col-span-1 mb-4">
                    <div className="flex flex-col items-center p-6 rounded-xl border border-gray-300 shadow-xl">
                        <Image
                            src="/profile_pic_1.jpg"
                            width={200}
                            height={200}
                            alt="Landlord name"
                            className="rounded-full"
                        />
                        <h1 className="mt-6 text-2xl">{landlord.name}</h1>
                        {userId != params.id && (
                            <ContactButton
                            // userId={userId}
                            // landlordId={params.id}
                                landlordId={params.id}
                            />
                        )}
                    </div>
                </aside>


                <div className="col-span-1 md:col-span-3 pl-0 md:pl-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <PropertyLists
                            landlord_id={params.id}
                        />
                    </div>
                </div>
            </div>
        </main>
    )
}
export default LandlordDetailPage;
