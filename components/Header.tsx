"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { FormEvent, useRef } from "react";

const Header = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const input = inputRef.current?.value;
    if (!input) return;

    if (input) {
      inputRef.current.value = "";
    }
    try {
      // Call our API to active the Scraper
      // /api/activateScraper
    } catch (error) {
      // Handle any errors
    }
    // Wait for the response to come back
  };
  return (
    <header>
      <form
        className="flex items-center space-x-2 justify-center
      rounded-full py-2 px-4 bg-indigo-100 max-w-md mx-auto"
        onSubmit={handleSearch}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Search..."
          className="flex-1 outline-none bg-transparent
          text-indigo-400 placeholder:text-indigo-300"
        />
        <button hidden>Search</button>
        <MagnifyingGlassIcon className="h-6 w-6 text-indigo-300" />
      </form>
    </header>
  );
};

export default Header;
