import { API_interface } from "./API_interface";
import { EpicData } from "./MockData";
import {UserStory } from "./UserStory";

export class EpicStory{
	private _id: string;
	private _descrizione: string;
	private _userStoriesIds: string[];
	
	
	constructor(epic?: EpicData) {
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