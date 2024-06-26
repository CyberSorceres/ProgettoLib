import { API_interface } from "./API_interface";
import { EpicStory } from "./EpicStory";
import { Progetto} from "./Progetto";
import { UserStory } from "./UserStory";

export class API implements API_interface {
    private token: string;
    
//LOGIN
    async login(email: string, password: string): Promise<boolean> {
        const endpoint = 'https://rzjihxrx1e.execute-api.us-east-1.amazonaws.com/dev/login';
        try{
            const response = await fetch(endpoint, {method:'post', body: JSON.stringify({email,password})},);
            if(response.ok){
                this.token = (await response.json() as any).AuthenticationResult.IdToken;
                return true;
            }
            else{
                return false;
            }
        } catch(error){
            throw new Error(`Failed to fetch data from API: ${error.message}`);
        }
    }
    
    
//GET
    async getProgetto(id: string): Promise<Progetto> {
        try {
            const endpoint = 'https://rzjihxrx1e.execute-api.us-east-1.amazonaws.com/dev/getProgetti';
            const response = await this.authenticatedFetch(endpoint, );
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const jsonData: any[] = await response.json() as any[];
            const progetto = jsonData.find((progetto: any) => progetto.id === id);
            if (!progetto) {
                throw new Error(`Project with id ${id} not found`);
            }/*
            const pro: ProjectData = {
                id: progetto.id,
                name: progetto.name,
                isValidated: progetto.isValidated,
                epicStories: 
            }*/
            return progetto;
        } catch (error) {
            throw new Error(`Failed to fetch data from API: ${error.message}`);
        }
    }
    
    async getEpicStory(id: string): Promise<EpicStory | null> {
        try {
            const endpoint = 'https://rzjihxrx1e.execute-api.us-east-1.amazonaws.com/dev/getEpicStories';
            const response = await this.authenticatedFetch(endpoint);
            const jsonData: EpicStory[] = await response.json() as EpicStory[];
            const epicStory = jsonData.find((epic: EpicStory) => epic.id === id);
            if (!epicStory) {
                throw new Error(`Epic story with id ${id} not found`);
            }
            return epicStory;
        } catch (error) {
            throw new Error('Failed to fetch data from API: Epic story with that id not found');
        }
    }
    
    
    async getUserStory(id: string): Promise<UserStory | null> {
        try {
            const endpoint = 'https://rzjihxrx1e.execute-api.us-east-1.amazonaws.com/dev/getUserStories';
            const response = await this.authenticatedFetch(endpoint);
            const jsonData: UserStory[] = await response.json() as UserStory[]; 
            const userStory = jsonData.find((user: UserStory) => user.id === id);
            if (!userStory) {
                throw new Error(`User story with id ${id} not found`);
            }
            return userStory;
        } catch (error) {
            throw new Error('Failed to fetch data from API: User story with that id not found');
        }
    }
    
//ADD
    async addProject(progetto: Progetto): Promise<Boolean | null>{
        return null;
        //TODO
    }
    async addEpicStory(epic: EpicStory, projectId: string): Promise<string | null>{
        return null;
        //TODO
    }
    async addUserStrory(userStory: UserStory, epicId: string): Promise<Boolean | null>{
        return null;
        //TODO
    }
    
//UPDATE
    //updateUserStoryBasedOnFeedback(userStory: UserStory, feedback: Feedback): Promise<Boolean | null>
    splitUserStory(userStrory: UserStory): Promise<Boolean | null>{
        return null;
        //TODO
    }

        
//AI
    async bedrock(prompt: string): Promise<string> {
        const endpoint = `https://rzjihxrx1e.execute-api.us-east-1.amazonaws.com/dev/bedrock?message=${prompt}`;
        const response = await this.authenticatedFetch(endpoint);
        console.log(response);
        if(response.ok){
            return (await response.json() as any).response;
        }
        else{
            throw new Error('Failed to fetch data from API: AI could not generate a response');
        }
    }


    //chatgpt(prompt: string): Promise<string>;
    sendBusinessRequirementsToAI(businessRequirements: string, projectId: string): Promise<Boolean | null>{
         return null;
         //TODO
    }
    
    /*async chatgpt(prompt: string): Promise<string> {
        const endpoint = '...';
        const response = await this.authenticatedFetch(endpoint, {method:'get', body: JSON.stringify({prompt})});
        if(response.ok){
            return (await response.json() as any).response;
        }
        else{
            throw new Error('Failed to fetch data from API: AI could not generate a response');
        }
    }*/


//PRIVATE
    private async authenticatedFetch(url: string, options: object = {}): Promise<any>{
        return await fetch(url, {...options, headers: {Authorization: `Bearer ${this.token}`}});
    }
    
}
