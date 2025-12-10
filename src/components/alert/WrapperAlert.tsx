import { ZAlertDialog, ZAlertDialogProps } from "./ZAlertDialog";

// WarningAlert
export const WarningAlert = (props: Omit<ZAlertDialogProps, "variant">) => (
  <ZAlertDialog {...props} variant="destructive" />
);

// SuccessAlert
export const SuccessAlert = (props: Omit<ZAlertDialogProps, "variant">) => (
  <ZAlertDialog {...props} variant="success" />
);

// InfoAlert
export const InfoAlert = (props: Omit<ZAlertDialogProps, "variant">) => (
  <ZAlertDialog {...props} variant="info" />
);

// ErrorAlert
export const ErrorAlert = (props: Omit<ZAlertDialogProps, "variant">) => (
  <ZAlertDialog {...props} variant="destructive" />
);
