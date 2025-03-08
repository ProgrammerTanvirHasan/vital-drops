"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Swal from "sweetalert2";

const SocialSignIn = () => {
  const searchParams = useSearchParams();
  const path = searchParams.get("redirect");

  const handlesocialSign = async (provider) => {
    const resp = await signIn(provider, {
      redirect: true,
      callbackUrl: path ? path : "/",
    });
  };

  return (
    <div className="flex justify-between pt-2">
      <button
        onClick={() => handlesocialSign("google")}
        type="button"
        className="text-orange-300 bg-slate-950 glass btn hover:bg-black "
      >
        GOOGLE LOGIN
      </button>
      <button
        onClick={() => handlesocialSign("github")}
        type="button"
        className="text-orange-300 bg-slate-950 glass hover:bg-black btn "
      >
        GITHUB LOGIN
      </button>
    </div>
  );
};
export default SocialSignIn;
