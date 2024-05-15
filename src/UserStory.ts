import { API_interface } from "./API_interface";

enum State {
    TO_DO,
    IN_PROGRESS,
    DONE
}

export interface UserData {
    id: string;
    descrizione: string;
  }

export class UserStory{
    
    private _id : string; 
    private _tag : string;
    private _description : string;
    private _state : State;
    private _verified: boolean;

    constructor (id: string){
        this._id = id; 
    }

    public async fetchData(myAPI: API_interface) {
        try {
            const UserData = await myAPI.getUserStory(this.id);

            if (UserData) {
              this.description = UserData.descrizione;
            } else {
              // Handle case where project data is not found
              console.error(`User story with ID ${this.id} not found`);
            }
          } catch (error) {
            // Handle error from API call
            console.error(`Error fetching user story data for ID ${this.id}:`, error);
          }
    }
    
    public get id(): string{
        return this._id;
    }

    public get tag(): string{
        return this._tag; 
    }

    public get verified(): boolean{
        return this._verified;
    }

    public get state(): State{
        return this._state;
    };

    public set tag(theTag: string){
        this._tag = theTag;
    }

    public get description():string{
        return this._description;
    }

    public set description(description: string){
        this._description = description;
    }
}
