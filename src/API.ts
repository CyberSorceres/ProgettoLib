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
            throw new Error('Failed to fetch data from API');
        }
    }

    async getEpicStory(id: string): Promise<EpicData | null> {
        const endpoint = 'https://d3ga6czusb.execute-api.eu-central-1.amazonaws.com/dev/getEpicStory'; //correggere url
        const response = await fetch(`${endpoint}?id=${id}`);
        const jsonData = await response.json() as EpicData;
        console.log(jsonData);
        return jsonData;
    }
    
    async getUserStory(id: string): Promise<UserData | null> {
        const endpoint = 'https://d3ga6czusb.execute-api.eu-central-1.amazonaws.com/dev/getUserStory'; //correggere url
        const response = await fetch(`${endpoint}?id=${id}`);
        const jsonData = await response.json() as UserData;
        console.log(jsonData);
        return jsonData;
    }

    async promptToAI(prompt: string): Promise<string> {
        return null;
    }
}