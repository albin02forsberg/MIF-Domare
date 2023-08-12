"use client";

import Link from "next/link";
import { DataTable } from "primereact/datatable";
import { Column, ColumnEditorOptions } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import {
  DocumentData,
  addDoc,
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
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { Referee } from "@/lib/models/Referee";
import { useToastContext } from "@/components/context/ToastContext";

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
  const { addMessage } = useToastContext();
  const [referees, setReferees] = useState([] as any);
  const { user, userRoles } = useAuthContext();
  const [refDialog, setRefDialog] = useState(false);
  const [emptyRef, setEmptyRef] = useState({} as Referee);


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

  if (!userRoles?.includes("admin")) {
    return <h1>Du har inte behörighet att se denna sida</h1>
  }

  const openNew = () => {
    setEmptyRef({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      address: "",
      personalNumber: "",
      clearingNumber: "",
      accountNumber: "",
    });
    setRefDialog(true);
  };

  const saveNewRef = () => {
    // Validate new ref
    if (!validateNewRef()) return;

    addDoc(collection(db, "referees"), emptyRef);
    addMessage({
      severity: "success",
      summary: "Ny domare tillagd",
      detail: `Domaren ${emptyRef.firstName} ${emptyRef.lastName} har lagts till.`
    })
    setRefDialog(false);

  }

  const validateNewRef = () => {
    if (emptyRef.accountNumber.trim().length === 0 ||
      emptyRef.address.trim().length === 0 ||
      emptyRef.clearingNumber.trim().length === 0 ||
      emptyRef.email.trim().length === 0 ||
      emptyRef.firstName.trim().length === 0 ||
      emptyRef.lastName.trim().length === 0 ||
      emptyRef.personalNumber.trim().length === 0 ||
      emptyRef.phone.trim().length === 0
    ) {
      addMessage({
        severity: "warn",
        summary: "Validerings fel",
        detail: "Ett eller flera fält felaktigt ifyllda."
      })
      return false;
    }
    return true
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



  const leftToolbar = () => {
    return (
      <div className="flex flex-wrapp gap-2">
        <Button
          label="Lägg till domare"
          icon="pi pi-plus"
          severity="success"
          onClick={openNew}
        />
      </div>
    );
  };


  return (
    <div>
      <Toolbar className="mb-4" left={leftToolbar}></Toolbar>
      <DataTable
        header="Domare"
        value={referees}
        editMode="row"
        dataKey="id"
        onRowEditComplete={onRowComplete}
        className="p-datatable-striped p-datatable-gridlines"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        emptyMessage="Inga domare hittades."
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
      <Dialog
        visible={refDialog}
        style={{ width: "450px" }}
        header="Domare"
        modal
        className="p-fluid"
        onHide={() => setRefDialog(false)}
        footer={
          <div>
            <Button
              label="Cancel"
              icon="pi pi-times"
              className="p-button-text"
              onClick={() => setRefDialog(false)}
            />
            <Button
              label="Save"
              icon="pi pi-check"
              className="p-button-text"
              onClick={() => saveNewRef()}
            />
          </div>
        }
      >
        <div className="p-field">
          <label htmlFor="name">Förnamn</label>
          <InputText id="firstname" required
            onChange={(e) => (emptyRef.firstName = e.target.value)} autoFocus />
          <label htmlFor="name">Efternamn</label>
          <InputText id="lastname" required
            onChange={(e) => (emptyRef.lastName = e.target.value)} autoFocus />
          <label htmlFor="name">Telefon</label>
          <InputText id="phone" required
            onChange={(e) => (emptyRef.phone = e.target.value)} autoFocus />
          <label htmlFor="name">E-post</label>
          <InputText id="email" required
            onChange={(e) => (emptyRef.email = e.target.value)} autoFocus />
          <label htmlFor="name">Adress</label>
          <InputText id="address" required
            onChange={(e) => (emptyRef.address = e.target.value)} autoFocus />
          <label htmlFor="name">Personnummer</label>
          <InputText id="personalNumber" required
            onChange={(e) => (emptyRef.personalNumber = e.target.value)} autoFocus />
          <label htmlFor="name">Clearingnummer</label>
          <InputText id="clearingNumber" required
            onChange={(e) => (emptyRef.clearingNumber = e.target.value)} autoFocus />
          <label htmlFor="name">Kontonummer</label>
          <InputText id="accountNumber" required
            onChange={(e) => (emptyRef.accountNumber = e.target.value)} autoFocus />
        </div>
      </Dialog>
    </div>
  );
}
