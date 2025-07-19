"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

interface NavDropdownItem {
    label: string;
    href?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
}

interface NavDropdownProps {
    label: string;
    items: NavDropdownItem[];
    icon?: React.ReactNode;
}

export default function NavDropdown({ label, items, icon }: NavDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div 
            className="relative h-full"
            ref={dropdownRef}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <button 
                className="text-black cursor-pointer font-mono font-medium px-5 h-full items-center flex border-x hover:text-foreground hover:bg-background hover:border hover:border-foreground"
            >
                {icon && <span className="mr-2">{icon}</span>}
                {label}
                <ChevronDown size={14} className="ml-2" />
            </button>

            {/* Dropdown Menu */}
            <div 
                className={`absolute right-0 mt-0 w-48 bg-foreground border border-black transition-all duration-200 ease-in-out ${
                    isOpen 
                        ? "opacity-100 visible translate-y-0" 
                        : "opacity-0 invisible -translate-y-1"
                }`}
            >
                {items.map((item, index) => (
                    item.href ? (
                        <Link
                            key={index}
                            href={item.href}
                            className="text-black font-mono font-medium px-5 py-2 flex items-center hover:text-foreground hover:bg-background hover:border hover:border-foreground border-b border-black last:border-b-0"
                        >
                            {item.icon && <span className="mr-2">{item.icon}</span>}
                            {item.label}
                        </Link>
                    ) : (
                        <button
                            key={index}
                            onClick={item.onClick}
                            className="w-full text-left text-black font-mono font-medium px-5 py-2 flex items-center hover:text-foreground hover:bg-background hover:border hover:border-foreground border-b border-black last:border-b-0"
                        >
                            {item.icon && <span className="mr-2">{item.icon}</span>}
                            {item.label}
                        </button>
                    )
                ))}
            </div>
        </div>
    );
}
