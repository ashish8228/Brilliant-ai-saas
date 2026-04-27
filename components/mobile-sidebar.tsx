"use client"

import { Button } from "@base-ui/react"
import { Menu } from "lucide-react"

const MobileSidebar = ()=>{
return(
   <Button
  variant="ghost"
  size="icon"
  className="md:hidden"
>
  <Menu />
</Button>
)
}


export default MobileSidebar;