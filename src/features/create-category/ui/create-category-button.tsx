import { Button } from "@/shared/ui/button";
import { CirclePlus } from "lucide-react";
import { useCreateCategory } from "../model/store";

export const CreateCategoryButton = () => {
  const setOpen = useCreateCategory((state) => state.setOpen);
  return (
    <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
      <CirclePlus className="w-4 h-4 mr-2" strokeWidth={1.75} />
      New
    </Button>
  );
};
