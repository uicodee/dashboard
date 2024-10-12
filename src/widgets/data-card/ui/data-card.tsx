import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { cn } from "@/shared/ui/utils";
import { ReactNode } from "react";

interface DataCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  children: ReactNode;
  button?: ReactNode;
}

export const DataCard = ({
  title,
  children,
  button,
  className,
}: DataCardProps) => {
  return (
    // <Card className="flex-grow min-h-full md:h-full">
    //     <div className="flex items-center justify-between">
    //         <CardHeader className="px-6 pt-6 pb-1">
    //             <CardTitle>{title}</CardTitle>
    //         </CardHeader>
    //         <div className="flex px-6 pt-6 pb-1">{button}</div>
    //     </div>
    //     <CardContent className="flex flex-col">
    //         {children}
    //     </CardContent>
    // </Card>
    <Card className={cn("min-h-full", className)}>
      <div className="flex items-center justify-between">
        <CardHeader className="px-6 pt-6 pb-1">
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <div className="flex px-6 pt-6 pb-1">{button}</div>
      </div>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
