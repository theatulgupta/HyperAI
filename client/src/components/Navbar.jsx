import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const { user } = useUser();
  const { openSignIn } = useClerk();

  const navigate = useNavigate();
  return (
    <div className="fixed z-10 w-full backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32">
      <button
        type="button"
        onClick={() => navigate("/")}
        className="h-10 inline-flex items-center text-2xl sm:text-3xl font-bold tracking-tight text-slate-800"
        aria-label="Hyper.ai home"
      >
        Hyper<span className="text-primary">.ai</span>
      </button>

      {user ? (
        <UserButton />
      ) : (
        <button
          className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5"
          onClick={() => openSignIn()}
        >
          Get started <ArrowRight className="size-4" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
