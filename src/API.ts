import { API_interface } from "./API_interface";
import { EpicStory } from "./EpicStory";
import { Progetto} from "./Progetto";
import { UserStory } from "./UserStory";

export class API implements API_interface {
    private token: string;
    private static baseUrl: string = 'https://rzjihxrx1e.execute-api.us-east-1.amazonaws.com/dev';
    
//LOGIN
    async login(email: string, password: string): Promise<boolean> {
        const endpoint = `${API.baseUrl}/login`;
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
    async getProgettiOfUser(): Promise<Progetto[]>{
        const endpoint = `${API.baseUrl}/getProgetti`;
        try{
            const response = await this.authenticatedFetch(endpoint);
            if(response.ok){
                let progetti: Progetto[] = [];
                for(const prog of await response.json()){
                    progetti.push(new Progetto(prog.id, prog.name, prog.validated, prog.epicStories, prog.ai));
                }
                return progetti;
            }
            else{
                return undefined;
            }
        } catch(error){
            throw new Error(`Failed to fetch data from API: ${error.message}`);
        }
    }

    getUserStoriesAssignedToUser(userId: string): Promise<UserStory[]>{
        return undefined; //TODO implement
    }

    async getProgetto(id: string): Promise<Progetto> {//FIXME
        try {
            const endpoint = `${API.baseUrl}/getProgetto?${id}`;
            const response = await this.authenticatedFetch(endpoint, );
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
    
    async getEpicStory(epicId: string, projectId: string): Promise<EpicStory> {
        try {
            const endpoint = `${API.baseUrl}/getProgetto?projectId=${projectId}?epicStoryId=${epicId}`;
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
    
    
    async getUserStory(id: string): Promise<UserStory> {
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
    async addProject(progetto: Progetto): Promise<Boolean>{
        return null;
        //TODO
    }
    async addEpicStory(epic: EpicStory, projectId: string): Promise<string>{
        return null;
        //TODO
    }
    async addUserStrory(userStory: UserStory, epicId: string): Promise<Boolean>{
        return null;
        //TODO
    }
    
//UPDATE
    //updateUserStoryBasedOnFeedback(userStory: UserStory, feedback: Feedback): Promise<Boolean>
    splitUserStory(userStrory: UserStory): Promise<Boolean>{
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
    sendBusinessRequirementsToAI(businessRequirements: string, projectId: string): Promise<Boolean>{
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
