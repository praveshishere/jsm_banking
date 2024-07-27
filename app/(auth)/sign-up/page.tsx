"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CustomInput from "@/components/CustomInput";

import { signUpSchema } from "@/lib/formSchema";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { getLoggedInUser, signUp } from "@/lib/actions/user.actions";

const SignUp = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  getLoggedInUser().then((res) => {
    
  });

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      dateOfBirth: "",
      address1: "",
      city: "",
      firstName: "",
      lastName: "",
      password: "",
      postalCode: "",
      ssn: "",
      state: "",
    },
  });

  async function onSubmit(data: z.infer<typeof signUpSchema>) {
    setIsLoading(true);
    

    try {
      const newUser = await signUp(data);
      setUser(newUser);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }

    setIsLoading(false);
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
              {user ? "Link Account" : "Sign Up"}
            </h1>
            <p className="text-16 font-normal text-gray-600">
              {user
                ? "Link your account to get started"
                : "Please enter your details"}
            </p>
          </div>
        </header>
        {user ? (
          <div className="flex flex-col gap-4">{/* PLainLink */}</div>
        ) : (
          <>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="flex gap-4">
                  <CustomInput
                    control={form.control}
                    formSchema={signUpSchema}
                    name="firstName"
                    label="First Name"
                    placeholder="Enter your first name"
                  />
                  <CustomInput
                    control={form.control}
                    formSchema={signUpSchema}
                    name="lastName"
                    label="Last Name"
                    placeholder="Enter your last name"
                  />
                </div>
                <CustomInput
                  control={form.control}
                  formSchema={signUpSchema}
                  name="address1"
                  label="Address"
                  placeholder="Enter your specifc address"
                />


                <CustomInput
                  control={form.control}
                  formSchema={signUpSchema}
                  name="city"
                  label="City"
                  placeholder="Enter your city"
                />

                <div className="flex gap-4">
                  <CustomInput
                    control={form.control}
                    formSchema={signUpSchema}
                    name="state"
                    label="State"
                    placeholder="Example: NY"
                  />

                  <CustomInput
                    control={form.control}
                    formSchema={signUpSchema}
                    name="postalCode"
                    label="Postal Code"
                    placeholder="Example: 11101"
                  />
                </div>

                <div className="flex gap-4">
                  <CustomInput
                    control={form.control}
                    formSchema={signUpSchema}
                    name="dateOfBirth"
                    label="Date of Birth"
                    placeholder="YYYY-MM-DD"
                  />

                  <CustomInput
                    control={form.control}
                    formSchema={signUpSchema}
                    name="ssn"
                    label="SSN"
                    placeholder="Ex: 1234"
                  />
                </div>

                <CustomInput
                  control={form.control}
                  formSchema={signUpSchema}
                  name="email"
                  label="Email"
                  placeholder="Enter your email"
                />
                <CustomInput
                  control={form.control}
                  formSchema={signUpSchema}
                  name="password"
                  label="Password"
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
                      "Sign Up"
                    )}
                  </Button>
                </div>
              </form>
            </Form>

            <footer className="flex justify-center gap-1">
              <p className="text-14 font-normal text-gray-600">
                Already have an account
              </p>
              <Link className="form-link" href="/sign-in">
                Sign In
              </Link>
            </footer>
          </>
        )}
      </section>
    </section>
  );
};

export default SignUp;
