'use client'

import { DashboardCard } from "@/components/DashboardCard";
import MapBox from "@/components/Map";
import { useUserDetails } from "@/hooks/auth";
import { ShoppingCartIcon, UsersIcon } from "@heroicons/react/24/outline";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

export default function page() {

  const { user } = useUserDetails();

  return (
    <main className="grid grid-cols-[7fr_3fr] -mt-5">
      <div className="flex flex-1 items-center justify-center">
        <MapBox />
      </div>
      <div className="flex flex-col space-y-5">
        <DashboardCard
          icon={ShoppingCartIcon}
          badgeValue={33.3}
          mainValue={4.5210}
          label={"Total Items"}
          trend={"up"}
        />

        <DashboardCard
          icon={ShoppingCartIcon}
          badgeValue={2}
          mainValue={45.234}
          label={"Total Orders"}
          trend={"down"}
        />

        <DashboardCard
          icon={UsersIcon}
          badgeValue={20}
          mainValue={4521.10}
          label={"Total Users"}
          trend={"up"}
        />

        <DashboardCard
          icon={UsersIcon}
          badgeValue={200}
          mainValue={452}
          label={"Total Restaurants"}
          trend={"down"}
        />
      </div>
    </main>
  );
}
