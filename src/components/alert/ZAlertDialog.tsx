"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import ZButton from "@/components/buttons/ZButton";

export type AlertDialogVariant =
  | "default"
  | "destructive"
  | "success"
  | "warning"
  | "info";

export interface ZAlertDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: string;
  subtitle?: string;
  onCancel?: () => void;
  onAgree?: () => void;
  agreeLabel?: string;
  cancelLabel?: string;
  variant?: AlertDialogVariant;
}

export function ZAlertDialog({
  open,
  onOpenChange,
  title,
  subtitle,
  onCancel,
  onAgree,
  agreeLabel = "Setuju",
  cancelLabel = "Batal",
  variant = "default",
}: ZAlertDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {subtitle && (
            <AlertDialogDescription>{subtitle}</AlertDialogDescription>
          )}
        </AlertDialogHeader>

        {(onCancel || onAgree) && (
          <AlertDialogFooter className="space-x-2">
            {onCancel && (
              <ZButton variant="outline" onClick={onCancel}>
                {cancelLabel}
              </ZButton>
            )}
            {onAgree && (
              <ZButton variant={variant} onClick={onAgree}>
                {agreeLabel}
              </ZButton>
            )}
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
