"use client";

import { motion } from "framer-motion";
import { User, ShieldAlert, Zap, Scale } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ChatBubbleProps {
  role: "user" | "skeptic" | "optimist" | "judge";
  content: string;
}

const roleConfig = {
  user: {
    icon: User,
    color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    label: "You",
    align: "self-end",
  },
  skeptic: {
    icon: ShieldAlert,
    color: "bg-red-500/10 text-red-400 border-red-500/20",
    label: "The Skeptic",
    align: "self-start",
  },
  optimist: {
    icon: Zap,
    color: "bg-green-500/10 text-green-400 border-green-500/20",
    label: "The Optimist",
    align: "self-start",
  },
  judge: {
    icon: Scale,
    color: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    label: "The Judge",
    align: "self-center",
  },
};

export function ChatBubble({ role, content }: ChatBubbleProps) {
  const config = roleConfig[role];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "flex flex-col gap-2 max-w-[80%] w-full",
        config.align === "self-end" ? "items-end" : "items-start",
        role === "judge" && "items-center max-w-[90%] mx-auto"
      )}
    >
      <div className={cn("flex items-center gap-2", role === "user" && "flex-row-reverse")}>
        <div className={cn("p-2 rounded-full border backdrop-blur-sm", config.color)}>
          <Icon size={18} />
        </div>
        <span className="text-sm font-medium text-slate-400">{config.label}</span>
      </div>

      <div
        className={cn(
          "px-5 py-4 rounded-2xl border backdrop-blur-md shadow-lg",
          "bg-white/5 border-white/10 text-slate-200",
          role === "user" && "rounded-tr-sm bg-blue-500/10 border-blue-500/20",
          role !== "user" && role !== "judge" && "rounded-tl-sm",
          role === "judge" && "rounded-2xl border-amber-500/20 bg-amber-500/5 text-center"
        )}
      >
        <p className="leading-relaxed whitespace-pre-wrap">{content}</p>
      </div>
    </motion.div>
  );
}
