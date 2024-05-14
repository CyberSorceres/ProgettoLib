import { API } from "./API";

export class MockAPI implements API{
    
    public getProgetto(id: string): Promise<any>{
        const progetto = {
        id: id,
        nome: `Progetto ${id}`,
        validato: true,
        };
        
        return Promise.resolve(progetto);
    }
}

