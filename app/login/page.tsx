
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Command } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { UserAuthLogin } from "@/components/layout/auth/user-auth-login"

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
}

export default function AuthenticationPage() {
  return (
    <>
      <div className="container relativeflex-col items-center justify-center">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Logga in
              </h1>
              <p className="text-sm text-muted-foreground">
                Logga in med ditt konto
              </p>
            </div>
            <UserAuthLogin />
            <p className="px-8 text-center text-sm text-muted-foreground">
              Du kan skapa ett konto <Link href="/signup" className="underline underline-offset-4 hover:text-primary">här</Link>.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}