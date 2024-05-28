import { API_interface } from "./API_interface";
import { EpicStory } from "./EpicStory";
import { exampleProjects, exampleEpicStories, exampleUserStories} from "./MockData";
import { Progetto} from "./Progetto";
import { UserStory} from "./UserStory"


export class MockAPI implements API_interface{
	private email: string;
	private password: string;

	
	//REGISTER AND LOGIN
	loggedIn(): boolean {
		return true;
	}
	
	register(email: string, password: string): Promise<boolean> {
		this.email = email;
		this.password = password;
		
		return Promise.resolve(true);
		
	}
	login(email: string, password: string): Promise<boolean> {
		if(email == this.email && password == this.password){
			return Promise.resolve(true);
		}
		else{
			return Promise.resolve(false);
		}
	}
	
	//GET
	getProgettiOfUser(): Promise<Progetto[]>{
		const progetti: Progetto[] = [exampleProjects[0], exampleProjects[1]];
		return Promise.resolve(progetti);
	}
	
	getUserStoriesAssignedToUser(): Promise<UserStory[]>{
		const userStories: UserStory[] = exampleUserStories; //MockData da aggiornare, perché deve essere aggiunto l'id dell'user sviluppatore alle user stories, o deve essere aggiunto il tag delle user stories all'user sviluppatore
		return Promise.resolve(userStories);
	}
	
	getProgetto(projectId: string): Promise<Progetto> {
		const progetto = exampleProjects.find(obj => obj.id === projectId);
		if(progetto){
			return Promise.resolve(progetto);
		}
		else{
			throw new Error(`Project with id ${projectId} not found`);
		}
	}
	
	getEpicStory(epicId: string, projectId: string): Promise<EpicStory> {
		const epic = exampleEpicStories.find(obj => obj.id === epicId);
		if(epic){
			return Promise.resolve(epic);
		}
		else{
			throw new Error(`Epic Story with id ${epicId} not found`);
		}
	}
	getUserStory(userId: string, projectId: string): Promise<UserStory> {
		const user = exampleUserStories.find(obj => obj.id === userId);
		if(user){
			return Promise.resolve(user);
		}
		else{
			throw new Error(`User Story with id ${userId} not found`);
		}
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

	//SET
	async setUserStoryState(projectId: string, userStoryId: string, passing: boolean): Promise<Boolean>{
		return true;
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