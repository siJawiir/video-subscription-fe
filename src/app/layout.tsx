import { Toaster } from "sonner";
import ClientLayout from "./client-layout";
import "./globals.css";

export const metadata = {
  title: "PILEM",
  description:
    "Semua film terbaik ada di PILEM. Nikmati streaming film berkualitas tinggi kapan saja, di mana saja.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
