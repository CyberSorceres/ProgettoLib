import { API_interface } from "./API_interface";
import { EpicStory } from "./EpicStory";
import { mockProjects, mockEpicStories, mockUserStories, ProjectData, EpicData, UserData } from "./MockData";
import { Progetto} from "./Progetto";
import { UserStory} from "./UserStory"


export class MockAPI implements API_interface{
	
//LOGIN
	login(email: string, password: string): Promise<boolean> {
		return Promise.resolve(true);
	}
	
	//GET
    getProgettiOfUser(): Promise<Progetto[]>{
		const progetti: Progetto[] = [new Progetto(mockProjects[0]), new Progetto(mockProjects[1])];
		return Promise.resolve(progetti);
	}

    getUserStoriesAssignedToUser(userId: string): Promise<UserStory[]>{
		const userStories: UserStory[] = [new UserStory(mockUserStories[0]), new UserStory(mockUserStories[1])];
		return Promise.resolve(userStories);
	}

	getProgetto(projectId: string): Promise<Progetto> {
		const progetto = new Progetto(mockProjects[projectId])
		return Promise.resolve(progetto);
	}
	
	getEpicStory(epicId: string, projectId: string): Promise<EpicStory> {
		const epic = new EpicStory(mockEpicStories[epicId]);
		return Promise.resolve(epic);
	}
	getUserStory(userId: string, projectId: string): Promise<UserStory> {
		const userStory = new UserStory(mockUserStories[userId])
		return Promise.resolve(userStory);
	}
	
	//ADD
	addProject(progetto: Progetto): Promise<Boolean>{
		return Promise.resolve(true);
	}
	addEpicStory(epic: EpicStory, projectId: string): Promise<string>{ //returns the id generated in the DB
		return Promise.resolve('1');
	}
	addUserStrory(userStory: UserStory, epicId: string): Promise<Boolean>{
		return Promise.resolve(true);
	}
	
	//UPDATE
	//updateUserStoryBasedOnFeedback(userStory: UserStory, feedback: Feedback): Promise<Boolean>
	splitUserStory(userStrory: UserStory): Promise<Boolean>{
		return Promise.resolve(true);
	}
	
	//AI
	public bedrock(prompt: string): Promise<string> {
		return Promise.resolve(prompt);
	}
	//chatgpt(prompt: string): Promise<string>;
	sendBusinessRequirementsToAI(businessRequirements: string, projectId: string): Promise<Boolean>{
		return Promise.resolve(true);
	}

	

}