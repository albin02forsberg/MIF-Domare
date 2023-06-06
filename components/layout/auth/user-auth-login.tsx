
"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import firebase_app from "@/lib/firebase"
import { getAuth} from "firebase/auth"
import { login, register } from "@/lib/services/firebase-auth"
import { useRouter } from "next/navigation"

const auth = getAuth(firebase_app);

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthLogin({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [email, setEmail] = React.useState<string>("")
  const [password, setPassword] = React.useState<string>("")
  const [passwordConfirm, setPasswordConfirm] = React.useState<string>("")
  const router = useRouter();


  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true);

    await login(email, password);
    router.push("/");

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              autoComplete="current-password"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <Button disabled={isLoading}>
            Sign In
          </Button>
        </div>
      </form>
    </div>
  )
}