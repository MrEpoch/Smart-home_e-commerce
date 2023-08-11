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
        <div className="text-center container text-lg-start d-flex flex-column justify-content-center" style={{ height: "100svh" }}>
            <div className="text-center">
                <h1 className="mt-5" style={{ fontSize: "4rem" }}>{content.header}</h1>
            </div>
            <form action={mode === "signup" ? SignUp : LogIn} className="d-flex flex-column justify-content-center align-content-center w-100 pb-4 h-75">
                {mode === "signup" && (
                    <div className="mb-8 d-flex justify-content-between">
                        <div className="form-group mb-5">
                            <label htmlFor="FirstName">First Name</label>
                            <input type="text" name="firstName" id="firstName" className="form-control" />
                        </div>
                        <div className="form-group mb-5">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" name="lastName" id="lastName" className="form-control" />
                        </div>
                    </div>
                )}
                <div className="mb-8">
                    <div className="form-group mb-5">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" className="form-control" />
                    </div>
                    <div className="form-group mb-5">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" className="form-control" />
                    </div>
                    {mode === "signup" && (
                        <div className="form-group mb-5">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input type="password" name="password" id="password" className="form-control" />
                        </div>
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
