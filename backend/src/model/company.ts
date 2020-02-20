export class Company {
    private _id: number;
    private _symbol: string;
    private _name: string;
    private _yearFounded: number;
    private _numberOfEmployees: string;
    private _address: string;
    private _country: string;
    private _date: string;
    private _previousClosePrice: number;
    private _openPrice: number;
    private _marketCap: number;
    
    public get id(): number {
        return this._id;
    }

    public get symbol(): string {
        return this._symbol;
    }

    public set symbol(value: string) {
        this._symbol = value;
    }

    public get name(): string {
        return this._name;
    }
   
    public set name(value: string) {
        this._name = value;
    }
   
    public get yearFounded(): number {
        return this._yearFounded;
    }
   
    public set yearFounded(value: number) {
        this._yearFounded = value;
    }
   
    public get numberOfEmployees(): string {
        return this._numberOfEmployees;
    }
   
    public set numberOfEmployees(value: string) {
        this._numberOfEmployees = value;
    }
   
    public get address(): string {
        return this._address;
    }
   
    public set address(value: string) {
        this._address = value;
    }
    public get country(): string {
        return this._country;
    }
    public set country(value: string) {
        this._country = value;
    }
    public get date(): string {
        return this._date;
    }
    public set date(value: string) {
        this._date = value;
    }
    public get previousClosePrice(): number {
        return this._previousClosePrice;
    }
    public set previousClosePrice(value: number) {
        this._previousClosePrice = value;
    }
    public get openPrice(): number {
        return this._openPrice;
    }
    public set openPrice(value: number) {
        this._openPrice = value;
    }
    public get marketCap(): number {
        return this._marketCap;
    }
    public set marketCap(value: number) {
        this._marketCap = value;
    }





}