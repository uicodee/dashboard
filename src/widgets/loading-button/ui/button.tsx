import { Button } from "@/shared/ui/button";
import { LoaderCircle } from "lucide-react";

export const LoadingButton = ({ className }: { className?: string }) => {
  return (
    <Button className={className} disabled>
      <LoaderCircle className="animate-spin" />
    </Button>
  );
};
