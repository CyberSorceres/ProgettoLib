import { API_interface } from "./API_interface";
import { EpicData, EpicStory } from "./EpicStory";
import { UserData } from "./UserStory";

export class API implements API_interface {
    async getProgetto(id: string): Promise<any> {
        try {
            const endpoint = 'https://rzjihxrx1e.execute-api.us-east-1.amazonaws.com/dev/getProgetti';
            const response = await fetch(endpoint);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const jsonData: any[] = await response.json() as any[];
            const progetto = jsonData.find((progetto: any) => progetto.id === id);
            if (!progetto) {
                throw new Error(`Project with id ${id} not found`);
            }
            return progetto;
        } catch (error) {
            throw new Error(`Failed to fetch data from API: ${error.message}`);
        }
    }
    
    async getEpicStory(id: string): Promise<EpicData | null> {
        try {
            const endpoint = 'https://rzjihxrx1e.execute-api.us-east-1.amazonaws.com/dev/getEpicStories';
            const response = await fetch(endpoint);
            const jsonData: EpicData[] = await response.json() as EpicData[];
            const epicStory = jsonData.find((epic: EpicData) => epic.id === id);
            if (!epicStory) {
                throw new Error(`Epic story with id ${id} not found`);
            }
            return epicStory;
        } catch (error) {
            throw new Error('Failed to fetch data from API: Epic story with that id not found');
        }
    }

    
    async getUserStory(id: string): Promise<UserData | null> {
        try {
            const endpoint = 'https://rzjihxrx1e.execute-api.us-east-1.amazonaws.com/dev/getUserStories';
            const response = await fetch(endpoint);
            const jsonData: UserData[] = await response.json() as UserData[]; 
            const userStory = jsonData.find((user: UserData) => user.id === id);
            if (!userStory) {
                throw new Error(`User story with id ${id} not found`);
            }
            return userStory;
        } catch (error) {
            throw new Error('Failed to fetch data from API: User story with that id not found');
        }
    }

    async promptToAI(prompt: string): Promise<string> {
        return null;
    }
}