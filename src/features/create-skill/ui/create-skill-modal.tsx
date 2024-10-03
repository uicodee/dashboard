import { useCreateSkill } from "@/features/create-skill";
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
} from "@/shared/ui/credenza";
import { CreateSkillForm } from "./create-skill-form";

export const CreateSkillModal = () => {
  const setOpen = useCreateSkill((state) => state.setOpen);
  const open = useCreateSkill((state) => state.open);
  return (
    <Credenza open={open} onOpenChange={() => setOpen(false)}>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Order</CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody className="mb-4">
          <CreateSkillForm />
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  );
};
