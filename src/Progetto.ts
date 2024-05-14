import { EpicStory } from "./EpicStory";
import { API_interface } from "./API_interface";
import { API } from "./API";

export class Progetto{
    private _id: string;
    private _name: string;
    private _isValidated: boolean;
    private epicStories: EpicStory[];

    constructor(id: string, myAPI: API_interface){
        this._id = id;

        myAPI.getProgetto(this.id).then((responseData) => {
            this._name = responseData.property1;
            this._isValidated = responseData.property2;

            responseData.property3.forEach((epicStoryId: string) => {
                this.epicStories.push(new EpicStory(epicStoryId));
            });
        }).catch((error) => {
            console.error('Error loading data:', error);
        });
    }

    public get id(): string{
        return this._id
    }

    public get name(): string{
        return this._name;
    }

    public get isValidated(): boolean{
        return this._isValidated;
    }
    
}