"use client";

import React, { useCallback, useEffect, useState } from "react"
import { Button } from "./ui/button"

import { usePlaidLink, type PlaidLinkOnSuccess, type PlaidLinkOptions } from "react-plaid-link";
import { useRouter } from "next/navigation";
import { createLinkToken, exchangePublicToken } from "@/lib/actions/user.actions";

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {

  const router = useRouter();

  const [token, setToken] = useState("");

  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken(user);
      setToken(data?.link_token);
      console.log("got response", data);
    }
    
    console.log("use Effect running");
    getLinkToken();
  }, [user]);


  const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string) => {
    console.log("onSuccess called")
    await exchangePublicToken({
      publicToken: public_token,
      user,
    });

    router.push("/");
  }, [user]);

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
  }

  const { open, ready, } = usePlaidLink(config);

  return (
    <>
      { variant === "primary" ? (
        <Button className="plaidlink-primary"
          onClick={() => open()}
          disabled={!ready}
        >
          Connect bank
        </Button>
      ) : variant === "ghost" ? (
        <Button>
          Connect bank
        </Button>
      ) : (
        <Button>
        Connect bank
        </Button>
      )
    }
    </>
  )
}

export default PlaidLink