import { CreateOrderForm } from "@/features/create-order/ui/create-order-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";

export default function Page() {
  return (
    <div className="flex flex-col gap-y-3">
      <Card>
        <CardHeader>
          <CardTitle>Author</CardTitle>
          <CardDescription>Author of this order</CardDescription>
        </CardHeader>
        <CardContent>
          {/* <Input /> */}
          <CreateOrderForm />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Author of this order</CardDescription>
        </CardHeader>
        <CardContent>
          <Input />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
