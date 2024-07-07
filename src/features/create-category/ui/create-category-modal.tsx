import { useCreateCategory } from "../model/store";
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
} from "@/shared/ui/credenza";
import { CreateCategoryForm } from "./create-category-form";

export const CreateCategoryModal = () => {
  const setOpen = useCreateCategory((state) => state.setOpen);
  const open = useCreateCategory((state) => state.open);
  return (
    <Credenza open={open} onOpenChange={() => setOpen(false)}>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Category</CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody className="mb-4">
          <CreateCategoryForm />
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  );
};
