import { FilterModelInterface } from "src/app/Interfaces/filter-model-intreface";

export class LaptopFilterModel implements FilterModelInterface {
        public priceFrom!: number;
        public priceTo!: number;
        public cpu: string = '';
        public graphic: string = '';
        public screenSize: string = '';

}