export class EpicStory{
    private _id: string;
    private _descrizione: string;

    constructor(id: string) {
        this._id = id;

        //call to getEpicStory(id).......
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
}