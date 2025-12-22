import Image from "next/image";


import ContactButton from "@/app/Components/ContactButton";
import PropertyLists from "@/app/Components/properties/PropertyLists";
import apiService from "@/app/services/apiService";
import { getUserId } from "@/app/lib/action";


const LandlordDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const paramsData = await params;
    const landlord = await apiService.get(`/api/auth/${paramsData.id}`)
    const userId = await getUserId();


    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <aside className="col-span-1 mb-4">
                    <div className="flex flex-col items-center p-6 rounded-xl border border-gray-300 shadow-xl">
                        <Image
                            src={landlord.avatar_url}
                            width={200}
                            height={200}
                            alt="Landlrod name"
                            className="rounded-full"
                        />


                        <h1 className="mt-6 text-2xl">{landlord.name}</h1>


                        {userId && (
                            <ContactButton
                                userId={userId}
                                landlordId={paramsData.id}
                            />
                        )}
                    </div>
                </aside>


                <div className="col-span-1 md:col-span-3 pl-0 md:pl-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <PropertyLists
                            landlord_id={paramsData.id}
                        />
                    </div>
                </div>
            </div>
        </main>
    )
}


export default LandlordDetailPage;
