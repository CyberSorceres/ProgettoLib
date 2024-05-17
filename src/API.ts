import { API_interface } from "./API_interface";
import { EpicData, EpicStory } from "./EpicStory";
import { UserData } from "./UserStory";

export class API implements API_interface {
    async getProgetto(id: string): Promise<any> {
        try {
            const endpoint = '..url..?id=';
            const response = await fetch(`${endpoint}${id}`);
            const jsonData = await response.json();
            return jsonData;
        } catch (error) {
            throw new Error('Failed to fetch data from API'); //l'api getProgetti returns all the project in the database so in this function we need to call this api 'https://rzjihxrx1e.execute-api.us-east-1.amazonaws.com/dev/getProgetti' and return the progect that has the id we want.
        }
    }

    async getEpicStory(id: string): Promise<EpicData | null> {
        const endpoint = 'https://rzjihxrx1e.execute-api.us-east-1.amazonaws.com/dev/getProgetti'; 
        const response = await fetch(`${endpoint}?id=${id}`);
        const jsonData = await response.json() as EpicData;
        console.log(jsonData);
        return jsonData;
    }
    //l'api getProgetti returns all the project in the database so in this function we need to call this api 'https://rzjihxrx1e.execute-api.us-east-1.amazonaws.com/dev/getProgetti' and return the progect that has the id we want. getuserstory e getepicstory
    
    async getUserStory(id: string): Promise<UserData | null> {
        const endpoint = 'https://rzjihxrx1e.execute-api.us-east-1.amazonaws.com/dev/getProgetti'; 
        const response = await fetch(`${endpoint}?id=${id}`);
        const jsonData = await response.json() as UserData;
        console.log(jsonData);
        return jsonData;
    }

    async promptToAI(prompt: string): Promise<string> {
        return null;
    }
}