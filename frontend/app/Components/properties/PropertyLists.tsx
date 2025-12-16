'use client';
import { useEffect, useState } from 'react';
import PropertyListItems from "./PropertyListItems";
import apiService from '@/app/services/apiService';


export type PropertyType = {
    id: string;
    title: string;
    image_url: string;
    price_per_night: number;
}


const PropertyLists = () => {
    const [properties, setProperties] = useState<PropertyType[]>([]);


    const getProperties = async () => {
        const tmpProperties = await apiService.get('/api/properties/')


        setProperties(tmpProperties.data)
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
                    // markFavorite={(is_favorite: any) => markFavorite(property.id, is_favorite)}
                    />
                )
            })}
        </>
    )
}


export default PropertyLists;
