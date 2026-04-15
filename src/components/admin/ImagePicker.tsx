"use client";

import { useState } from "react";
import { Upload, Check, X } from "lucide-react";

const STOCK_IMAGES = [
  // Xhamia & Islame
  "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=1200&q=80",
  "https://images.unsplash.com/photo-1519817650390-64a93db51149?w=1200&q=80",
  "https://images.unsplash.com/photo-1585036156171-384164a8c159?w=1200&q=80",
  "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1200&q=80",
  "https://images.unsplash.com/photo-1545396085-c51428244cd8?w=1200&q=80",
  "https://images.unsplash.com/photo-1604848698030-c434ba08ece1?w=1200&q=80",
  "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=1200&q=80",
  "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=1200&q=80",
  "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1200&q=80",
  "https://images.unsplash.com/photo-1597732868829-4ec0f42cb1ec?w=1200&q=80",
  "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1200&q=80",
  "https://images.unsplash.com/photo-1573126617899-41f1dffb196c?w=1200&q=80",
  // Libra & Edukim
  "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&q=80",
  "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&q=80",
  "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=1200&q=80",
  "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80",
  "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1200&q=80",
  "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1200&q=80",
  "https://images.unsplash.com/photo-1550399105-c4db5fb85c18?w=1200&q=80",
  "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=1200&q=80",
  "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=1200&q=80",
  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&q=80",
  "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?w=1200&q=80",
  // Shkrim & Pene
  "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&q=80",
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=80",
  "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=1200&q=80",
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&q=80",
  // Natyre & Peizazh
  "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=1200&q=80",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&q=80",
  "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=1200&q=80",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=80",
  "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=1200&q=80",
  "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=1200&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
  "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=1200&q=80",
  // Qiell & Abstrakte
  "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=1200&q=80",
  "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1200&q=80",
  "https://images.unsplash.com/photo-1464802686167-b939a6910659?w=1200&q=80",
  "https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?w=1200&q=80",
  // Familje & Njerez
  "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200&q=80",
  "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200&q=80",
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80",
  // Rruge & Udhetim
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80",
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80",
  "https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=1200&q=80",
  // Drite & Shprese
  "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=1200&q=80",
  "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=1200&q=80",
];

interface ImagePickerProps {
  value: string;
  onChange: (url: string) => void;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ImagePicker({
  value,
  onChange,
  onUpload,
}: ImagePickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">Foto kryesore</label>

      {value && (
        <div className="relative mb-2">
          <img
            src={value}
            alt=""
            className="w-full h-36 object-cover rounded-lg border border-border"
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 p-1 bg-white/90 rounded-full shadow-sm hover:bg-white transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      )}

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="text-sm text-accent hover:text-accent/80 font-medium transition-colors"
        >
          {open ? "Mbyll galerinë" : "Zgjidh nga galeria"}
        </button>
        <span className="text-secondary text-xs">ose</span>
        <label className="text-sm text-secondary hover:text-primary cursor-pointer transition-colors">
          <span className="inline-flex items-center gap-1">
            <Upload size={13} />
            Ngarko foto
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={onUpload}
            className="hidden"
          />
        </label>
      </div>

      {open && (
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5 mt-3 p-3 bg-layout-bg rounded-lg border border-border max-h-[320px] overflow-y-auto">
          {STOCK_IMAGES.map((url) => (
            <button
              key={url}
              type="button"
              onClick={() => {
                onChange(url);
                setOpen(false);
              }}
              className={`relative aspect-[16/10] rounded-md overflow-hidden border-2 transition-all hover:opacity-90 ${
                value === url
                  ? "border-accent ring-2 ring-accent/20"
                  : "border-transparent"
              }`}
            >
              <img
                src={url.replace("w=1200", "w=150")}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {value === url && (
                <div className="absolute inset-0 bg-accent/20 flex items-center justify-center">
                  <Check size={16} className="text-white drop-shadow" />
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
