"use client";

import firebase_app from "@/lib/firebase";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

const db = getFirestore(firebase_app);

export default function AddReferee() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [adress, setAdress] = useState("");
  const [personNumber, setPersonNumber] = useState("");
  const [clearingNumber, setClearingNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  async function addReferee() {
    const referee = {
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      email: email,
      adress: adress,
      personalNumber: personNumber,
      clearingNumber: clearingNumber,
      accountNumber: accountNumber,
      created: new Date(),
    };

    await addDoc(collection(db, "referees"), referee);

    router.push("/referee");
  }

  return (
    <div>
      <h1>Lägg till domare</h1>
      <div className="grid gap-5">
        <InputText
          placeholder="Förnamn"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <InputText
          placeholder="Efternamn"
          onChange={(e) => setLastName(e.target.value)}
        />
        <InputText
          placeholder="Telefonnummer"
          onChange={(e) => setPhone(e.target.value)}
        />
        <InputText
          placeholder="epost"
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputText
          placeholder="adress"
          onChange={(e) => setAdress(e.target.value)}
        />
        <InputText
          placeholder="Personummer"
          onChange={(e) => setPersonNumber(e.target.value)}
        />
        <InputText
          placeholder="clearingnummer"
          onChange={(e) => setClearingNumber(e.target.value)}
        />
        <InputText
          placeholder="Kontonummer"
          onChange={(e) => setAccountNumber(e.target.value)}
        />
        <Button label="Lägg till" onClick={addReferee} />
      </div>
    </div>
  );
}
