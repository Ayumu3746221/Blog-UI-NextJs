import { signOut } from "@/auth";

const SignOutButton: React.FC = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
      className="bg-[#D7BC61] text-[#0E1331] py-2 px-4 rounded-md hover:bg-[#D7BC61]/80 transition-colors"
    >
      <button type="submit">Logout</button>
    </form>
  );
};

export default SignOutButton;
