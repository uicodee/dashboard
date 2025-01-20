import { useCreateMailing } from "../model/store";
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
} from "@/shared/ui/credenza";
import { CreateMailingForm } from "./create-mailing-form";

export const CreateMailingModal = () => {
  const setOpen = useCreateMailing((state) => state.setOpen);
  const open = useCreateMailing((state) => state.open);
  return (
    <Credenza open={open} onOpenChange={() => setOpen(false)}>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Create mailing</CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody className="mb-4">
          <CreateMailingForm />
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  );
};
