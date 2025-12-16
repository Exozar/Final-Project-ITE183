'use client';
import { useEffect, useState } from 'react';
import PropertyListItem from "./PropertyListItems";
import apiService from '@/app/services/apiService';


export type PropertyType = {
    id: string;
    title: string;
    image_url: string;
    price_per_night: number;
}


interface PropertyListProps {
    landlord_id?: string | null;
    favorites?: boolean | null;
}


const PropertyLists: React.FC<PropertyListProps> = ({
    landlord_id
    // favorites
}) => {
    const [properties, setProperties] = useState<PropertyType[]>([]);


    let url = '/api/properties/';


    if (landlord_id) {
        url += `?landlord_id=${landlord_id}`
    }


    const getProperties = async () => {
        const tmpProperties = await apiService.get(url)


        setProperties(tmpProperties.data)
    };


    useEffect(() => {
        getProperties();
    }, []);


    return (
        <>
            {properties.map((property) => {
                return (
                    <PropertyListItem
                        key={property.id}
                        property={property}
                    // markFavorite={(is_favorite: any) => markFavorite(property.id, is_favorite)}
                    />
                )
            })}
        </>
    )
}


export default PropertyLists;
