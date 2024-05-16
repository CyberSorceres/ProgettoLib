import { EpicStory } from "./EpicStory";
import { API_interface } from "./API_interface";
import { MockAPI } from "./MockAPI";
// Define the ProjectData interface
export interface ProjectData {
	id: string;
	name: string;
	isValidated: boolean;
	epicStories: string[]; // Array of EpicStory IDs
}

export class Progetto{
	private _id: string;
	private _name: string;
	private _isValidated: boolean;
	private _epicStories: EpicStory[] = [];
	
	constructor(id: string){
		this._id = id;
	}
	
	public async fetchData(myAPI: API_interface){
		try {
			const projectData = await myAPI.getProgetto(this.id);
			
			if (projectData) {
				this._name = projectData.name;
				this._isValidated = projectData.isValidated;
				for (const epicStoryId of projectData.epicStories) {
					let epic = new EpicStory(epicStoryId);
					epic.fetchData(myAPI);
					this._epicStories.push(epic);
					
				}
			} else {
				// Handle case where project data is not found
				console.error(`Project with ID ${this.id} not found`);
			}
		} catch (error) {
			// Handle error from API call
			console.error(`Error fetching project data for ID ${this.id}:`, error);
		}
	}
	
	public get id(): string{
		return this._id
	}
	
	public get name(): string{
		return this._name;
	}
	
	public get isValidated(): boolean{
		return this._isValidated;
	}
	
	public get epicStories(): EpicStory[]{
		return this._epicStories;
	}
	
}