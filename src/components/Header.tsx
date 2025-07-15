import React from "react";
import Link from "next/link";

export default function Header() {
    return (
        <header className="fixed w-screen h-max px-2 py-2 bg-neutral-900">
            <div className="w-full bg-foreground max-w-7xl mx-auto flex flex-row justify-between items-center border border-black h-8">
                <Link
                    href="/"
                    className="font-mono font-semibold px-4 text-black border-r h-full flex items-center hover:text-foreground hover:bg-background hover:border hover:border-foreground"
                >
                    THE HUMAN ATLAS — A LIBRARY OF EMOTIONS
                </Link>
                <nav className="flex items-center h-full border-l">
                    <Link
                        href="/demo"
                        className="text-black font-mono font-medium px-5 h-full items-center flex hover:text-foreground hover:bg-background hover:border hover:border-foreground border-x"
                    >
                        About Project
                    </Link>
                    <Link
                        href="/how-it-works"
                        className="text-black font-mono font-medium px-5 h-full items-center flex hover:text-foreground hover:bg-background hover:border hover:border-foreground"
                    >
                        How it works
                    </Link>
                </nav>
            </div>
        </header>
    );
}
