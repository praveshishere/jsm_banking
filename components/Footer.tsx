import { logOut } from "@/lib/actions/user.actions";
import Image from "next/image"
import { redirect, useRouter } from "next/navigation";
import React from "react"

const Footer = ({ user }: FooterProps) => {

  const router = useRouter();
  const handleLogOut = async () => {
    const loggedOut = await logOut();

    if (loggedOut) {
      router.push("/sign-in");
    }
  };

  return (
    <footer className="footer">
      <div className="footer_name">
        <p className="text-xl font-bold text-gray-700">
          { user.name[0] }
        </p>
      </div>

      <div className="footer_email">
        <h1 className="text-14 truncate font-semibold text-gray-700">
          { user.name }
        </h1>
        <p className="text-14 truncate font-normal text-gray-600">
          { user.email }
        </p>
      </div>

      <div className="footer_image" onClick={handleLogOut}>
        <Image src="/icons/logout.svg" 
          fill
          alt="logout "

        />
      </div>
    </footer>
  )
}

export default Footer