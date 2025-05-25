"use client";

import React from "react";
import { PenBox, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";

const Header = () => {
    return (
        <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
            <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Link href="/">
                    <Image
                        src={"/logo.png"}
                        alt="Welth Logo"
                        width={200}
                        height={60}
                        className="h-12 w-auto object-contain"
                    />
                </Link>

                {/* Navigation Links - Different for signed in/out users */}
                <div className="hidden md:flex items-center space-x-8">
                    <SignedOut>
                        <a href="#features" className="text-gray-600 hover:text-blue-600">
                            Features
                        </a>
                        <a
                            href="#testimonials"
                            className="text-gray-600 hover:text-blue-600"
                        >
                            Testimonials
                        </a>
                    </SignedOut>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-4">
                    <SignedIn>
                        <Link href="/dashboard" passHref legacyBehavior>
                            <a className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 border border-blue-500 rounded-md px-3 py-1 text-sm font-medium">
                                <LayoutDashboard size={18} />
                                <span className="hidden md:inline">Dashboard</span>
                            </a>
                        </Link>
                        <a href="/transaction/create">
                            <button className="flex items-center gap-2 border border-blue-500 rounded-md px-3 py-1 text-sm font-medium">
                                <PenBox size={18} />
                                <span className="hidden md:inline">Add Transaction</span>
                            </button>
                        </a>
                    </SignedIn>
                    <SignedOut>
                        <SignInButton forceRedirectUrl="/dashboard">
                            <button className="border border-blue-500 rounded-md px-3 py-1 text-sm font-medium">
                                Login
                            </button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox: "w-10 h-10",
                                },
                            }}
                        />
                    </SignedIn>
                </div>
            </nav>
        </header>
    );
};

export default Header;
