import { Progetto } from "./Progetto";
import { EpicStory } from "./EpicStory";
import { UserStory} from "./UserStory";

export interface API_interface {
    getProgetto(id: string): Promise<Progetto | null>;
    getEpicStory(id: string): Promise<EpicStory | null>;
    getUserStory(id: string): Promise<UserStory | null>; 
    bedrock(prompt: string): Promise<string>; //TODO changed based on lambda implementation
    //chatgpt(prompt: string): Promise<string>; 
    login(email: string, password: string): Promise<boolean>;
}