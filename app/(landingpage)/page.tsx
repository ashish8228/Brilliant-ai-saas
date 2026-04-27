import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <p>Ashish kumar mali</p>
      <Link href="/sign-in">
      <Button>sign in</Button>
      </Link>
       
       <Link href="/sign-up">
       <Button>Sign up</Button>
       </Link>
    </div>
  );
}
