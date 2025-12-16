'use client';


import { useEffect, useState } from 'react';
import PropertyListItems from "./PropertyListItems";
import apiService from '@/app/services/apiService';


export type PropertyType = {
    id: string;
    title: string;
    image_url: string;
    price_per_night: number;
    is_favorite: boolean;
}


interface PropertyListProps {
    landlord_id?: string | null;
    favorites?: boolean | null;
}


const PropertyLists: React.FC<PropertyListProps> = ({
    landlord_id,
    favorites
}) => {
    const [properties, setProperties] = useState<PropertyType[]>([]);


    const markFavorite = (id: string, is_favorite: boolean) => {
        const tmpProperties = properties.map((property: PropertyType) => {
            if (property.id == id) {
                property.is_favorite = is_favorite


                if (is_favorite) {
                    console.log('added to list of favorited propreties')
                } else {
                    console.log('removed from list')
                }
            }


            return property;
        })


        setProperties(tmpProperties);
    }




    let url = '/api/properties/';


    if (landlord_id) {
        url += `?landlord_id=${landlord_id}`
    }


    const getProperties = async () => {
        const tmpProperties = await apiService.get(url);


        setProperties(tmpProperties.data.map((property: PropertyType) => {
            if (tmpProperties.favorites.includes(property.id)) {
                property.is_favorite = true
            } else {
                property.is_favorite = false
            }


            return property
        }));
    };


    useEffect(() => {
        getProperties();
    }, []);


    return (
        <>
            {properties.map((property) => {
                return (
                    <PropertyListItems
                        key={property.id}
                        property={property}
                        markFavorite={(is_favorite: any) => markFavorite(property.id, is_favorite)}
                    />
                )
            })}
        </>
    )
}


export default PropertyLists;
