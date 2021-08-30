import { ProductModelInterface } from './../../Interfaces/product-model-interface';

export class LaptopBagModel implements ProductModelInterface {
    constructor(
        public name: string,
        public price: number,
        public laptopScreenSize: number ) { }
        
        public id = 0;
        public category = "laptopBag" as const;
        public dbPath = "";
}