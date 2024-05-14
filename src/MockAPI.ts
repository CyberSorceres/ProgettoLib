import { API } from "./API";

export class MockAPI implements API{
    
    public getProgetto(id: string): Promise<any>{
        const progetto = {
        id: id,
        nome: `Progetto ${id}`,
        validato: Math.random() > 0.5 // Simula una validazione casuale tra true 1 e false 0
        };
        
        return Promise.resolve(progetto);
    }
}