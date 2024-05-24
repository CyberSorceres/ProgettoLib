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

    async register(email: string, password: string): Promise<boolean>{
        const endpoint = `${API.baseUrl}/register`;
        try{
            const response = await fetch(endpoint, {method:'post', body: JSON.stringify({email,password})},);
            if(response.ok){
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

    async getUserStoriesAssignedToUser(userId: string): Promise<UserStory[]>{
        //TODO implement
        const endpoint = `${API.baseUrl}/getUserStoriesAssignedToUser?`; //TODO Add lambda + API in backend
        try {
            const response = await this.authenticatedFetch(endpoint);
            if (response.ok) {
                const userStories: UserStory[] = [];
                for (const story of await response.json()) {
                    userStories.push(new UserStory(story.id, story.tag, story.description, story.state, story.verified, story.test));
                }
                return userStories;
            } else {
                throw new Error('Failed to fetch user stories assigned to the user.');
            }
        } catch (error) {
            throw new Error(`Failed to fetch data from API: ${error.message}`);
        }
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
            const endpoint = `${API.baseUrl}/getProgetto`;
            const body = JSON.stringify({
                "projectId": projectId,
                "epicStoryId": epicId
              });
            const response = await this.authenticatedFetch(endpoint, {body});
            if(response.ok){
                const epic = response.json();
                return new EpicStory(epic.id, epic.descrizione, epic.userStories);
            }
            else{
                return undefined;
            }
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
    async addProject(progetto: Progetto): Promise<Boolean>{//TODO decide if its better to return the id
        try {
            const endpoint = `${API.baseUrl}/add_progetto`;
            const body = JSON.stringify({
                "name": progetto.name
            });
            
            const response = await this.authenticatedFetch(endpoint, { body });
            
            if (response.ok) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            throw new Error("Error adding project:", error);//TODO is throwing error ok?
        }
    }
    async addEpicStory(epic: EpicStory, projectId: string): Promise<string>{//TODO the labda should return the id
        try {
            const endpoint = `${API.baseUrl}/add_epic_story`;
            const body = JSON.stringify({
                "description": epic.descrizione,
                "projecId": projectId
            });
            
            const response = await this.authenticatedFetch(endpoint, { body });
            
            if (response.ok) {
                epic = response.json();
                return epic.descrizione;
            } else {
                return undefined;
            }
        } catch (error) {
            throw new Error("Error adding episctory:", error);//TODO is throwing error ok?
        }
    }
    async addUserStrory(userStory: UserStory, projecId: string): Promise<Boolean>{
        try {
            const endpoint = `${API.baseUrl}/add_user_story`;
            const body = JSON.stringify({ //TODO fix fields in lambda
                "projectId": projecId,
                "epicStoryId": "id",//FIXME epic story id shouldnt be necessary
                "tag": "tag", //FIXME tag should be generated automatically
                "description": userStory.description
            });
            
            const response = await this.authenticatedFetch(endpoint, { body });
            
            if (response.ok) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            throw new Error("Error adding project:", error);//TODO is throwing error ok?
        }
    }
    
//UPDATE
    //updateUserStoryBasedOnFeedback(userStory: UserStory, feedback: Feedback): Promise<Boolean>
    splitUserStory(userStrory: UserStory): Promise<Boolean>{
        return null;
        //TODO
    }

        
//AI
    async bedrock(prompt: string): Promise<string> {
        try {
            const endpoint = `${API.baseUrl}/bedrock`;
            const body = JSON.stringify({
                "message": prompt
            });
            
            const response = await this.authenticatedFetch(endpoint, { body });
            
            if (response.ok) {
                const responseMessage = response.json();
                return responseMessage.text;
            } else {
                return undefined;
            }
        } catch (error) {
            throw new Error("Error while triync to connect to bedrock:", error);//TODO is throwing error ok?
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
