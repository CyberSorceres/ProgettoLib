import { EpicData, EpicStory } from "./EpicStory";
import { API_interface } from "./API_interface";
import { MockAPI } from "./MockAPI";
// Define the ProjectData interface
export interface ProjectData {
	id: string;
	name: string;
	isValidated: boolean;
	epicStories: EpicData[]; // Array of EpicStory IDs
}

export class Progetto{
	private _id: string;
	private _name: string;
	private _isValidated: boolean;
	private _epicStories: EpicStory[] = [];
	
	constructor(id: string, project?: ProjectData){
		this._id = id;
		if(project){
			this._id = project.id;
			this._name = project.name;
			this._isValidated = project.isValidated;
			for(const epic of project.epicStories){
				this._epicStories.push(new EpicStory('0', epic));
			}
		}
	}
	
	public async fetchData(myAPI: API_interface){
		try {
			const projectData = await myAPI.getProgetto(this.id);
			
			if (projectData) {
				this._name = projectData.name;
				this._isValidated = projectData.isValidated;
				for (const epicStory of projectData.epicStories) {
					let epic = new EpicStory(epicStory.id);
					epic.fetchData(myAPI);
					this._epicStories.push(epic);
					
				}
			} else {
				// Handle case where project data is not found
				throw new Error(`Project with ID ${this.id} not found`);
			}
		} catch (error) {
			// Handle error from API call
			throw new Error(`Error fetching project data for ID ${this.id}:`, error);
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

	public getEpicStoryById(id: string): EpicStory | undefined {
        return this.epicStories.find(epicStory => epicStory.id === id);
	}
}