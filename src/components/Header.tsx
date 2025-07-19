"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { 
    LogIn, 
    LogOut, 
    User, 
    Menu, 
    X, 
    UserCircle, 
    Globe2, 
    Clock, 
    BarChart3, 
    Info, 
    HelpCircle,
    Pencil,
    ChevronDown
} from "lucide-react";
import NavDropdown from "./NavDropdown";

export default function Header() {
    const { user, signOut } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState<'about' | 'explore' | null>(null);

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
                    <NavDropdown
                        label="About"
                        icon={<Info size={14} />}
                        items={[
                            {
                                label: "About Project",
                                href: "/about-project",
                                icon: <Info size={14} />
                            },
                            {
                                label: "How it works",
                                href: "/how-it-works",
                                icon: <HelpCircle size={14} />
                            }
                        ]}
                    />
                    <NavDropdown
                        label="Explore"
                        icon={<Globe2 size={14} />}
                        items={[
                            {
                                label: "Global Map",
                                href: "/explore",
                                icon: <Globe2 size={14} />
                            },
                            {
                                label: "Timeline",
                                href: "/timeline",
                                icon: <Clock size={14} />
                            },
                            {
                                label: "Statistics",
                                href: "/statistics",
                                icon: <BarChart3 size={14} />
                            }
                        ]}
                    />
                    <Link
                        href="/record"
                        className="text-black font-mono font-medium px-5 h-full items-center flex hover:text-foreground hover:bg-background hover:border hover:border-foreground border-x"
                    >
                        <Pencil size={14} className="mr-2" />
                        Record
                    </Link>
                    {user ? (
                        <NavDropdown
                            label={user.username}
                            icon={<User size={14} />}
                            items={[
                                {
                                    label: "Profile",
                                    href: `/u/${user.username}`,
                                    icon: <UserCircle size={14} />
                                },
                                {
                                    label: "Sign out",
                                    onClick: signOut,
                                    icon: <LogOut size={14} />
                                }
                            ]}
                        />
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
                <div className="md:hidden absolute top-[calc(0.5rem+2rem)] left-2 right-2 border border-black bg-neutral-900">
                    <nav className="flex flex-col w-full">
                        {/* About Section */}
                        <button 
                            onClick={() => setActiveSection(activeSection === 'about' ? null : 'about')}
                            className="text-foreground cursor-pointer font-mono font-medium px-5 py-3 flex items-center justify-between border-b border-neutral-700 hover:bg-neutral-800"
                        >
                            <span className="flex items-center">
                                <Info size={14} className="mr-2" />
                                About
                            </span>
                            <ChevronDown 
                                size={14} 
                                className={`transition-transform duration-200 ${activeSection === 'about' ? 'rotate-180' : ''}`}
                            />
                        </button>
                        {activeSection === 'about' && (
                            <>
                                <Link
                                    href="/about-project"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-foreground font-mono font-medium px-8 py-3 flex items-center bg-neutral-800 border-b border-neutral-700 hover:bg-neutral-700"
                                >
                                    <Info size={14} className="mr-2" />
                                    About Project
                                </Link>
                                <Link
                                    href="/how-it-works"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-foreground font-mono font-medium px-8 py-3 flex items-center bg-neutral-800 border-b border-neutral-700 hover:bg-neutral-700"
                                >
                                    <HelpCircle size={14} className="mr-2" />
                                    How it works
                                </Link>
                            </>
                        )}

                        {/* Explore Section */}
                        <button 
                            onClick={() => setActiveSection(activeSection === 'explore' ? null : 'explore')}
                            className="text-foreground cursor-pointer font-mono font-medium px-5 py-3 flex items-center justify-between border-b border-neutral-700 hover:bg-neutral-800"
                        >
                            <span className="flex items-center">
                                <Globe2 size={14} className="mr-2" />
                                Explore
                            </span>
                            <ChevronDown 
                                size={14} 
                                className={`transition-transform duration-200 ${activeSection === 'explore' ? 'rotate-180' : ''}`}
                            />
                        </button>
                        {activeSection === 'explore' && (
                            <>
                                <Link
                                    href="/explore"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-foreground font-mono font-medium px-8 py-3 flex items-center bg-neutral-800 border-b border-neutral-700 hover:bg-neutral-700"
                                >
                                    <Globe2 size={14} className="mr-2" />
                                    Global Map
                                </Link>
                                <Link
                                    href="/timeline"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-foreground font-mono font-medium px-8 py-3 flex items-center bg-neutral-800 border-b border-neutral-700 hover:bg-neutral-700"
                                >
                                    <Clock size={14} className="mr-2" />
                                    Timeline
                                </Link>
                                <Link
                                    href="/statistics"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-foreground font-mono font-medium px-8 py-3 flex items-center bg-neutral-800 border-b border-neutral-700 hover:bg-neutral-700"
                                >
                                    <BarChart3 size={14} className="mr-2" />
                                    Statistics
                                </Link>
                            </>
                        )}

                        {/* Record Section */}
                        <Link
                            href="/record"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-foreground font-mono font-medium px-5 py-3 flex items-center border-b border-neutral-700 hover:bg-neutral-800"
                        >
                            <Pencil size={14} className="mr-2" />
                            Record
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
