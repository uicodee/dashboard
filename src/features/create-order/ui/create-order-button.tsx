import {Button} from "@/shared/ui/button.tsx";
import {CirclePlus} from "lucide-react";
import {useCreateOrder} from "@/features/create-order";

export const CreateOrderButton = () => {
    const setOpen = useCreateOrder((state) => state.setOpen)
    return (
        <Button
            size="sm"
            variant="outline"
            onClick={() => setOpen(true)}>
            <CirclePlus className="w-4 h-4 mr-2" strokeWidth={1.75}/>New
        </Button>
    )
}