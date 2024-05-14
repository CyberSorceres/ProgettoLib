export class UserStory{
    private _id : string; 
    private _tag : string;
    private _description : string;

    constructor (id: string){
        this._id = id; 
    }

    public get id(): string{
        return this._id;
    }

    public get tag(): string{
        return this._tag; 
    }

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
