"use client";

import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { useForm } from "react-hook-form";
import { formSchema } from "../model/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { getAuthentication } from "@/shared/api/generated/authentication/authentication";
import { LoginUser } from "@/shared/api/model";
import { useRouter } from "next/navigation";
import { useSignIn } from "../model/store";
import { LoadingButton } from "@/widgets/loading-button";

export const SignInForm = () => {
  const { isMutating, setIsMutating } = useSignIn();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (loginUser: LoginUser) =>
      getAuthentication().loginUserLoginPost(loginUser),
    onSuccess: (response) => {
      const item = {
        accessToken: response.access_token,
        expiry: new Date().getTime() + response.expiresAt,
      };
      localStorage.setItem("accessToken", JSON.stringify(item));
      setIsMutating(false);
      router.replace("/");
    },
    onError: () => setIsMutating(false),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsMutating(true);
    mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isMutating ? (
          <LoadingButton className="w-full" />
        ) : (
          <Button type="submit" className="w-full" disabled={isMutating}>
            Login
          </Button>
        )}
      </form>
    </Form>
  );
};
