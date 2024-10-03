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
import { getSkill } from "@/shared/api/generated/skill/skill.ts";
import { useCreateSkill } from "@/features/create-skill";
import { SkillInput } from "@/shared/api/model";

export const CreateSkillForm = () => {
  const queryClient = useQueryClient();
  const setOpen = useCreateSkill((state) => state.setOpen);
  const mutation = useMutation({
    mutationFn: async (data: SkillInput) => {
      await getSkill().createSkillSkillPost(data);
    },
    onSuccess: () => {
      queryClient
        .invalidateQueries({ queryKey: ["skills"] })
        .then(() => setOpen(false));
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }

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
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};
