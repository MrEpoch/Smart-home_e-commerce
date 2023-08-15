'use client';

import { SignUp, LogIn } from "@/lib/actions";
import { useState } from "react";
import Link from "next/link";
import { Alert } from "@mui/material";

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

    async function client_check__register(data: FormData) {
        if (data.get("password")?.toString().trim() !== data.get("confirmPassword")?.toString().trim()) {
            setError("Passwords do not match");
            return false;
        } else if (data.get("password") === null || data.get("confirmPassword") === null) {
            setError("Password cannot be empty");
            return false;
        }

        return await SignUp(data)
    }

    async function client_check__login(data: FormData) {
        switch (data.get("email")?.toString().trim()) {
            case "":
                setError("Email cannot be empty");
                return false;
            case null:
                setError("Email cannot be empty");
                return false;
            default:
                break;
        }

        switch (data.get("password")?.toString().trim()) {
            case "":
                setError("Password cannot be empty");
                return false;
            case null:
                setError("Password cannot be empty");
                return false;
            default:
                break;
        }

        return await LogIn(data)
    }

    return (
        <div className="text-center container text-lg-start d-flex flex-column justify-content-center" style={{ height: "100svh" }}>
            <div className="text-center">
                <h1 className="mt-5" style={{ fontSize: "4rem" }}>{content.header}</h1>
            </div>
            <Alert onClose={() => setError("")} severity="error" className="w-100">{error}</Alert>
            <form action={mode === "signup" ? client_check__register : client_check__login} className="d-flex flex-column justify-content-center align-content-center w-100 pb-4 h-75">
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
