"use client";
import { sidebarItems } from "@/app/transactions/CONSTANTS";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../lib/cn";

const Sidebar = () => {
  const pathname = usePathname();
  const isPathActive = (path) => {
    return pathname === path;
  };
  return (
    <section className="bg-grey-900 min-h-screen min-w-48 rounded-e-2xl">
      <h1 className="text-[14px] text-white m-6">Finance</h1>
      <div className="space-y-4">
        {sidebarItems.map((item) => (
          <div key={item.id} className="cursor-pointer max-w-44 ">
            <Link href={item.link} legacyBehavior>
              <div
                className={cn(
                  "pl-4 flex items-center gap-4  group hover:bg-beige-100 transition-all duration-300 ease-in p-2 hover:rounded-e-xl",
                  isPathActive(item.link) ? " bg-beige-100 rounded-e-xl " : ""
                )}
              >
                <item.icon
                  className={cn(
                    "text-grey-300 group-hover:text-customGreen",
                    isPathActive(item.link) && "text-customGreen"
                  )}
                />
                <p
                  className={cn(
                    "text-xs text-grey-300 group-hover:text-black",
                    isPathActive(item.link) && "text-black"
                  )}
                >
                  {item.name}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Sidebar;
