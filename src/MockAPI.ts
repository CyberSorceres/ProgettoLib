import { API_interface } from "./API_interface";
import { EpicData, EpicStory } from "./EpicStory";
import { mockProjects, mockEpicStories, mockUserStories } from "./MockData";
import { Progetto, ProjectData } from "./Progetto";
import { UserData, UserStory} from "./UserStory"


export class MockAPI implements API_interface{
	
//LOGIN
	login(email: string, password: string): Promise<boolean> {
		return Promise.resolve(true);
	}
	
	//GET
	getProgetto(myId: string): Promise<Progetto | null> {
		// Simulate fetching project data from a mock data source
		const mockProject: ProjectData | undefined = mockProjects.find(project => project.id === myId);
		
		return Promise.resolve(new Progetto('0', mockProject));
	}
	
	getEpicStory(myId: string): Promise<EpicStory | null> {
		const mockEpic: EpicData | undefined = mockEpicStories.find(epic => epic.id === myId);
		
		return Promise.resolve(new EpicStory('0', mockEpic));
	}
	getUserStory(myId: string): Promise<UserStory | null> {
		const mockUser: UserData | undefined = mockUserStories.find(user => user.id === myId);
		
		return Promise.resolve(new UserStory('0', mockUser));
	}
	
	//ADD
	addProject(progetto: Progetto): Promise<Boolean | null>{
		return null;
		//TODO
	}
	addEpicStory(epic: EpicStory, projectId: string): Promise<string | null>{ //returns the id generated in the DB
		return null;
		//TODO
	}
	addUserStrory(userStory: UserStory, epicId: string): Promise<Boolean | null>{
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
	public bedrock(prompt: string): Promise<string> {
		return Promise.resolve(prompt);
	}
	//chatgpt(prompt: string): Promise<string>;
	sendBusinessRequirementsToAI(businessRequirements: string, projectId: string): Promise<Boolean | null>{
		return null;
		//TODO
	}

	

}