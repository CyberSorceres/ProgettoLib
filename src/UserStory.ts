import { API_interface } from "./API_interface";
import { Test } from "./Test";

export enum State {
    TO_DO,
    IN_PROGRESS,
    DONE
}

export interface UserData {
    id: string;
    tag: string;
    description: string;
    state: State;
    verified: boolean;
}

export class UserStory{
    
    private _id : string; 
    private _tag : string;
    private _description : string;
    private _state : State;
    private _verified: boolean;
    private _test: Test;
    
    constructor (id: string){
        this._id = id; 
    }
    
    public async fetchData(myAPI: API_interface) {
        try {
            const UserData = await myAPI.getUserStory(this.id);
            
            if (UserData) {
                this.tag = UserData.tag;
                this.description = UserData.description;
                this.state = UserData.state;
                this.verified = UserData.verified;
                
            } else {
                // Handle case where project data is not found
                console.error(`User story with ID ${this.id} not found`);
            }
        } catch (error) {
            // Handle error from API call
            console.error(`Error fetching user story data for ID ${this.id}:`, error);
        }
    }

    //getters

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
    
    public get description():string{
        return this._description;
    }

    public get test(): Test{
        return this._test;
    }

    //setters
    
    public set tag(theTag: string){
        this._tag = theTag;
    }
    
    public set description(description: string){
        this._description = description;
    }

    public set state(state: State){
        this._state = state;
    }

    public set verified(verified: boolean){
        this._verified = verified;
    }

    public set test(test: Test){
        this._test = test;
    }
}
