import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectDeliveryType() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="same day">Same day</SelectItem>
          <SelectItem value="tomorrow">Tomorrow</SelectItem>
          <SelectItem value="custom">Custom</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
