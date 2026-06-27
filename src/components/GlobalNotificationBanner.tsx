import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { X, Sparkles, AlertCircle, CheckCircle, Info, Megaphone } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface Notification {
  id: string;
  message: string;
  type: "info" | "success" | "warning" | "alert" | "promo";
  active: boolean;
  link_text?: string;
  link_url?: string;
  linkText?: string;
  linkUrl?: string;
  created_at?: string;
}

export default function GlobalNotificationBanner() {
  const [notification, setNotification] = useState<Notification | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const client = supabase;
    if (!client) return;

    async function fetchActiveNotification() {
      if (!client) return;
      try {
        const { data, error } = await client
          .from("texly_notifications")
          .select("*")
          .eq("active", true)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching notifications:", error);
          return;
        }

        if (data && data.length > 0) {
          const latest = data[0] as Notification;
          
          // Check if this notification was previously dismissed by the user
          const dismissedId = localStorage.getItem(`texly_dismissed_notification_${latest.id}`);
          if (dismissedId !== latest.id) {
            setNotification(latest);
            setIsVisible(true);
          }
        } else {
          setNotification(null);
          setIsVisible(false);
        }
      } catch (err) {
        console.error("Error in notification fetch flow:", err);
      }
    }

    fetchActiveNotification();

    // Set up a periodic check (every 5 minutes) to update live notifications
    const interval = setInterval(fetchActiveNotification, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleDismiss = () => {
    if (notification) {
      localStorage.setItem(`texly_dismissed_notification_${notification.id}`, notification.id);
    }
    setIsVisible(false);
  };

  if (!notification || !isVisible) return null;

  // Type-specific styles & icons
  const type = notification.type || "info";
  const message = notification.message || "";
  const btnText = notification.link_text || notification.linkText || "";
  const btnUrl = notification.link_url || notification.linkUrl || "";

  let bgClass = "bg-gradient-to-r from-blue-600 to-indigo-600 text-white";
  let icon = <Megaphone className="w-4.5 h-4.5 shrink-0" />;

  switch (type) {
    case "success":
      bgClass = "bg-gradient-to-r from-emerald-600 to-teal-600 text-white";
      icon = <CheckCircle className="w-4.5 h-4.5 shrink-0" />;
      break;
    case "warning":
      bgClass = "bg-gradient-to-r from-amber-500 to-orange-600 text-white";
      icon = <AlertCircle className="w-4.5 h-4.5 shrink-0" />;
      break;
    case "alert":
      bgClass = "bg-gradient-to-r from-rose-600 to-red-700 text-white animate-pulse";
      icon = <AlertCircle className="w-4.5 h-4.5 shrink-0" />;
      break;
    case "promo":
      bgClass = "bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/10";
      icon = <Sparkles className="w-4.5 h-4.5 shrink-0 text-amber-300 animate-bounce" />;
      break;
    default:
      bgClass = "bg-gradient-to-r from-blue-600 to-indigo-600 text-white";
      icon = <Info className="w-4.5 h-4.5 shrink-0" />;
  }

  const isExternal = btnUrl.startsWith("http://") || btnUrl.startsWith("https://");

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`w-full overflow-hidden border-b border-white/10 ${bgClass}`}
        id="global-active-notification-banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-2 flex items-center justify-between gap-4">
          <div className="flex-1 flex items-center justify-center gap-2 sm:gap-3 text-center">
            <span className="hidden sm:inline-block">{icon}</span>
            <p className="text-xs sm:text-sm font-black tracking-wide leading-snug">
              {message}
            </p>
            {btnText && btnUrl && (
              <>
                {isExternal ? (
                  <a
                    href={btnUrl}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="inline-flex items-center gap-1 ml-2 px-3 py-1 bg-white text-slate-900 rounded-full text-[10px] sm:text-xs font-black shadow-sm hover:bg-slate-50 transition-all uppercase tracking-wider shrink-0"
                  >
                    <span>{btnText}</span>
                    <Sparkles className="w-3 h-3 text-violet-500" />
                  </a>
                ) : (
                  <Link
                    to={btnUrl}
                    className="inline-flex items-center gap-1 ml-2 px-3 py-1 bg-white text-slate-900 rounded-full text-[10px] sm:text-xs font-black shadow-sm hover:bg-slate-50 transition-all uppercase tracking-wider shrink-0"
                  >
                    <span>{btnText}</span>
                    <Sparkles className="w-3 h-3 text-violet-500" />
                  </Link>
                )}
              </>
            )}
          </div>
          <button
            onClick={handleDismiss}
            className="p-1.5 hover:bg-white/15 rounded-full text-white/80 hover:text-white transition-colors shrink-0"
            aria-label="Dismiss Announcement"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
