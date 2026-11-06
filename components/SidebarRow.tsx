"use client";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { DocumentData } from "firebase/firestore";
import { useRouter, usePathname } from "next/navigation";
import Spinner from "./Spinner";
type Props = {
  doc: DocumentData;
};
const SidebarRow = ({ doc }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const active = pathname?.includes(doc.id) ?? false;

  return (
    <li
      onClick={() => router.push(`/search/${doc.id}`)}
      className={`flex flex-col md:flex-row gap-2 justify-between p-4 cursor-pointer hover:bg-white
      hover:shadow-md rounded-lg ${active && "bg-white shadow-xl"}`}
    >
      <div className="flex flex-col justify-center">
        <p className="text-xs md:text-base font-bold">{doc.data().search}</p>
        {doc.data().status === "pending" && (
          <p className="text-xs">Scraping information...</p>
        )}
      </div>
      <span className="ml-2 -order-2 md:order-1">
        {doc.data().status === "pending" ? (
          <Spinner />
        ) : (
          <CheckCircleIcon className="h-6 w-6 text-green-500" />
        )}
      </span>
    </li>
  );
};

export default SidebarRow;
