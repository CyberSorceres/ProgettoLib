import { API_interface } from "./API_interface";
import { UserStory } from "./UserStory";

export interface EpicData {
	id: string;
	descrizione: string;
	userStories: string[];
}

export class EpicStory{
	private _id: string;
	private _descrizione: string;
	private userStories: UserStory[] = [];
	
	
	constructor(id: string) {
		this._id = id;
		
	}
	
	public async fetchData(myAPI: API_interface) {
		try {
			const epicData = await myAPI.getEpicStory(this.id);
			
			if (epicData) {
				this.descrizione = epicData.descrizione;
				for (const userStoryId of epicData.userStories) {
					let user = new UserStory(userStoryId);
					user.fetchData(myAPI);
					this.userStories.push(user);
	
					}
			} else {
				// Handle case where project data is not found
				throw new Error(`Epic Story with ID ${this.id} not found`);
			}
		} catch (error) {
			// Handle error from API call
			throw new Error(`Error fetching epic story data for ID ${this.id}:`, error);
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

	public getUserStories(): UserStory[] {
        return this.userStories;
    }

    public getUserStoryById(id: string): UserStory | undefined {
        return this.userStories.find(userStory => userStory.id === id);
	}

	public getUserStoryByTag(tag: string): UserStory | undefined {
        return this.userStories.find(userStory => userStory.tag === tag);
	}
}