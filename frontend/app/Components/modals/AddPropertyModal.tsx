'use client';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import Modal from './Modal';
import CustomButton from '../forms/CustomButton';
import Categories from '../addproperty/Categories';
import useAddPropertyModal from '@/app/hooks/AddPropertyModal';
import SelectCountry, { SelectCountryValue } from '../forms/SelectCountry';
import apiService from '@/app/services/apiService';
import { useRouter } from 'next/navigation';
import { getAccessToken } from '@/app/lib/action'; // Adjust the import path as needed


const AddPropertyModal = () => {
    //
    // States


    const [currentStep, setCurrentStep] = useState(1);
    const [errors, setErrors] = useState<string[]>([]);
    const [dataCategory, setDataCategory] = useState('');
    const [dataTitle, setDataTitle] = useState('');
    const [dataDescription, setDataDescription] = useState('');
    const [dataPrice, setDataPrice] = useState('');
    const [dataBedrooms, setDataBedrooms] = useState('');
    const [dataBathrooms, setDataBathrooms] = useState('');
    const [dataGuests, setDataGuests] = useState('');
    const [dataCountry, setDataCountry] = useState<SelectCountryValue>();
    const [dataImage, setDataImage] = useState<File | null>(null);


    //
    //


    const addPropertyModal = useAddPropertyModal();
    const router = useRouter();


    //
    // Set datas


    const setCategory = (category: string) => {
        setDataCategory(category)
    }


    const setImage = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const tmpImage = event.target.files[0];


            setDataImage(tmpImage);
        }
    }


    //
    // SUbmit


   const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('submitForm');
    setErrors([]);

    // Trim and validate required fields
    const trimmedTitle = dataTitle?.trim();
    const trimmedDescription = dataDescription?.trim();

    if (!trimmedTitle || !trimmedDescription || !dataPrice || !dataCategory || !dataCountry || !dataImage) {
        setErrors(['Please fill in all required fields']);
        return;
    }

    try {
        // Create a new FormData instance
        const formData = new FormData();
        
        // Append all fields with proper validation
        formData.append('title', trimmedTitle);
        formData.append('description', trimmedDescription);
        formData.append('price_per_night', dataPrice.toString());
        formData.append('category', dataCategory);
        formData.append('bedrooms', dataBedrooms || '0');
        formData.append('bathrooms', dataBathrooms || '0');
        formData.append('guests', dataGuests || '1');
        formData.append('country', dataCountry.label);
        formData.append('country_code', dataCountry.value);
        formData.append('image', dataImage);

        // Debug: Log the form data being sent
        console.log('FormData entries:');
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        // Make the API call with the proper content type
        const response = await fetch('http://localhost:8000/api/properties/create/', {
            method: 'POST',
            body: formData,
            // Don't set Content-Type header - let the browser set it with the correct boundary
            headers: {
                'Authorization': `Bearer ${await getAccessToken()}` // Make sure to import getAccessToken
            }
        });

        const responseData = await response.json();
        
        if (response.ok) {
            console.log('Property created successfully');
            router.push('/?added=true');
            addPropertyModal.close();
        } else {
            console.error('Error response:', responseData);
            handleApiError({ errors: responseData });
        }
    } catch (error) {
        console.error('Error in submitForm:', error);
        setErrors(['An error occurred while submitting the form. Please try again.']);
    }
}


    //
    //


    const content = (
        <>
            {currentStep == 1 ? (
                <>
                    <h2 className='mb-6 text-2xl'>Choose category</h2>


                    <Categories
                        dataCategory={dataCategory}
                        setCategory={(category) => setCategory(category)}
                    />


                    <CustomButton
                        label='Next'
                        onClick={() => setCurrentStep(2)}
                    />
                </>
            ) : currentStep == 2 ? (
                <>
                    <h2 className='mb-6 text-2xl'>Describe your place</h2>


                    <div className='pt-3 pb-6 space-y-4'>
                        <div className='flex flex-col space-y-2'>
                            <label>Title</label>
                            <input
                                type="text"
                                value={dataTitle}
                                onChange={(e) => setDataTitle(e.target.value)}
                                className='w-full p-4 border border-gray-600 rounded-xl'
                            />
                        </div>


                        <div className='flex flex-col space-y-2'>
                            <label>Description</label>
                            <textarea
                                value={dataDescription}
                                onChange={(e) => setDataDescription(e.target.value)}
                                className='w-full h-[200px] p-4 border border-gray-600 rounded-xl'
                            ></textarea>
                        </div>
                    </div>


                    <CustomButton
                        label='Previous'
                        className='mb-2 bg-black hover:bg-gray-800'
                        onClick={() => setCurrentStep(1)}
                    />


                    <CustomButton
                        label='Next'
                        onClick={() => setCurrentStep(3)}
                    />
                </>
            ) : currentStep == 3 ? (
                <>
                    <h2 className='mb-6 text-2xl'>Details</h2>


                    <div className='pt-3 pb-6 space-y-4'>
                        <div className='flex flex-col space-y-2'>
                            <label>Price per night</label>
                            <input
                                type="number"
                                value={dataPrice}
                                onChange={(e) => setDataPrice(e.target.value)}
                                className='w-full p-4 border border-gray-600 rounded-xl'
                            />
                        </div>


                        <div className='flex flex-col space-y-2'>
                            <label>Bedrooms</label>
                            <input
                                type="number"
                                value={dataBedrooms}
                                onChange={(e) => setDataBedrooms(e.target.value)}
                                className='w-full p-4 border border-gray-600 rounded-xl'
                            />
                        </div>


                        <div className='flex flex-col space-y-2'>
                            <label>Bathrooms</label>
                            <input
                                type="number"
                                value={dataBathrooms}
                                onChange={(e) => setDataBathrooms(e.target.value)}
                                className='w-full p-4 border border-gray-600 rounded-xl'
                            />
                        </div>


                        <div className='flex flex-col space-y-2'>
                            <label>Maximum number of guests</label>
                            <input
                                type="number"
                                value={dataGuests}
                                onChange={(e) => setDataGuests(e.target.value)}
                                className='w-full p-4 border border-gray-600 rounded-xl'
                            />
                        </div>
                    </div>


                    <CustomButton
                        label='Previous'
                        className='mb-2 bg-black hover:bg-gray-800'
                        onClick={() => setCurrentStep(2)}
                    />


                    <CustomButton
                        label='Next'
                        onClick={() => setCurrentStep(4)}
                    />
                </>
            ) : currentStep == 4 ? (
                <>
                    <h2 className='mb-6 text-2xl'>Location</h2>


                    <div className='pt-3 pb-6 space-y-4'>
                        <SelectCountry
                            value={dataCountry}
                            onChange={(value) => setDataCountry(value as SelectCountryValue)}
                        />
                    </div>


                    <CustomButton
                        label='Previous'
                        className='mb-2 bg-black hover:bg-gray-800'
                        onClick={() => setCurrentStep(3)}
                    />


                    <CustomButton
                        label='Next'
                        onClick={() => setCurrentStep(5)}
                    />
                </>
            ) : (
                <>
                    <h2 className='mb-6 text-2xl'>Image</h2>


                    <div className='pt-3 pb-6 space-y-4'>
                        <div className='py-4 px-6 bg-gray-600 text-white rounded-xl'>
                            <input
                                type="file"
                                accept='image/*'
                                onChange={setImage}
                            />
                        </div>


                        {dataImage && (
                            <div className='w-[200px] h-[150px] relative'>
                                <Image
                                    fill
                                    alt="Uploaded image"
                                    src={URL.createObjectURL(dataImage)}
                                    className='w-full h-full object-cover rounded-xl'
                                />
                            </div>
                        )}
                    </div>


                    {errors.map((error, index) => {
                        return (
                            <div
                                key={index}
                                className='p-5 mb-4 bg-airbnb text-white rounded-xl opacity-80'
                            >
                                {error}
                            </div>
                        )
                    })}
                    <CustomButton
                        label='Previous'
                        className='mb-2 bg-black hover:bg-gray-800'
                        onClick={() => setCurrentStep(4)}
                    />


                    <CustomButton
                        label='Submit'
                        onClick={submitForm}
                    />
                </>
            )}
        </>
    )
    return (
        <>
            <Modal
                isOpen={addPropertyModal.isOpen}
                close={addPropertyModal.close}
                label="Add property"
                content={content}
            />
        </>
    )
}


export default AddPropertyModal;
