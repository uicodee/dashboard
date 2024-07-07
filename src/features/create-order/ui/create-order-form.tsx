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
import { getSkill } from "@/shared/api/generated/skill/skill.ts";
import MultipleSelector, { Option } from "@/shared/ui/multiselect.tsx";
import { getOrder } from "@/shared/api/generated/order/order.ts";
import { useCreateOrder } from "@/features/create-order";
import { OrderInput } from "@/shared/api/model";
import { getCategory } from "@/shared/api/generated/category/category";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

export const CreateOrderForm = () => {
  const queryClient = useQueryClient();
  const setOpen = useCreateOrder((state) => state.setOpen);
  const { data: skills, isFetched } = useQuery({
    queryKey: ["skills"],
    queryFn: () => getSkill().allSkillsSkillAllGet(),
  });
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategory().allOrderCategoriesCategoryAllGet(),
  });
  const mutation = useMutation({
    mutationFn: async (data: OrderInput) => {
      await getOrder().createOrderOrderNewPost(data);
    },
    onSuccess: () => {
      queryClient
        .invalidateQueries({ queryKey: ["orders"] })
        .then(() => setOpen(false));
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const variables: OrderInput = {
      ...values,
      skillsIds: values.skillsIds.map((skill) => Number(skill.value)),
    };
    mutation.mutate(variables);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
                <Select onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      {categories?.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={String(category?.id)}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
                {isFetched ? (
                  <MultipleSelector
                    {...field}
                    badgeClassName="text-white"
                    defaultOptions={skills?.map(
                      (skill) =>
                        ({
                          value: String(skill.id),
                          label: skill.name,
                        } as Option)
                    )}
                    placeholder="Select skills"
                    emptyIndicator={
                      <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                        no results found.
                      </p>
                    }
                  />
                ) : (
                  <div className="w-full h-8 bg-muted rounded-md" />
                )}
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