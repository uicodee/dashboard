"use client";

import { Fragment, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { getAuthentication } from "../api/generated/authentication/authentication";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: () => getAuthentication().refreshTokenRefreshTokenPost(),
    onSuccess: (data) => {
      const item = {
        accessToken: data.access_token,
        expiry: new Date().getTime() + data.expiresAt,
      };
      localStorage.setItem("accessToken", JSON.stringify(item));
    },
    onError: () => {
      router.replace("/sign-in");
    },
  });
  useEffect(() => {
    const accessTokenStr = localStorage.getItem("accessToken");
    if (!accessTokenStr) {
      mutation.mutate();
    } else {
      try {
        const accessToken = JSON.parse(accessTokenStr);
        if (new Date().getTime() > accessToken.expiry) {
          mutation.mutate();
        }
      } catch {
        router.replace("/sign-in");
      }
    }
  }, [router]);

  return <Fragment>{children}</Fragment>;
};
