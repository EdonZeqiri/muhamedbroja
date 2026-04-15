"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

interface PreviewModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function PreviewModal({ open, onClose, children }: PreviewModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl mx-4 mt-8 mb-8 max-h-[calc(100vh-4rem)] overflow-y-auto bg-[#faf9f6] rounded-2xl shadow-2xl">
        {/* Top bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-3 bg-white/90 backdrop-blur-sm border-b border-border rounded-t-2xl">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <span className="ml-3 text-xs text-secondary">
              Parashikim &mdash; si duket në faqe
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-layout-bg text-secondary hover:text-primary transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">{children}</div>
      </div>
    </div>
  );
}
