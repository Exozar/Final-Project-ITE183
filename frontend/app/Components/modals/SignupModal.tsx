'use client'
import Modal from "./Modal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useSignupModal from "@/app/hooks/useSignupModal";
import CustomBtn from "../forms/CustomButton";
import apiService from "@/app/services/apiService";

function setCookie(name: string, value: string, maxAgeSeconds: number) {
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}`;
}

const SignUpModal = () => {

    //
    // Variables

    const router = useRouter();
    const signupModal = useSignupModal();
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [errors, setErrors] = useState<string[]>([]);

    //
    // Submit functionality
    const submitSignup = async (e?: React.FormEvent) => {
        e?.preventDefault?.(); // Prevent default form submission
        setErrors([]); // Clear previous errors

        const formData = {
            email: email,
            password1: password1,
            password2: password2
        };

        try {
            const response = await apiService.postWithoutToken('/api/auth/register/', formData);

            if (response.access) {
                setCookie('session_userid', response.user.pk, 60 * 60 * 24 * 7);
                setCookie('session_access_token', response.access, 60 * 60);
                if (response.refresh) {
                    setCookie('session_refresh_token', response.refresh, 60 * 60 * 24 * 7);
                }
                signupModal.close();
                router.push('/');
                router.refresh();
            }
        } catch (error: any) {
            console.error('Signup error:', error);
            if (error.non_field_errors) {
                setErrors(Array.isArray(error.non_field_errors) ? error.non_field_errors : [error.non_field_errors]);
            } else {
                // Handle other types of errors
                const errorMessages = [];
                for (const key in error) {
                    if (Array.isArray(error[key])) {
                        errorMessages.push(...error[key]);
                    } else {
                        errorMessages.push(error[key]);
                    }
                }
                setErrors(errorMessages.length > 0 ? errorMessages : ['An error occurred during signup']);
            }
        }
    }

    const content = (
        <>
            <form
                onSubmit={submitSignup}
                className="space-y-4"
            >
                <input onChange={(e) => setEmail(e.target.value)} placeholder="Your e-mail address" type="email" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />

                <input onChange={(e) => setPassword1(e.target.value)} placeholder="Your password" type="password" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />

                <input onChange={(e) => setPassword2(e.target.value)} placeholder="Repeat password" type="password" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />

                {errors.map((error, index) => {
                    return (
                        <div
                            key={`error_${index}`}
                            className="p-5 bg-airbnb text-white rounded-xl opacity-80"
                        >
                            {error}
                        </div>
                    )
                })}

                <CustomBtn
                    label="Submit"
                    onClick={() => submitSignup()}
                />
            </form>
        </>
    )
    return (
        <>
            <Modal
                isOpen={signupModal.isOpen}
                close={signupModal.close}
                label="Sign Up"
                content={content}
            />
        </>
    )
}

export default SignUpModal;
