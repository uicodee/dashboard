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
import { getOrder } from "@/shared/api/generated/order/order.ts";
import { useCreateOrder } from "@/features/create-order";
import { Currency, DeadlineType, OrderInput } from "@/shared/api/model";
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
import { MultiSelect } from "@/shared/ui/multi-select";
import { RichTextEditor } from "@/widgets/rich-text";
import { LoadingButton } from "@/widgets/loading-button";

export const CreateOrderForm = () => {
  const queryClient = useQueryClient();
  const { isMutating, setIsMutating, setOpen } = useCreateOrder();
  const { data: skills, isFetched } = useQuery({
    queryKey: ["skills"],
    queryFn: () => getSkill().allSkillsSkillGet(),
  });
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategory().allOrderCategoriesCategoryGet(),
  });
  const mutation = useMutation({
    mutationFn: async (data: OrderInput) => {
      setIsMutating(true);
      await getOrder().createOrderOrderPost(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] }).then(() => {
        setIsMutating(false);
        setOpen(false);
      });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      deadlineType: DeadlineType.day,
      currency: Currency.uzs,
    },
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
                <Input {...field} className="col-span-1" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-x-2">
          <FormField
            control={form.control}
            name="deadline"
            render={({ field }) => (
              <FormItem className="w-7/12">
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
            name="deadlineType"
            render={({ field }) => (
              <FormItem className="w-5/12">
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="hour">Hour</SelectItem>
                        <SelectItem value="day">Day</SelectItem>
                        <SelectItem value="month">Month</SelectItem>
                        <SelectItem value="year">Year</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="technicalTask"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task</FormLabel>
              <FormControl>
                <RichTextEditor {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-x-2">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-7/12">
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
            name="currency"
            render={({ field }) => (
              <FormItem className="w-5/12">
                <FormLabel>Currency</FormLabel>
                <FormControl>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="uzs">UZS</SelectItem>
                        <SelectItem value="usd">USD</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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
                  <MultiSelect
                    {...field}
                    modalPopover
                    options={
                      skills?.map((skill) => ({
                        label: skill.name,
                        value: String(skill.id),
                      })) as { value: string; label: string }[]
                    }
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    placeholder="Select options"
                    variant="inverted"
                  />
                ) : (
                  <div className="w-full h-8 bg-muted rounded-md" />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isMutating ? (
          <LoadingButton className="w-full" />
        ) : (
          <Button type="submit" className="w-full" disabled={isMutating}>
            Submit
          </Button>
        )}
      </form>
    </Form>
  );
};
