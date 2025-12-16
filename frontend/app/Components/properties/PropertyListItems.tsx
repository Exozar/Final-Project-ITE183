import { PropertyType } from "./PropertyLists";

interface PropertyProps {
    property: PropertyType,
    markFavorite?: (is_favorite: boolean) => void;
}

const PropertyListItems: React.FC<PropertyProps> = ({
    property,
}) => {
    return (
        <div className="cursor-pointer">
            <div className="relative overflow-hidden aspect-square rounded-xl">
                <img
                    src={property.image_url}
                    className="hover:scale-110 object-cover transition h-full w-full"
                    alt="Beach house"
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
