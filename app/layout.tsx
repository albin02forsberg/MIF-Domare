"use client";
import * as React from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import firebase_app from "@/lib/firebase";
import { getAuth } from "firebase/auth";
import { AuthContextProvider } from "@/components/context/AuthContext";
import { Panel } from "primereact/panel";

//theme
//import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/themes/soho-light/theme.css"

import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';

import {
  ToastContext,
  ToastContextProvider,
} from "@/components/context/ToastContext";

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
          <ToastContextProvider>
            <Navbar />
            <Panel>
              <div className="m-4">{children}</div>
            </Panel>
          </ToastContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
