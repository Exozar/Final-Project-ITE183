'use client'
import Modal from "./Modal";
import { useState } from "react";
import useSignupModal from "@/app/hooks/useSignupModal";
import CustomBtn from "../forms/CustomButton";
const SignUpModal = () => {
    const signUpModal = useSignupModal()
    const content = (
        <>
            <form
                className="space-y-4"
            >
                <input placeholder="Your e-mail address" type="email" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />
                <input placeholder="Your password" type="password" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />
                <input placeholder="Repeat password" type="password" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />
                <div
                    className="p-5 bg-airbnb text-white rounded-xl opacity-80"
                >
                    The error message
                </div>
                <CustomBtn
                    label="Submit"
                    onClick={() => { }}
                />
            </form>
        </>
    )
    return (
        <>
            <Modal
                isOpen={signUpModal.isOpen}
                close={signUpModal.close}
                label="Sign Up"
                content={content}
            />
        </>
    )
}
export default SignUpModal;
