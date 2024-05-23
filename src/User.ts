export enum RUOLO {
    SVILUPPATORE,
    PM,
    CLIENTE
}

export class User {
    private _id: string;
    private _ruolo: RUOLO;
    private _nome: string;
    private _mail: string;
    
    get id(): string {
        return this._id;
    }
    
    get ruolo(): RUOLO {
        return this._ruolo;
    }
    
    get nome(): string {
        return this._nome;
    }
    
    get mail(): string {
        return this._mail;
    }
}