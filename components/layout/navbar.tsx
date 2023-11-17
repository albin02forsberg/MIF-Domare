"use client";

import * as React from "react";
import Link from "next/link";
import { useAuthContext } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { logout } from "@/lib/services/firebase-auth";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";

export function Navbar() {
  const { user, userRoles } = useAuthContext();

  const items = [
    {
      label: "Hem",
      icon: "pi pi-fw pi-home",
      url: "/",
    },
    {
      label: "Domarschema",
      icon: "pi pi-fw pi-calendar",
      url: "/schedule",
    },
  ];

  const adminItems = [
    {
      label: "Domare",
      icon: "pi pi-fw pi-user",
      url: "/referee",
    },
    {
      label: "Lag",
      icon: "pi pi-fw pi-users",
      url: "/team",
    },
  ];

  const admin = userRoles?.includes("admin");

  if (admin) {
    items.push(...adminItems);
  }

  return (
    <Menubar
      model={items}
      end={
        user ? (
          <Button label="Logga ut" onClick={logout} />
        ) : (
          <Link href={"/login"}>
            <Button label="Logga in" onClick={logout} />
          </Link>
        )
      }
    />
  );
}

function CTASection() {
  const { user } = useAuthContext();
  return (
    <>
      <Link href={"/signup"}>
        <Button label="Skapa konto" />
      </Link>
      <Link href={"/login"}>
        <Button label="Logga in" />
      </Link>
    </>
  );
}
