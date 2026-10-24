import { useState } from "react";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

import {Button} from "../components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "cn";

interface IDatePickerProps {
  id?: string;
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  className?: string;
  placeholder?: string;
}

export default function DatePicker({
  id,
  value,
  onChange,
  className,
  placeholder = "Datum wählen",
}: IDatePickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {/* Base UI (nicht Radix): der Trigger nimmt `render`, nicht `asChild` --
          genau wie der DropdownMenuTrigger in TaskItem.tsx. */}
      <PopoverTrigger
        render={
          <Button
            id={id}
            /* Pflicht: der Trigger steht in einem <form>, sonst waere der
               Default `submit` und das Oeffnen wuerde absenden. */
            type="button"
            variant="secondary"
            className={cn(
              "h-10 w-full justify-between font-normal flex cursor-pointer",
              !value && "text-slate-400",
              className
            )}
          >
            {value ? format(value, "dd.MM.yyyy", { locale: de }) : placeholder}
            <CalendarIcon className="size-4 opacity-50" />
          </Button>
        }
      />
      {/* PopoverContent bringt w-72/p-2.5 mit -- das wuerde den Kalender
          einschnueren, deshalb hier ueberschreiben. */}
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => {
            onChange(date);
            setOpen(false);
          }}
          captionLayout="dropdown"
          locale={de}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  );
}