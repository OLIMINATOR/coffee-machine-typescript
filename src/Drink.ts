export class Drink {
    constructor(
        public name: string,
        public basePrice: number,
        public milk: boolean,
        public sugar: number,
        public size: "small" | "medium" | "large"
    ) {}
}
