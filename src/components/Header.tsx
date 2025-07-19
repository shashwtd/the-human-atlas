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
    Pencil,
    ChevronDown,
    BookOpen,
    FileText,
    Zap
} from "lucide-react";
import NavDropdown from "./NavDropdown";

export default function Header() {
    const { user, signOut } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState<'about' | 'explore' | 'profile' | null>(null);

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
                        icon={<BookOpen size={14} />}
                        items={[
                            {
                                label: "About Project",
                                href: "/about-project",
                                icon: <FileText size={14} />
                            },
                            {
                                label: "How it works",
                                href: "/how-it-works",
                                icon: <Zap size={14} />
                            }
                        ]}
                    />
                    {/* Temporarily disabled dropdown until we have more content
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
                    */}
                    <Link
                        href="/explore"
                        className="text-black font-mono font-medium px-5 h-full items-center flex hover:text-foreground hover:bg-background hover:border hover:border-foreground border-x"
                    >
                        <Globe2 size={14} className="mr-2" />
                        Explore
                    </Link>
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
                <div className="md:hidden absolute top-[calc(0.5rem+2rem)] left-2 right-2">
                    <nav className="flex flex-col w-full bg-foreground border border-black">
                        {/* Main Navigation */}
                        <Link
                            href="/record"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-black font-mono font-medium px-5 py-3 flex items-center border-b border-black hover:text-foreground hover:bg-background hover:border hover:border-foreground"
                        >
                            <Pencil size={14} className="mr-2" />
                            Record
                        </Link>

                        {/* About Section */}
                        <button 
                            onClick={() => setActiveSection(activeSection === 'about' ? null : 'about')}
                            className="text-black cursor-pointer font-mono font-medium px-5 py-3 flex items-center justify-between border-b border-black hover:text-foreground hover:bg-background hover:border hover:border-foreground"
                        >
                            <span className="flex items-center">
                                <BookOpen size={14} className="mr-2" />
                                About
                            </span>
                            <ChevronDown 
                                size={14} 
                                className={`transition-transform duration-200 ${activeSection === 'about' ? 'rotate-180' : ''}`}
                            />
                        </button>
                        {activeSection === 'about' && (
                            <div className="bg-foreground border-b border-black">
                                <Link
                                    href="/about-project"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-black font-mono font-medium pl-10 pr-5 py-3 flex items-center border-b border-black hover:text-foreground hover:bg-background hover:border hover:border-foreground"
                                >
                                    <FileText size={14} className="mr-2" />
                                    About Project
                                </Link>
                                <Link
                                    href="/how-it-works"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-black font-mono font-medium pl-10 pr-5 py-3 flex items-center hover:text-foreground hover:bg-background hover:border hover:border-foreground"
                                >
                                    <Zap size={14} className="mr-2" />
                                    How it works
                                </Link>
                            </div>
                        )}

                        {/* Explore Section */}
                        <button 
                            onClick={() => setActiveSection(activeSection === 'explore' ? null : 'explore')}
                            className="text-black cursor-pointer font-mono font-medium px-5 py-3 flex items-center justify-between border-b border-black hover:text-foreground hover:bg-background hover:border hover:border-foreground"
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
                            <div className="bg-foreground border-b border-black">
                                <Link
                                    href="/explore"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-black font-mono font-medium pl-10 pr-5 py-3 flex items-center border-b border-black hover:text-foreground hover:bg-background hover:border hover:border-foreground"
                                >
                                    <Globe2 size={14} className="mr-2" />
                                    Global Map
                                </Link>
                                <Link
                                    href="/timeline"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-black font-mono font-medium pl-10 pr-5 py-3 flex items-center border-b border-black hover:text-foreground hover:bg-background hover:border hover:border-foreground"
                                >
                                    <Clock size={14} className="mr-2" />
                                    Timeline
                                </Link>
                                <Link
                                    href="/statistics"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-black font-mono font-medium pl-10 pr-5 py-3 flex items-center hover:text-foreground hover:bg-background hover:border hover:border-foreground"
                                >
                                    <BarChart3 size={14} className="mr-2" />
                                    Statistics
                                </Link>
                            </div>
                        )}

                        {/* User Section */}
                        {user ? (
                            <>
                                <button 
                                    onClick={() => setActiveSection(activeSection === 'profile' ? null : 'profile')}
                                    className="text-black cursor-pointer font-mono font-medium px-5 py-3 flex items-center justify-between border-b border-black hover:text-foreground hover:bg-background hover:border hover:border-foreground"
                                >
                                    <span className="flex items-center">
                                        <User size={14} className="mr-2" />
                                        {user.username}
                                    </span>
                                    <ChevronDown 
                                        size={14} 
                                        className={`transition-transform duration-200 ${activeSection === 'profile' ? 'rotate-180' : ''}`}
                                    />
                                </button>
                                {activeSection === 'profile' && (
                                    <div className="bg-foreground">
                                        <Link
                                            href={`/u/${user.username}`}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="text-black font-mono font-medium pl-8 pr-5 py-3 flex items-center border-b border-black hover:text-foreground hover:bg-background hover:border hover:border-foreground"
                                        >
                                            Profile
                                        </Link>
                                        <button
                                            onClick={() => {
                                                setIsMobileMenuOpen(false);
                                                signOut();
                                            }}
                                            className="w-full text-black font-mono font-medium pl-8 pr-5 py-3 flex items-center hover:text-foreground hover:bg-background hover:border hover:border-foreground"
                                        >
                                            Sign out
                                        </button>
                                    </div>
                                )}
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
