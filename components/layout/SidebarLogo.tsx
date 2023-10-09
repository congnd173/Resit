import { useRouter } from "next/router";
import { GiPenguin } from "react-icons/gi";

const SidebarLogo = () => {
  const router = useRouter();
  return (
    <div
      className=" rounded-full h-18 w-18 p-4 flex items-center justify-center hover:bg-gray-700 cursor-pointer transition gap-2"
      onClick={() => router.push("/")}
    >
      <GiPenguin size={28} color="white" />
      <p className="text-white font-bold">XYZ</p>
    </div>
  );
};

export default SidebarLogo;
