export class User {
    private _email: string;
    private _firstName: string;
    private _lastName: string;
    private _post: string;
    private _phone: string;  
    private  __id :string

    constructor(
        _id:string,
        email: string,
        firstName: string,
        lastName: string,
        post: string,
        phone: string
    ) {
        this.__id=_id
        this._email = email;
        this._firstName = firstName;
        this._lastName = lastName;
        this._post = post;
        this._phone = phone;
    }

    get email(): string {
        return this._email;
    }

    get firstName(): string {
        return this._firstName;
    }
    get _id(): string {
        return this.__id;
    }

    get lastName(): string {
        return this._lastName;
    }

    get post(): string {
        return this._post;
    }

    get phone(): string {
        return this._phone;
    }
}
