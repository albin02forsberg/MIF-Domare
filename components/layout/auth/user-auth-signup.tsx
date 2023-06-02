"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import firebase_app from "@/lib/firebase"
import { getAuth} from "firebase/auth"
import { login, register } from "@/lib/services/firebase-auth"

const auth = getAuth(firebase_app);

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthSignUp({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [email, setEmail] = React.useState<string>("")
  const [password, setPassword] = React.useState<string>("")
  const [passwordConfirm, setPasswordConfirm] = React.useState<string>("")


  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true);

    await register(email, password).then(() => {
      login(email, password);
    });

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
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password-confirm">
              Confirm Password
            </Label>
            <Input
              id="password-confirm"
              placeholder="Confirm Password"
              type="password"
              autoComplete="current-password"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(event) => setPasswordConfirm(event.target.value)}
            />
          </div>
          <Button disabled={isLoading}>
            Sign In with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        Github
      </Button>
    </div>
  )
}