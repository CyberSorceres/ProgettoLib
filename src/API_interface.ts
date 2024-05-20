import { ProjectData } from "./Progetto";
import { EpicData } from "./EpicStory";
import { UserData} from "./UserStory";

export interface API_interface {

    getProgetto(id: string): Promise<ProjectData | null>;
    getEpicStory(id: string): Promise<EpicData | null>;
    getUserStory(id: string): Promise<UserData | null>; 
    promptToAI(prompt: string): Promise<string>; 
}

