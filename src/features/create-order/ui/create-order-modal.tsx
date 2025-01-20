import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
} from "@/shared/ui/credenza";
import { useCreateOrder } from "../model/store";
import { CreateOrderForm } from "./create-order-form";

export const CreateOrderModal = () => {
  const setOpen = useCreateOrder((state) => state.setOpen);
  const open = useCreateOrder((state) => state.open);
  return (
    <Credenza open={open} onOpenChange={() => setOpen(false)}>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Create order</CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody className="mb-4">
          <CreateOrderForm />
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  );
};
