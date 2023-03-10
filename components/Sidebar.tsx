"use client";
import { db } from "../firebase";
import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/solid";

import { collection, query, orderBy } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import SidebarRow from "./SidebarRow";

const Sidebar = () => {
  const [snapshot, loading, error] = useCollection(
    query(collection(db, "searches"), orderBy("start_eta", "desc"))
  );
  return (
    <div
      className="p-2 md:p-10 py-6 overflow-y-auto
    border-b border-indigo-500/50"
    >
      <div
        className="flex flex-col justify-center items-center
      mb-10"
      >
        <DocumentMagnifyingGlassIcon
          className="h-16 w-16
         text-indigo-600"
        />

        <h1
          className="hidden md:inline text-center text-3xl 
        mt-2 mb-2 font-bold"
        >
          Web Scaper
        </h1>
        <h2 className="hidden md:inline text-center text-xs mt-2 italic">
          Scraping the Unscrapable
        </h2>
      </div>
      <ul className="flex flex-col gap-2 py-2 overflow-x-auto">
        {snapshot?.docs.map((doc) => (
          <SidebarRow key={doc.id} doc={doc} />
        ))}
        {/* SidebarRow */}
        {/* SidebarRow */}
        {/* SidebarRow */}
        {/* SidebarRow */}
      </ul>
    </div>
  );
};

export default Sidebar;
