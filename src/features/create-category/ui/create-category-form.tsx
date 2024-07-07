"use client";

import { formSchema } from "../model/form-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form.tsx";
import { Input } from "@/shared/ui/input.tsx";
import { Button } from "@/shared/ui/button.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCreateCategory } from "@/features/create-category";
import {
  BodyCreateOrderCategoryCategoryNewPost,
  CreateOrderCategoryCategoryNewPostParams,
} from "@/shared/api/model";
import { getCategory } from "@/shared/api/generated/category/category";

export const CreateCategoryForm = () => {
  const queryClient = useQueryClient();
  const setOpen = useCreateCategory((state) => state.setOpen);
  const mutation = useMutation({
    mutationFn: async ({
      data,
      params,
    }: {
      data: BodyCreateOrderCategoryCategoryNewPost;
      params: CreateOrderCategoryCategoryNewPostParams;
    }) => {
      await getCategory().createOrderCategoryCategoryNewPost(data, params);
    },
    onSuccess: () => {
      queryClient
        .invalidateQueries({ queryKey: ["categories"] })
        .then(() => setOpen(false));
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate({
      data: { file: values.photo[0] },
      params: { name: values.name },
    });
  }
  const photoRef = form.register("photo");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="photo"
          render={() => (
            <FormItem>
              <FormLabel>Icon</FormLabel>
              <FormControl>
                <Input type="file" {...photoRef} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};
