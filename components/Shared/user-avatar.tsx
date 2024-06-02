import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserAvatar() {
  return (
    <Avatar className="h-12 w-12 border border-slate-800">
      <AvatarImage src="https://source.boringavatars.com/pixel" alt="hailit user" />
      <AvatarFallback>RD</AvatarFallback>
    </Avatar>
  );
}
