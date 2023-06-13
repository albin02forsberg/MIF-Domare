"use client";

import * as React from "react";
import Link from "next/link";
import { useAuthContext } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { logout } from "@/lib/services/firebase-auth";
import {Menubar} from 'primereact/menubar'
import { Button } from "primereact/button";

export function Navbar() {
  const { user } = useAuthContext();

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
    }];

    return(
      <Menubar model={items}  end={user ? <Button label="Logga ut" onClick={logout} /> : <Link href={"/login"}><Button label="Logga in" onClick={logout} /></Link>} />
    )
}

function UserNavSection(){
  const { user } = useAuthContext();
}
