"use client";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import * as React from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import firebase_app from "@/lib/firebase";
import { getAuth } from "firebase/auth";
import AuthenticationPage from "@/components/layout/auth/login";
import { AuthContextProvider } from "@/components/context/AuthContext";
import {Button} from 'primereact/button'


//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";     
    
//core
import "primereact/resources/primereact.min.css";                                       


const auth = getAuth(firebase_app);

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <Navbar />
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
