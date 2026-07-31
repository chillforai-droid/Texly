import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

interface BannerAd {
  id: string;
  title: string;
  image_url: string;
  target_url: string;
  active: boolean;
  position: "top" | "bottom" | "sidebar";
  created_at?: string;
}

interface BannerAdDisplayProps {
  position: "top" | "bottom" | "sidebar";
  className?: string;
}

export default function BannerAdDisplay({ position, className = "" }: BannerAdDisplayProps) {
  const [ads, setAds] = useState<BannerAd[]>([]);

  useEffect(() => {
    const client = supabase;
    if (!client) return;

    let isMounted = true;

    async function fetchActiveAds() {
      if (!client) return;
      try {
        const { data, error } = await client
          .from("banner_ads")
          .select("*")
          .eq("active", true)
          .eq("position", position)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching banner ads:", error);
          return;
        }

        if (isMounted) {
          setAds((data as BannerAd[]) || []);
        }
      } catch (err) {
        console.error("Error in banner ad fetch flow:", err);
      }
    }

    fetchActiveAds();

    // Re-check periodically so newly "live" ads show up without a hard refresh
    const interval = setInterval(fetchActiveAds, 5 * 60 * 1000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [position]);

  if (ads.length === 0) return null;

  return (
    <div
      className={`w-full flex flex-col gap-4 ${position === "sidebar" ? "max-w-xs" : ""} ${className}`}
    >
      {ads.map((ad) => (
        <a
          key={ad.id}
          href={ad.target_url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="block w-full overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-all hover:scale-[1.005] active:scale-[0.995]"
        >
          <img
            src={ad.image_url}
            alt={ad.title}
            className="w-full h-auto object-cover"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
        </a>
      ))}
    </div>
  );
}
