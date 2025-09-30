import { Drink } from "../Drink";
import { CoffeeMachine } from "../CoffeeMachine";

describe("CoffeeMachine", () => {
    it("medium drink should cost 50 cents more", () => {
        const machine = new CoffeeMachine();
        const size = "medium";
        const drink = new Drink("Coffee", 2, false, 0, size);

        const result = machine.serve(drink, 2.5, false, 10);

        expect(result).toBe("Serving Coffee (medium)");
    });

    it("large drink should cost 1€ more", () => {
        const machine = new CoffeeMachine();
        const size = "large";
        const drink = new Drink("Coffee", 2, false, 0, size);

        const result = machine.serve(drink, 3, false, 10);

        expect(result).toBe("Serving Coffee (large)");
    });

    it("milk should add 20 cents", () => {
        const machine = new CoffeeMachine();
        const addMilk = true;
        const drink = new Drink("Coffee", 2, addMilk, 0, "small");

        const result = machine.serve(drink, 2.2, false, 10);

        expect(result).toBe("Serving Coffee (small)");
    });

    describe("sugar", () => {
        it("2 cubes of sugar should be free", () => {
            const machine = new CoffeeMachine();
            const sugarCubes = 2;
            const drink = new Drink("Coffee", 2, false, sugarCubes, "small");

            const result = machine.serve(drink, 2, false, 10);

            expect(result).toBe("Serving Coffee (small)");
        });

        it("every sugar cube on top of the 2 free should add 10 cents", () => {
            const machine = new CoffeeMachine();
            const sugarCubes = 5;
            const drink = new Drink("Coffee", 2, false, sugarCubes, "small");

            const result = machine.serve(drink, 2.3, false, 10);

            expect(result).toBe("Serving Coffee (small)");
        });

        it("should never allow more than 5 sugars", () => {
            const machine = new CoffeeMachine();
            const sugarCubes = 6;
            const drink = new Drink("Coffee", 2, false, sugarCubes, "small");

            const result = machine.serve(drink, 2, false, 10);

            expect(result).toBe("Error: too much sugar");
        });
    });

    // payment
    it("price should be invalid if lower than 0", () => {
        const machine = new CoffeeMachine();
        const drink = new Drink("Coffee", -0.5, false, 0, "small");

        const result = machine.serve(drink, 1, false, 10);

        expect(result).toBe("Error: invalid price");
    });

    it("should serve coffee if exact money inserted", () => {
        const machine = new CoffeeMachine();
        const drink = new Drink("Coffee", 2, false, 0, "small");

        const moneyInserted = 2;
        const result = machine.serve(drink, moneyInserted, false, 10);

        expect(result).toBe("Serving Coffee (small)");
    });

    it("should not serve when less money is inserted", () => {
        const machine = new CoffeeMachine();
        const drink = new Drink("Coffee", 2, false, 0, "small");

        const moneyInserted = 0.5;
        const result = machine.serve(drink, moneyInserted, false, 10);

        expect(result).toBe("Not enough money");
    });

    it("should return change", () => {
        const machine = new CoffeeMachine();
        const drink = new Drink("Coffee", 2, false, 0, "small");

        const moneyInserted = 3.5;
        const result = machine.serve(drink, moneyInserted, false, 10);

        expect(result).toBe("Serving Coffee (small) with change 1.50");
    });

    it("change should have 2 decimal places", () => {
        const machine = new CoffeeMachine();
        const drink = new Drink("Coffee", 2, false, 0, "small");

        const moneyInserted = 3.253;
        const result = machine.serve(drink, moneyInserted, false, 10);

        expect(result).toBe("Serving Coffee (small) with change 1.25");
    });

    describe("loyality card", () => {
        it("every fifth drink should be free", () => {
            const machine = new CoffeeMachine();
            const drink = new Drink("Coffee", 2, false, 0, "small");
            const hasLoyalityCard = true;

            machine.serve(drink, 2, true, 10);
            machine.serve(drink, 2, true, 10);
            machine.serve(drink, 2, true, 10);
            machine.serve(drink, 2, true, 10);

            const result = machine.serve(drink, 0, hasLoyalityCard, 10);

            expect(result).toBe("Serving Coffee (small)");
        });

        it("large drinks should be always paid for", () => {
            const machine = new CoffeeMachine();
            const drink = new Drink("Coffee", 2, false, 0, "large");
            const hasLoyalityCard = true;

            machine.serve(drink, 2, true, 10);
            machine.serve(drink, 2, true, 10);
            machine.serve(drink, 2, true, 10);
            machine.serve(drink, 2, true, 10);

            const result = machine.serve(drink, 0, hasLoyalityCard, 10);

            expect(result).toBe("Not enough money");
        });
    });

    it("drinks should be 20% cheaper during happy hours", () => {
        const machine = new CoffeeMachine();
        const drink = new Drink("Coffee", 2, false, 0, "small");

        const currentHour = 16;

        const result = machine.serve(drink, 1.6, true, currentHour);

        expect(result).toBe("Serving Coffee (small)");
    });
});
