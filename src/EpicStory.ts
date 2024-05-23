import { API_interface } from "./API_interface";
import { EpicData } from "./MockData";
import {UserStory } from "./UserStory";

export class EpicStory{
	private _id: string;
	private _descrizione: string;
	private _userStoriesIds: string[];
	
	
	constructor(id: string, descrizione: string, userStoriesIds: string[], epic?: EpicData) 
	{
		this._id = id;
		this._descrizione = descrizione;
		this._userStoriesIds = userStoriesIds;
		if(epic){
			this._id = epic.id;
			this._descrizione = epic.descrizione;
			this._userStoriesIds = epic.userStoriesIds;
		}
	}

	
	public get id():string {
		return this._id;
	}
	
	public get descrizione():string {
		return this._descrizione;
	}
	
	public set descrizione(descrizione: string) {
		this._descrizione = descrizione;
	}

	public get userStoriesIds(): string[] {
        return this._userStoriesIds;
    }
}