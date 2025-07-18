'use client';

import { KeyboardEvent, useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

interface TagInputProps {
    tags: string[];
    onChange: (tags: string[]) => void;
    maxTags?: number;
    placeholder?: string;
    onFocus?: () => void;
    onBlur?: () => void;
}

export default function TagInput({
    tags,
    onChange,
    maxTags = 4,
    placeholder = "Type and press enter to add a tag",
    onFocus,
    onBlur
}: TagInputProps) {
    const [input, setInput] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && input.trim()) {
            e.preventDefault();
            if (tags.length >= maxTags) {
                return;
            }
            if (!tags.includes(input.trim())) {
                onChange([...tags, input.trim()]);
            }
            setInput('');
        } else if (e.key === 'Backspace' && !input && tags.length > 0) {
            onChange(tags.slice(0, -1));
        }
    };

    const removeTag = (indexToRemove: number) => {
        onChange(tags.filter((_, index) => index !== indexToRemove));
    };

    const handleContainerClick = () => {
        inputRef.current?.focus();
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                onBlur?.();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onBlur]);

    return (
        <div
            ref={containerRef}
            onClick={handleContainerClick}
            className="min-h-[64px] p-4 border border-foreground/30 focus-within:border-foreground/60 cursor-text"
        >
            <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                    <div
                        key={index}
                        className="inline-flex items-center bg-[#202020] hover:bg-foreground/10 transition-colors text-foreground px-3 py-1.5 text-sm font-mono border border-foreground/20"
                    >
                        {tag}
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                removeTag(index);
                            }}
                            className="ml-2 cursor-pointer text-foreground/40 hover:text-foreground transition-colors"
                        >
                            <X size={14} />
                        </button>
                    </div>
                ))}
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={onFocus}
                    placeholder={tags.length < maxTags ? placeholder : ""}
                    className="flex-1 min-w-[200px] bg-transparent text-foreground font-sans placeholder-foreground/40 mt-1 pl-1 focus:outline-none"
                    disabled={tags.length >= maxTags}
                />
            </div>
        </div>
    );
}
