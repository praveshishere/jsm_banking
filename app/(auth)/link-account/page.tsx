
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { getLoggedInUser, getUserInfo } from "@/lib/actions/user.actions";
import PlaidLink from "@/components/PlaidLink";
import { redirect } from "next/navigation";

const LinkAccount = async () => {

  const loggedIn = await getLoggedInUser();

  if (!loggedIn) {
    redirect("/");
  };

  const user = await getUserInfo({
    userId: loggedIn.$id,
  });

  if (!user) {
    redirect("/");
  };


  return (
    <section className="flex-center size-full max-sm:px-6">
      <section className="auth-form">
        <header className="flex flex-col gap-5 md:gap-8">
          <Link
            href="/"
            className="cursor-pointer flex items-center gap-1"
          >
            <Image
              src="/icons/logo.svg"
              width={34}
              height={34}
              alt="Horizon logo"
            />
            <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
              Horizon
            </h1>
          </Link>
          <div className="flex flex-col gap-1 md:gap-3">
            <h1
              className="text-24 lg:text-36 font-semibold text-gray-900"
            >
              Link Account
            </h1>
            <p className="text-16 font-normal text-gray-600">
              Link your account to get started
            </p>
          </div>
        </header>

        <div className="flex flex-col gap-4">
          <PlaidLink user={user} variant="primary" />
        </div>

      </section>
    </section>
  );
};

export default LinkAccount;
