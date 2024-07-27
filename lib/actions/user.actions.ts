"use server"

import { cookies } from "next/headers";
import { createAdminClient, createSessionClient } from "../appwrite";
import { ID, Models } from "node-appwrite";
import { parseStringify } from "../utils";
import { sessionName } from "@/constants/appwrite";

export const signIn = async ({ email, password }: signInProps) => {
  try {
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);
    cookies().set(sessionName, session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(session);
  } catch (error) {
    console.error("Error", error);
  }
}

export const signUp = async ({ email, password, firstName, lastName }: SignUpParams) => {
  try {
    const { account } = await createAdminClient();

    const newUserAccount = await account.create(ID.unique(), email, password, `${firstName} ${lastName}`);
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set(sessionName, session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUserAccount);
  } catch (error) {
    console.error("Error", error);
  }
}

// ... your initilization functions

export async function getLoggedInUser(): Promise<Models.User<Models.Preferences> | null> {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();
    console.log("user available on server")

    return parseStringify(user);
  } catch (error) {
    console.log(error);
    return null;
  }
}
