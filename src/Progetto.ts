import { API_interface } from "./API_interface";
import { ProjectData } from "./MockData";

export class Progetto{
	private _id: string;
	private _name: string;
	private _isValidated: boolean;
	private _epicStoriesIds: string[];
	
	constructor(project?: ProjectData){
		if(project){ //construct project from projectData
			this._id = project.id;
			this._name = project.name;
			this._isValidated = project.isValidated;
			this._epicStoriesIds = project.epicStoriesIds;
		}
	}
	
	public async fetchData(myAPI: API_interface, projectId: string){ //given an API instance and a projectId, initialize all the fields
		try {
			const projectData = await myAPI.getProgetto(projectId);
			
			if (projectData) {
				this._name = projectData.name;
				this._isValidated = projectData.isValidated;
				this._epicStoriesIds = projectData.epicStoriesIds;
					
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
	
	public get epicStoriesIds(): string[]{
		return this._epicStoriesIds;
	}
}