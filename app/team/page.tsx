"use client"

import firebase_app from "@/lib/firebase";
import { DocumentData, collection, getDocs, getFirestore, query } from "firebase/firestore";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import {Toolbar} from 'primereact/toolbar';
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";

let db = getFirestore(firebase_app);

export default function Teams(){
    const [teams, setTeams] = useState([] as any);
    const [teamDialog, setTeamDialog] = useState(false);
    let emptyTeam = {
        name: "",
        level: "",
    }

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
        emptyTeam = {
            name: "",
            level: "",
        }
        setTeamDialog(true);
    }


    const leftToolbar = () => {
        return(
            <div className="flex flex-wrapp gap-2">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
            </div>
        )
    }

    return(
        <div>
            <h1>Teams</h1>
            <Toolbar className="mb-4" left={leftToolbar}></Toolbar>
            <DataTable value={teams} header="Teams" className="p-datatable-gridlines" dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} emptyMessage="No teams found." >
                <Column field="name" header="Name" sortable></Column>
                <Column field="level" header="Level" sortable></Column>
            </DataTable>

            <Dialog visible={teamDialog} style={{ width: "450px" }} header="Team Details" modal className="p-fluid" footer={<div>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={() => setTeamDialog(false)} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={() => setTeamDialog(false)} />
            </div>}>
                <div className="p-field">
                    <label htmlFor="name">Name</label>
                    <InputText id="name" value={emptyTeam.name} onChange={(e) => emptyTeam.name = e.target.value} required autoFocus />

                    <label htmlFor="level">Level</label>
                    <InputText id="level" value={emptyTeam.level} onChange={(e) => emptyTeam.level = e.target.value} required autoFocus />

                    </div>
            </Dialog>

        </div>
    );
}