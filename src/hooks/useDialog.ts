import { useState, useCallback } from "react";

export interface UseDialogOptions {
  defaultOpen?: boolean;
}

export function useDialog({ defaultOpen = false }: UseDialogOptions = {}) {
  const [open, setOpen] = useState<boolean>(defaultOpen);

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);
  const handleToggle = useCallback(() => setOpen((prev) => !prev), []);

  return {
    open,
    handleOpen,
    handleClose,
    handleToggle,
  };
}
