"use client";
import { signIn, useSession } from "next-auth/react";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { BsGithub, BsGoogle } from "react-icons/bs";

import Button from "../Button";
import Input from "../inputs/Input";
import SocialButton from "./SocialButton";
import { useRouter } from "next/navigation";

export default function Auth() {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<"login" | "register">("login");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session.data) {
      router.push("/home");
    }
  }, [session?.status])

  const toggleVariant = useCallback(() => {
    setVariant(variant === "login" ? "register" : "login");
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "register") {
      axios
        .post("/api/register", data)
        .then(() => signIn("credentials", data))
        .catch(() => toast.error("Something went wrong"))
        .finally(() => setIsLoading(false));
    }

    if (variant == "login") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials");
          }

          if (callback?.ok && !callback?.error) {
            toast.success("Logged in successfully");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, {
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Something went wrong");
        }

        if (callback?.ok && !callback?.error) {
          toast.success("Logged in successfully");
          router.push("/home");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div
      className="
            mt-8
            sm:mx-auto sm:w-full sm:max-w-md
        "
    >
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "register" && (
            <Input
              id="name"
              label="Name"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
          )}

          <Input
            id="email"
            label="Email Address"
            type="email"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            register={register}
            errors={errors}
            disabled={isLoading}
          />

          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {variant === "login" ? "Login" : "Register"}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <SocialButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />
            <SocialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
          </div>
        </div>

        <div
          className="
            flex
            gap-2
            justify-center
            text-sm
            mt-6
            px-2
            text-gray-500
        "
        >
          <div>
            {variant === "login" ? "New to Text?" : "Already have an account?"}
          </div>

          <div onClick={toggleVariant} className="underline cursor-pointer">
            {variant === "login" ? "Register" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
}
