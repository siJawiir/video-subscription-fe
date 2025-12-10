import RegisterForm from "./RegisterForm";

export const metadata = {
  title: "Register | PILEM",
  description:
    "Semua film terbaik ada di PILEM. Nikmati streaming film berkualitas tinggi kapan saja, di mana saja.",
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-radial at-center from-red-900/60 via-black/90 to-black pointer-events-none" />

      <div className="absolute inset-0 bg-linear-to-b from-red-950/70 to-black/90 pointer-events-none" />

      <div className="w-full max-w-md relative rounded-3xl bg-black/60 border border-red-900/40 shadow-[0_0_40px_-10px_rgba(255,0,0,0.5)] backdrop-blur-md p-8 text-gray-200">
        <div className="mb-10 flex flex-col items-center space-y-2">
          <h1 className="text-4xl font-extrabold tracking-widest text-red-500 drop-shadow-[0_3px_6px_rgba(255,0,0,0.4)]">
            PILEM
          </h1>
          <div className="w-40 h-1 bg-red-700 shadow-[0_0_10px_rgba(255,0,0,0.6)]" />
          <p className="text-sm text-red-300/80 tracking-widest">
            Create your account and start your movie journey.
          </p>
        </div>

        <RegisterForm />
      </div>
    </div>
  );
}
