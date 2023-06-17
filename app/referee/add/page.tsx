"use client"

import { InputText } from 'primereact/inputtext';

export default function AddReferee(){
    return(
        <div>
        <h1>Lägg till domare</h1>
        <form>
            <InputText placeholder="Förnamn" />
        </form>
        </div>
    );
}