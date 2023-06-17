"use client";

import Link from "next/link";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import {
  DocumentData,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
} from "firebase/firestore";
import firebase_app from "@/lib/firebase";
import { useEffect, useState } from "react";

let db = getFirestore(firebase_app);

export default function Referees() {
  const [referees, setReferees] = useState([] as any);

  useEffect(() => {
    const q = query(collection(db, "referees"));
    getDocs(q).then((querySnapshot) => {
      let data: DocumentData[] = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setReferees(data);
      console.log(referees);
    });
  }, []);

  return (
    <div>
      <h1>Domarlista</h1>

      <Link href={"/referee/add"}> <Button label="Lägg till domare" /></Link>

      <DataTable value={referees}>
        <Column field="firstName" header="Förnamn" sortable></Column>
        <Column field="lastName" header="Efternamn" sortable></Column>
        <Column field="phone" header="Telefon"></Column>
        <Column field="email" header="E-post"></Column>
        <Column field="adress" header="adress"></Column>
      </DataTable>
    </div>
  );
}
