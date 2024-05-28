import { Progetto } from "./Progetto";
import { EpicStory } from "./EpicStory";
import { UserStory} from "./UserStory";

export enum LoginState {
    FAILED = 0,
    LOGGED_IN,
    MUST_SIGN_UP,
}

export interface API_interface {
    loggedIn(): boolean;
    //LOGIN
    login(email: string, password: string): Promise<LoginState>;
    register(email: string, password: string): Promise<boolean>;

    //GET
    getProgettiOfUser(): Promise<Progetto[]>;
    getUserStoriesAssignedToUser(): Promise<UserStory[]>;

    getProgetto(projectId: string): Promise<Progetto>;
    getEpicStory(epicId: string, projectId: string): Promise<EpicStory>;    
    getUserStory(userStoryId: string,  projectId: string): Promise<UserStory>;
    
    //ADD
    addProject(progetto: Progetto): Promise<Boolean>;
    addEpicStory(epic: EpicStory, projectId: string): Promise<string>; //returns the id generated in the DB
    addUserStrory(userStory: UserStory, projectId: string, epicStoryId: string): Promise<Boolean>;
    
    //UPDATE
    //updateUserStoryBasedOnFeedback(userStory: UserStory, feedback: Feedback): Promise<Boolean>
    splitUserStory(userStrory: UserStory): Promise<Boolean>;

    //SET
    setUserStoryState(projectId: string, userStoryId: string, passing: boolean): Promise<Boolean>;

    //AI
    bedrock(prompt: string): Promise<string>;
    //chatgpt(prompt: string): Promise<string>;
    sendBusinessRequirementsToAI(businessRequirements: string, projectId: string): Promise<Boolean>;
}
