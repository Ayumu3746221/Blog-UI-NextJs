import SignInButton from "@/components/ui/Authentication/SingIn";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0E1331] text-gray-100 flex flex-col justify-center items-center">
      <main className="max-w-md w-full bg-[#0E397B] shadow-xl rounded-lg p-8">
        <h1 className="text-3xl font-bold text-[#A0C8F0] mb-6 text-center">
          Login for administrator
        </h1>
        <div className="mb-6">
          <p className="text-[#D7BC61] font-semibold mb-2">警告：</p>
          <p className="text-sm">
            このページは開発者およびサイト管理者専用です。一般ユーザーの方はログインしないでください。
          </p>
        </div>
        <Link
          href="/"
          className="block text-center text-[#D7BC61] hover:underline mb-6"
        >
          ホームページに戻る
        </Link>
        <SignInButton />
      </main>
    </div>
  );
}
