import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function DispatcherScroll ({dispatchersData}: {dispatchersData:any}) {
    return (
        <ScrollArea className="h-72 w-full rounded-md ">
            <div className="p-4">
              <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
              {dispatchersData.map((dispatcher: any) => (
                <>
                  <div key={'s'} className="text-sm">
                    <p>1234</p>
                  </div>
                  <Separator className="my-2" />
                </>
              ))}
            </div>
          </ScrollArea>
    )
}