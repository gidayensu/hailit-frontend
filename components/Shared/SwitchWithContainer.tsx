import React from "react";
import { Switch } from "../ui/switch";

export default function SwitchWithContainer({
  text,
  checked,
  onCheckedChange,
}: {
  text: string;
  checked: boolean;
  onCheckedChange: () => void;
}) {
  const mdOrLargerClass = "md:items-center";
  return (
    <div className="flex gap-3 text-sm font-semibold mt-3 w-full max-w-sm justify-between border rounded-xl h-14 items-center p-2 border-slate-400 dark:border-opacity-20">
      <p>Onboard</p>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}
