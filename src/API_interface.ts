import { Progetto } from "./Progetto";
import { EpicStory } from "./EpicStory";
import { UserStory} from "./UserStory";

export interface API_interface {
    //LOGIN
    login(email: string, password: string): Promise<boolean>;

    //GET
    getProgetto(projectId: string): Promise<Progetto | null>;
    getEpicStory(epicId: string): Promise<EpicStory | null>;    
    getUserStory(userStoryId: string): Promise<UserStory | null>;
    
    //ADD
    addProject(progetto: Progetto): Promise<Boolean | null>;
    addEpicStory(epic: EpicStory, projectId: string): Promise<string | null>; //returns the id generated in the DB
    addUserStrory(userStory: UserStory, epicId: string): Promise<Boolean | null>;
    
    //UPDATE
    //updateUserStoryBasedOnFeedback(userStory: UserStory, feedback: Feedback): Promise<Boolean | null>
    splitUserStory(userStrory: UserStory): Promise<Boolean | null>;

    //AI
    bedrock(prompt: string): Promise<string>;
    //chatgpt(prompt: string): Promise<string>;
    sendBusinessRequirementsToAI(businessRequirements: string, projectId: string): Promise<Boolean | null>;
}