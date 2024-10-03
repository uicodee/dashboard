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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import MultipleSelector, { Option } from "@/shared/ui/multiselect.tsx";
import { getOrder } from "@/shared/api/generated/order/order.ts";
import { OrderInput } from "@/shared/api/model";
import { getSkill } from "@/shared/api/generated/skill/skill";

export const EditOrderForm = () => {
  const queryClient = useQueryClient();
  const { data: skills, isLoading } = useQuery({
    queryKey: ["skills"],
    queryFn: () => getSkill().allSkillsSkillGet(),
  });
  const mutation = useMutation({
    mutationFn: async (data: OrderInput) => {
      await getOrder().createOrderOrderPost(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order"] });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const variables: OrderInput = {
      ...values,
      skillsIds: values.skillsIds.map((skill) => Number(skill.value)),
    };
    mutation.mutate(variables);
  }

  const options: Option[] =
    skills?.map(
      (skill) =>
        ({
          value: String(skill.id),
          label: skill.name,
        } as Option)
    ) || [];
  if (isLoading) return null;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="deadline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deadline</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="technicalTask"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="skillsIds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skills</FormLabel>
              <FormControl>
                <MultipleSelector
                  {...field}
                  defaultOptions={options}
                  placeholder="Select skills"
                  emptyIndicator={
                    <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                      no results found.
                    </p>
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
