"use client";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectDate({schedule}: {schedule:boolean | undefined}) {
  const [date, setDate] = useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"empty"}
          className={cn(
            "w-full h-14 justify-start text-left font-normal border-black border dark:border-slate-300  border-opacity-40 dark:border-opacity-10 dark:bg-primary-dark",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Choose date for delivery</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
        <Select
          onValueChange={(value) =>
            setDate(addDays(new Date(), parseInt(value)))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="2">In 2 days</SelectItem>
            <SelectItem value="3">In 3 days</SelectItem>
            <SelectItem value="7">In a week</SelectItem>
            <SelectItem value="14">In two weeks</SelectItem>
          </SelectContent>
        </Select>
        <div className="rounded-md ">
          <Calendar mode="single" selected={date} onSelect={setDate} disabled={schedule ? (date) =>
                      date < new Date(new Date().setDate(new Date().getDate() + 1)): (date)=>(typeof(date)==='number')
                    }/>
        </div>
      </PopoverContent>
    </Popover>
  );
}
