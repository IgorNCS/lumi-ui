"use server";

import { LoginFormSchema, SignupFormSchema } from "@/app/(lib)/definitions";
import setCookieParser from "set-cookie-parser";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { axiosApi } from "@/app/(lib)/axios";
import * as jwt from "jsonwebtoken";

export const loginAction = async (prevState: unknown, formData: FormData) => {
  const validateFields = LoginFormSchema.safeParse({
    email: formData.get("username"),
    password: formData.get("password"),
  });

  const username = formData.get("username");
  const password = formData.get("password");
  console.log(username, password);
  try {
    console.log("login");
    const res = await axiosApi.post("/auth/login", { username, password });
    console.log(res, "res");
    const data = await res.data.access_token;

    const user = jwt.decode(await res.data.access_token);
    console.log(user);
    console.log(res.headers["set-cookie"]);
    const cookieStore = await cookies();
    const cookieData = setCookieParser(res.headers["set-cookie"]!);

    cookieData.forEach((cookie: any) =>
      cookieStore.set(cookie.name, cookie.value, { ...cookie })
    );

    cookieStore.set("user", JSON.stringify(user), { path: "/" });
    cookieStore.set("access_token", data, { path: "/" });
    console.log(res);

    redirect("/dashboard");
  } catch (error) {
    console.log("Error occurred during login: ", error);
    throw error;
  }
};

export const signupAction = async (prevState: unknown, formData: FormData) => {
  console.log(prevState);

  const validateFields = SignupFormSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  console.log("Fields validated");

  if (!validateFields.success) {
    return { errors: validateFields.error.flatten().fieldErrors };
  }
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const res = await axiosApi.post("/user", {
      username,
      email,
      password,
    });
    const data = await res.data;
    const cookieStore = await cookies();
    const cookieData = setCookieParser(res.headers["set-cookie"]!);

    cookieData.forEach((cookie: any) =>
      cookieStore.set(cookie.name, cookie.value, { ...cookie })
    );
    redirect("/dashboard");
    return data;
  } catch (error) {
    console.log("Error occurred during login: ", error);
    throw error;
  }
};
