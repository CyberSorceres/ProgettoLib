export class Feedback {
    private _id: string;
    private _text: string;

    get id(): string{
        return this._id;
    }

    get text(): string{
        return this._text;
    }
}