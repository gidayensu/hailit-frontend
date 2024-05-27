import { Button } from "@/components/ui/button"
import Container from "@/components/ui/container"
import { Input } from "@/components/ui/input"
import { FaPhone, FaWhatsapp } from "react-icons/fa"
export default function TrackOrder () {
    return (
        <>
        <div className="flex w-full max-w-xl items-center space-x-2 justify-center mt-10 ">
        <Input
          type="text"
          placeholder="Tracking Number"
          className="w-full border-2 border-slate-400"
          />
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </div>
      <span className="flex items-start justify-start">

      <h3 className="font-bold  text-lg mt-4 -mb-1">Additional Tracking</h3>
      </span>
      
      <Container className="flex flex-col items-center justify-center rounded-xl h-auto p-4 gap-3 w-full">
      
          <p className="text-center"> Could not find package or cannot reach assigned courier?</p>
          <Button variant={"outline"} className="w-2/3 ">
             <FaPhone className="text-md mr-2"/> Call Management
          </Button>

          <Button className="w-2/3 bg-green-500 text-white">
             <FaWhatsapp className="text-lg mr-2"/> WhatsApp
          </Button>
        
        
      </Container>
      </>
    )
}