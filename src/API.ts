import { API_interface } from "./API_interface";
import { EpicData } from "./EpicStory";

export class API implements API_interface {
    async getProgetto(id: string): Promise<any> {
        try {
            const endpoint = '..url..?id=';
            const response = await fetch(`endpoint${id}`);
            const jsonData = await response.json();
            return jsonData;
        } catch (error) {
            throw new Error('Failed to fetch data from API');
        }
    }

    async getEpicStory(id: string): Promise<EpicData | null> {
        return null;
        //TODO
    }
}