import { ProductModelInterface } from './../../Interfaces/product-model-interface';

export class LaptopModel implements ProductModelInterface {
    constructor(
    public name: string,
    public price: number,
    public cpu: string,
    public graphic: string,
    public screenSize: number ) { }
    
    public id = 0;
    public category = "laptop" as const;
    public dbPath = "";
    
}