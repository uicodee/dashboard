import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
} from "@/shared/ui/credenza";
import { useEditOrder } from "../model/store";
import { EditOrderForm } from "./edit-order-form";

export const EditOrderModal = () => {
  const setOpen = useEditOrder((state) => state.setOpen);
  const open = useEditOrder((state) => state.open);
  return (
    <Credenza open={open} onOpenChange={() => setOpen(false)}>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Order</CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody className="mb-4">
          <EditOrderForm />
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  );
};
