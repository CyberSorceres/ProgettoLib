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
    getProgettiOfUser(userId: string): Promise<Progetto[]>{
		const progetti: Progetto[] = [new Progetto(mockProjects[0]), new Progetto(mockProjects[1])];
		return Promise.resolve(progetti);
	}

    getUserStoriesAssignedToUser(userId: string): Promise<UserStory[]>{
		const userStories: UserStory[] = [new UserStory(mockUserStories[0]), new UserStory(mockUserStories[1])];
		return Promise.resolve(userStories);
	}

	getProgetto(myId: string): Promise<Progetto> {
		// Simulate fetching project data from a mock data source
		const mockProject: ProjectData | undefined = mockProjects.find(project => project.id === myId);
		
		return Promise.resolve(new Progetto(mockProject));
	}
	
	getEpicStory(myId: string): Promise<EpicStory> {
		const mockEpic: EpicData | undefined = mockEpicStories.find(epic => epic.id === myId);
		
		return Promise.resolve(new EpicStory(mockEpic));
	}
	getUserStory(myId: string): Promise<UserStory> {
		const mockUser: UserData | undefined = mockUserStories.find(user => user.id === myId);
		
		return Promise.resolve(new UserStory(mockUser));
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