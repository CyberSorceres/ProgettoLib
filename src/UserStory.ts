enum State {
    TO_DO,
    IN_PROGRESS,
    DONE
}

//TODO UserData

export class UserStory{
    
    private _id : string; 
    private _tag : string;
    private _description : string;
    private _state : State;
    private _verified: boolean;

    constructor (id: string){
        this._id = id; 
    }

    //TODO fetchData(myAPI....)
    
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
