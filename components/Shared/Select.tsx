import {

  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function Select({data, label}: {data: string[], label:string}) {
  return (
    
    <>
    
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder="Select a fruit" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>{label}</SelectLabel>
        {
          data.map((item, index)=>(
              <SelectItem key={index} value={item}>{item}</SelectItem>
          ))
        }
        
        
      </SelectGroup>
    </SelectContent>

    </>

  )
}
