import { UserData } from "./MockData";
import { Test } from "./Test";

export enum State {
    TO_DO,
    IN_PROGRESS,
    DONE
}

export class UserStory{
    
    private _id : string; 
    private _tag : string;
    private _description : string;
    private _state : State;
    private _verified: boolean;
    private _test: Test;
    
    constructor(user?: UserData){
        if(user){
            this._id = user.id;
            this._tag = user.tag;
            this._description = user.description;
            this._state = user.state;
            this._verified = user.verified;
            this._test = user.test;
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
