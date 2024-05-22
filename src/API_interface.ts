import { Progetto, ProjectData } from "./Progetto";
import { EpicData, EpicStory } from "./EpicStory";
import { UserData, UserStory} from "./UserStory";

export interface API_interface {
    getProgetto(id: string): Promise<Progetto | null>;
    getEpicStory(id: string): Promise<EpicStory | null>;
    getUserStory(id: string): Promise<UserStory | null>; 
    promptToAI(prompt: string): Promise<string>; //TODO changed based on lambda implementation
    login(email: string, password: string): Promise<boolean>;
}