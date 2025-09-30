import { Drink } from "../Drink";

describe("Drink", () => {
    it("should create drink with correct properties", () => {
        const drink = new Drink("Coffee", 2, true, 2, "small");
        expect(drink.name).toBe("Coffee");
        expect(drink.basePrice).toBe(2);
        expect(drink.milk).toBe(true);
        expect(drink.sugar).toBe(2);
        expect(drink.size).toBe("small");
    });
});
