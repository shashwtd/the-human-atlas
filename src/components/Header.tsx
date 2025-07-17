"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { LogIn, LogOut, User, Menu, X } from "lucide-react";

export default function Header() {
    const { user, signOut } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="fixed w-screen h-max px-2 py-2 bg-neutral-900 z-50">
            <div className="w-full bg-foreground max-w-7xl mx-auto flex flex-row justify-between items-center border border-black h-8">
                {/* Logo - Always visible */}
                <Link
                    href="/"
                    className="font-mono font-semibold px-4 text-black border-r h-full flex items-center hover:text-foreground hover:bg-background hover:border hover:border-foreground truncate"
                >
                    <span className="hidden sm:inline">
                        THE HUMAN ATLAS — A LIBRARY OF EMOTIONS
                    </span>
                    <span className="sm:hidden">THE HUMAN ATLAS</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center h-full">
                    <Link
                        href="/about-project"
                        className="text-black font-mono font-medium px-5 h-full items-center flex hover:text-foreground hover:bg-background hover:border hover:border-foreground border-x"
                    >
                        About Project
                    </Link>
                    <Link
                        href="/how-it-works"
                        className="text-black font-mono font-medium px-5 h-full items-center flex hover:text-foreground hover:bg-background hover:border hover:border-foreground border-x"
                    >
                        How it works
                    </Link>
                    {user ? (
                        <div className="flex items-center h-full">
                            <span className="text-black font-mono font-medium px-5 h-full items-center flex border-x">
                                <User size={14} className="mr-2" />
                                {user.username}
                            </span>
                            <button
                                onClick={signOut}
                                className="text-black cursor-pointer font-mono font-medium px-5 h-full items-center flex hover:text-foreground hover:bg-background hover:border hover:border-foreground"
                            >
                                <LogOut size={14} className="mr-2" />
                                Sign out
                            </button>
                        </div>
                    ) : (
                        <Link
                            href="/auth"
                            className="text-black font-mono font-medium px-5 h-full items-center flex hover:text-foreground hover:bg-background hover:border hover:border-foreground border-l"
                        >
                            <LogIn size={14} className="mr-2" />
                            Sign in
                        </Link>
                    )}
                </nav>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden h-full px-4 border-l border-black flex items-center text-black hover:text-foreground hover:bg-background hover:border hover:border-foreground"
                >
                    {isMobileMenuOpen ? <X size={14} /> : <Menu size={14} />}
                </button>
            </div>

            {/* Mobile Navigation Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-[calc(0.5rem+2rem)] left-2 right-2 border border-[var(--border-primary)] bg-foreground">
                    <nav className="flex flex-col w-full">
                        <Link
                            href="/about-project"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-black font-mono font-medium px-5 py-3 flex items-center hover:text-foreground hover:bg-background hover:border hover:border-foreground border-b border-black"
                        >
                            About Project
                        </Link>
                        <Link
                            href="/how-it-works"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-black font-mono font-medium px-5 py-3 flex items-center hover:text-foreground hover:bg-background hover:border hover:border-foreground border-b border-black"
                        >
                            How it works
                        </Link>
                        {user ? (
                            <>
                                <div className="text-black font-mono font-medium px-5 py-3 flex items-center border-b border-black">
                                    <User size={14} className="mr-2" />
                                    {user.username}
                                </div>
                                <button
                                    onClick={() => {
                                        signOut();
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="text-black font-mono font-medium px-5 py-3 flex items-center hover:text-foreground hover:bg-background hover:border hover:border-foreground"
                                >
                                    <LogOut size={14} className="mr-2" />
                                    Sign out
                                </button>
                            </>
                        ) : (
                            <Link
                                href="/auth"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-black font-mono font-medium px-5 py-3 flex items-center hover:text-foreground hover:bg-background hover:border hover:border-foreground"
                            >
                                <LogIn size={14} className="mr-2" />
                                Sign in
                            </Link>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
}
