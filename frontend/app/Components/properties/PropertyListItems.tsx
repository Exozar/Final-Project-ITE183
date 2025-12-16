import Image from "next/image";
import { PropertyType } from "./PropertyLists";
import { useRouter } from "next/navigation";


interface PropertyProps {
    property: PropertyType,
    markFavorite?: (is_favorite: boolean) => void;
}


const PropertyListItems: React.FC<PropertyProps> = ({
    property
}) => {
    const router = useRouter();
    return (
        <div
            className="cursor-pointer"
            onClick={() => router.push(`/properties/${property.id}`)}


        >
            <div className="relative overflow-hidden aspect-square rounded-xl">
                <Image
                src={property.image_url}
                fill
                unoptimized
                className="hover:scale-110 object-cover transition"
                alt={property.title}
                />
            </div>


            <div className="mt-2">
                <p className="text-lg font-bold">{property.title}</p>
            </div>


            <div className="mt-2">
                <p className="text-sm text-gray-700">
                    <strong>{property.price_per_night}</strong> per night
                </p>
            </div>


        </div>
    )
}
export default PropertyListItems;
