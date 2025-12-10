"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { FieldError } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Upload, X, Maximize, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ZImageInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string | FieldError;
  required?: boolean;
  previewHeight?: number;
  loading?: boolean;
  onUpload?: (url: string) => void;
  onChangeFile?: (file: File) => void;
  file?: File | null;
  existedFileUrl?: string | null;
}

interface PreviewProps {
  src: string;
  previewHeight: number;
  error?: string;
  loading?: boolean;
  onRemove: (e?: React.MouseEvent) => void;
}

const Preview: React.FC<PreviewProps> = ({
  src,
  previewHeight,
  error,
  loading,
  onRemove,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div
      className={cn(
        "relative rounded-xl overflow-hidden border bg-gray-50 group",
        error && "border-red-500"
      )}
      style={{ height: previewHeight }}
    >
      <Image src={src} alt="Preview" fill className="object-cover transition" />

      <button
        type="button"
        onClick={onRemove}
        className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white p-1.5 rounded-full cursor-pointer"
      >
        <X size={14} />
      </button>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <button className="absolute bottom-2 right-2 bg-white/80 backdrop-blur hover:bg-white text-gray-800 p-1.5 rounded-full shadow-md cursor-pointer">
            <Maximize size={16} />
          </button>
        </DialogTrigger>

        <DialogContent className="max-w-3xl p-0 overflow-hidden">
          <DialogTitle>
            <p className="text-lg font-semibold px-2 pt-1">Preview</p>
          </DialogTitle>
          <div className="relative w-full h-[70vh]">
            <Image
              src={src}
              alt="Preview Zoomed"
              fill
              className="object-contain bg-black"
            />
          </div>
        </DialogContent>
      </Dialog>

      {loading && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="flex items-center gap-2 text-white">
            <Loader2 className="animate-spin" size={20} />
            <span className="text-sm">Mengunggah...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export const ZImageInput = React.forwardRef<HTMLInputElement, ZImageInputProps>(
  (
    {
      label,
      error,
      required,
      previewHeight = 160,
      className,
      onChange,
      loading = false,
      onUpload,
      file: controlledFile,
      existedFileUrl,
      onChangeFile,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isExistedFileDeleted, setIsExistedFileDeleted] = useState(false);

    const errorMessage = typeof error === "string" ? error : error?.message;

    const base64FileUrl =
      existedFileUrl && !isExistedFileDeleted ? `${existedFileUrl}` : null;

    const controlledFilePreview = useMemo(() => {
      if (!controlledFile) return null;
      return URL.createObjectURL(controlledFile);
    }, [controlledFile]);

    useEffect(() => {
      return () => {
        if (controlledFilePreview) URL.revokeObjectURL(controlledFilePreview);
      };
    }, [controlledFilePreview]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const url = URL.createObjectURL(file);
        setPreview(url);
        onUpload?.(url);
        onChangeFile?.(file);
      } else {
        setPreview(null);
      }
      onChange?.(e);
    };

    const removeImage = (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setPreview(null);
      setIsExistedFileDeleted(true);
      if (inputRef.current) inputRef.current.value = "";
    };

    const activePreview = base64FileUrl || preview || controlledFilePreview;

    return (
      <div className={cn("flex flex-col w-full", className)}>
        {label && (
          <label className="mb-1 text-sm font-medium select-none flex items-center gap-1">
            {label}
            {required && <span className="text-red-500">*</span>}
          </label>
        )}

        {activePreview ? (
          <Preview
            src={activePreview}
            previewHeight={previewHeight}
            error={errorMessage}
            loading={loading}
            onRemove={removeImage}
          />
        ) : (
          <label
            className={cn(
              "border border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition p-6 text-gray-600",
              errorMessage && "border-red-500"
            )}
            style={{ height: previewHeight }}
          >
            <Upload size={28} className="opacity-70" />
            <span className="text-sm mt-2">Upload gambar</span>
            <span className="text-xs text-gray-400">PNG, JPG, JPEG</span>

            <input
              ref={(node) => {
                inputRef.current = node;
                if (typeof ref === "function") ref(node);
                else if (ref)
                  (ref as React.RefObject<HTMLInputElement | null>).current =
                    node;
              }}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              {...props}
            />
          </label>
        )}

        {errorMessage && (
          <p className="mt-1 text-xs text-red-500">{errorMessage}</p>
        )}
      </div>
    );
  }
);

ZImageInput.displayName = "ZImageInput";
