"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CustomInput from "@/components/CustomInput";

import { signInSchema } from "@/lib/formSchema";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/actions/user.actions";
import PlaidLink from "@/components/PlaidLink";

const SignIn = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof signInSchema>) {
    setIsLoading(true);

    try {
      const loggedInUser = await signIn({
        email: data.email,
        password: data.password,
      });

      if (loggedInUser) {
        console.log(loggedInUser, "user");
        router.push("/");
      }

    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }

  }

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
            <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
              {user ? "Link Account" : "Sign In"}
            </h1>
            <p className="text-16 font-normal text-gray-600">
              {user
                ? "Link your account to get started"
                : "Please enter your details"}
            </p>
          </div>
        </header>
        {user ? (
          <div className="flex flex-col gap-4">
            <PlaidLink user={user} variant="primary" />
          </div>
        ) : (
          <>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <CustomInput
                  control={form.control}
                  formSchema={signInSchema}
                  name="email"
                  label="Email"
                  placeholder="Enter your email"
                />
                <CustomInput
                  control={form.control}
                  formSchema={signInSchema}
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                />

                <div className="flex flex-col gap-4">
                  <Button
                    type="submit"
                    className="form-btn"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        &nbsp; Loading...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </div>
              </form>
            </Form>

            <footer className="flex justify-center gap-1">
              <p className="text-14 font-normal text-gray-600">
                {"Don't already have an account?"}
              </p>
              <Link className="form-link" href="/sign-up">
                Sign Up
              </Link>
            </footer>
          </>
        )}
      </section>
    </section>
  );
};

export default SignIn;
