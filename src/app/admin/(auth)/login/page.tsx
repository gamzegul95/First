import Image from "next/image";
import LoginForm from "./LoginForm";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;

  return (
    <div className="w-full max-w-md">
      <div className="flex flex-col items-center text-center">
        <Image
          src="/logo-mark.png"
          alt="Akkaya Hukuk"
          width={56}
          height={86}
          className="h-16 w-auto"
        />
        <h1 className="mt-6 font-display text-2xl font-semibold text-stone-50">
          Yönetim Paneli
        </h1>
        <p className="mt-2 text-sm text-stone-500">
          Devam etmek için giriş yapın.
        </p>
      </div>

      <div className="mt-10 rounded-sm border border-ink-border bg-ink-900/40 p-8">
        <LoginForm redirectTo={from || "/admin"} />
      </div>
    </div>
  );
}
