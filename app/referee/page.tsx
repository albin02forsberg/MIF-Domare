"use client";

import Link from "next/link";
import { DataTable } from "primereact/datatable";
import { Column, ColumnEditorOptions } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import {
  DocumentData,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
} from "firebase/firestore";
import firebase_app from "@/lib/firebase";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/components/context/AuthContext";

let db = getFirestore(firebase_app);

const textEditor = (options: any) => {
  return (
    <InputText
      type="text"
      value={options.value}
      onChange={(e) => options.editorCallback(e.target.value)}
    />
  );
};

export default function Referees() {
  const [referees, setReferees] = useState([] as any);
  const { user, userRoles } = useAuthContext();

  useEffect(() => {
    const q = query(collection(db, "referees"));
    getDocs(q).then((querySnapshot) => {
      let data: DocumentData[] = [];
      querySnapshot.forEach((doc) => {
        const d = doc.data();
        d.id = doc.id;
        data.push(d);
      });
      setReferees(data);
    });
  }, []);

  if(!userRoles?.includes("admin")){
    return <h1>Du har inte behörighet att se denna sida</h1>
  }

  const onRowComplete = (e: any) => {
    const newData = e.newData;
    const id = e.data.id;
    const docRef = doc(db, "referees", id);
    setDoc(docRef, newData);

    const newReferees = referees.map((referee: any) => {
      if (referee.id === id) {
        return newData;
      }
      return referee;
    }
    );
    setReferees(newReferees);
  };

  return (
    <div>
      <h1>Domarlista</h1>

      <Link href={"/referee/add"}>
        {" "}
        <Button label="Lägg till domare" />
      </Link>

      <DataTable
        value={referees}
        editMode="row"
        dataKey="id"
        tableStyle={{ width: "75%" }}
        onRowEditComplete={onRowComplete}
      >
        <Column
          field="firstName"
          header="Förnamn"
          sortable
          editor={(options) => textEditor(options)}
        ></Column>
        <Column
          field="lastName"
          header="Efternamn"
          sortable
          editor={(options) => textEditor(options)}
        ></Column>
        <Column
          field="phone"
          header="Telefon"
          editor={(options) => textEditor(options)}
        ></Column>
        <Column
          field="email"
          header="E-post"
          editor={(options) => textEditor(options)}
        ></Column>
        <Column
          field="adress"
          header="adress"
          editor={(options) => textEditor(options)}
        ></Column>
        <Column
          field="personalNumber"
          header="Personnummer"
          editor={(options) => textEditor(options)}
        ></Column>
        <Column
          field="clearingNumber"
          header="Clearingnummer"
          editor={(options) => textEditor(options)}
        ></Column>
        <Column
          field="accountNumber"
          header="Kontonummer"
          editor={(options) => textEditor(options)}
        ></Column>
        <Column
          rowEditor
          headerStyle={{ width: "10%", minWidth: "8rem" }}
          bodyStyle={{ textAlign: "center" }}
        ></Column>
      </DataTable>
    </div>
  );
}
