import { FilterModelInterface } from "src/app/Interfaces/filter-model-intreface";

export class LaptopBagFilterModel implements FilterModelInterface {
    public priceFrom!: number;
    public priceTo!: number;
    public laptopScreenSize: string = '';
}