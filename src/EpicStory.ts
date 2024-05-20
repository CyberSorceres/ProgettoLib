import { API_interface } from "./API_interface";
import { UserData, UserStory } from "./UserStory";

export interface EpicData {
	id: string;
	descrizione: string;
	userStories: UserData[];
}

export class EpicStory{
	private _id: string;
	private _descrizione: string;
	private _userStories: UserStory[] = [];
	
	
	constructor(id: string, epic?: EpicData) {
		this._id = id;
		
		if(epic){
			this._id = epic.id;
			this._descrizione = epic.descrizione;
			for(const user of epic.userStories){
				this._userStories.push(new UserStory('0', user));
			}
		}
	}
	
	public async fetchData(myAPI: API_interface) {
		try {
			const epicData = await myAPI.getEpicStory(this.id);
			
			if (epicData) {
				this._descrizione = epicData.descrizione;
				for (const userStory of epicData.userStories) {
					let user = new UserStory(userStory.id);
					user.fetchData(myAPI);
					this._userStories.push(user);
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

	public get userStories(): UserStory[] {
        return this._userStories;
    }

    public getUserStoryById(id: string): UserStory | undefined {
        return this.userStories.find(userStory => userStory.id === id);
	}

	public getUserStoryByTag(tag: string): UserStory | undefined {
        return this.userStories.find(userStory => userStory.tag === tag);
	}
}