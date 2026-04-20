"use client";

import { useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

interface ImageUploadProps {
  onUpload: (url: string) => void;
  defaultImage?: string;
  folder?: string;
  label?: string;
}

export default function ImageUpload({ onUpload, defaultImage, folder = "avatars", label = "Upload Image" }: ImageUploadProps) {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(defaultImage || "");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic validation
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.secure_url) {
        setPreview(data.secure_url);
        onUpload(data.secure_url);
        toast.success("Image uploaded successfully");
      } else {
        const errorMsg = data.details || data.error || "Upload failed";
        throw new Error(errorMsg);
      }
    } catch (err: any) {
      console.error("Client-side upload error:", err);
      toast.error(err.message || "Failed to upload image");
    } finally {
      setLoading(false);
    }
  };

  const removeImage = () => {
    setPreview("");
    onUpload("");
  };

  return (
    <div className="space-y-4">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</label>
      
      <div className="relative group">
        {preview ? (
          <div className="relative w-32 h-32 rounded-3xl overflow-hidden border-2 border-emerald-500/10 shadow-lg">
            <Image src={preview} alt="Preview" fill className="object-cover" />
            <button
              onClick={removeImage}
              className="absolute top-2 right-2 p-1.5 bg-white/90 dark:bg-slate-900/90 text-slate-600 dark:text-slate-300 rounded-lg shadow-sm hover:text-red-500 transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <label className="w-32 h-32 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-emerald-500/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-500/5 transition-all text-slate-400 hover:text-emerald-600">
            {loading ? (
              <Loader2 size={24} className="animate-spin" />
            ) : (
              <>
                <Upload size={24} />
                <span className="text-[9px] font-black uppercase tracking-widest">Select File</span>
              </>
            )}
            <input type="file" accept="image/*" onChange={handleUpload} disabled={loading} className="hidden" />
          </label>
        )}
      </div>
    </div>
  );
}
