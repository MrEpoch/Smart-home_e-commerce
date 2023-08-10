'use client';

import { useRouter } from "next/navigation";
import { SignUp, LogIn } from "@/lib/actions";
import { useCallback, useState } from "react";
import Link from "next/link";

const signup_content = {
    linkurl: "/login",
    linkText: "Already have account?",
    header: "Create a new account",
    subHeader: "Just few things to get started",
    buttonText: "Sign Up"
}

const login_content = {
    linkurl: "/signup",
    linkText: "Don't have account?",
    header: "Welcome back",
    subHeader: "Enter credentials to access your account",
    buttonText: "Log In"
}


export default function AuthForm({ mode }: { mode: "login" | "signup" } ) {
    const content = mode === "signup" ? signup_content : login_content; 

    const [error, setError] = useState("");

    return (
        <div className="text-center container text-lg-start">
            <div className="text-center">
                    <h1 className="mb-2">{content.header}</h1>
            </div>
            <form action={mode === "signup" ? SignUp : LogIn} className="mt-5 w-100 py-10">
                {mode === "signup" && (
                    <div className="mb-8 d-flex justify-content-between">
                        <label htmlFor="firstName">
                            <p>First Name</p>
                            <input type="text" name="firstName" id="firstName" className="w-100" />
                        </label>
                        <label htmlFor="lastName">
                            <p>Last Name</p>
                            <input type="text" name="lastName" id="lastName" className="w-100" />
                        </label>
                    </div>
                )}
                <div className="mb-8">
                    <label htmlFor="email">
                        <p>Email</p>
                        <input type="email" name="email" id="email" className="w-100" />
                    </label>
                    <label htmlFor="password">
                        <p>Password</p>
                        <input type="password" name="password" id="password" className="w-100" />
                    </label>
                    {mode === "signup" && (
                        <label htmlFor="confirm password">
                            <p>Confirm Password</p>
                            <input type="password" name="password" id="password" className="w-100" />
                        </label>
                    )}
                </div>
                <div className="mb-8">
                    <button type="submit" className="btn btn-primary w-100">{content.buttonText}</button>
                </div>
            </form>
            <div className="mb-8">
                <Link href={content.linkurl}>{content.linkText}</Link> 
            </div>
        </div>
    )
}
