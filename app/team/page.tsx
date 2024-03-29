"use client";

import firebase_app from "@/lib/firebase";
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
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
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

export default function Teams() {
  const { addMessage } = useToastContext();
  const [teams, setTeams] = useState([] as any);
  const [teamDialog, setTeamDialog] = useState(false);
  const [emptyTeam, setEmptyTeam] = useState({
    name: "",
    level: "",
  } as any);

  useEffect(() => {
    const q = query(collection(db, "teams"));
    getDocs(q).then((querySnapshot) => {
      let data: DocumentData[] = [];
      querySnapshot.forEach((doc) => {
        const d = doc.data();
        d.id = doc.id;
        data.push(d);
      });
      setTeams(data);
    });
  }, []);

  const openNew = () => {
    setEmptyTeam({
      name: "",
      level: "",
      created: new Date(),
    });

    setTeamDialog(true);
  };

  const saveTeam = () => {
    // Check name and level
    if (
      emptyTeam.name.trim().length === 0 ||
      emptyTeam.level.trim().length === 0
    ) {
      return;
    }

    addDoc(collection(db, "teams"), emptyTeam);
    addMessage({
      severity: "success",
      summary: "Lag tillagt",
      detail: `Laget ${emptyTeam.name} har lagts till.`,
    });
    setTeamDialog(false);
  };

  const onRowComplete = (e: any) => {
    const newData = e.newData;
    const id = e.data.id;
    const docRef = doc(db, "teams", id);
    setDoc(docRef, newData);

    const newTeams = teams.map((team: any) => {
      if (team.id === id) {
        return newData;
      }
      return team;
    });
    setTeams(newTeams);

    addMessage({
      severity: "success",
      summary: "Lag uppdaterat",
      detail: `Laget ${newData.name} har uppdaterats.`,
    });
  };

  const leftToolbar = () => {
    return (
      <div className="flex flex-wrapp gap-2">
        <Button
          label="New"
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
        value={teams}
        header="Teams"
        className="p-datatable-striped p-datatable-gridlines"
        dataKey="id"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        emptyMessage="No teams found."
        editMode="row"
        onRowEditComplete={onRowComplete}
      >
        <Column
          field="name"
          header="Name"
          sortable
          editor={(options) => textEditor(options)}
        ></Column>
        <Column
          field="level"
          header="Level"
          sortable
          editor={(options) => textEditor(options)}
        ></Column>
        <Column
          rowEditor
          headerStyle={{ width: "10%", minWidth: "8rem" }}
          bodyStyle={{ textAlign: "center" }}
        ></Column>
      </DataTable>

      <Dialog
        visible={teamDialog}
        style={{ width: "450px" }}
        header="Team Details"
        modal
        className="p-fluid"
        onHide={() => setTeamDialog(false)}
        footer={
          <div>
            <Button
              label="Cancel"
              icon="pi pi-times"
              className="p-button-text"
              onClick={() => setTeamDialog(false)}
            />
            <Button
              label="Save"
              icon="pi pi-check"
              className="p-button-text"
              onClick={() => saveTeam()}
            />
          </div>
        }
      >
        <div className="p-field">
          <label htmlFor="name">Name</label>
          <InputText
            id="name"
            onChange={(e) => (emptyTeam.name = e.target.value)}
            required
            autoFocus
          />

          <label htmlFor="level">Level</label>
          <InputText
            id="level"
            onChange={(e) => (emptyTeam.level = e.target.value)}
            required
            autoFocus
          />
        </div>
      </Dialog>
    </div>
  );
}
