import { Drink } from "../Drink";
import { CoffeeMachine } from "../CoffeeMachine";

describe("CoffeeMachine", () => {
    it("should serve coffee if exact money inserted", () => {
        const machine = new CoffeeMachine();

        const drink = new Drink("Coffee", 2, false, 0, "small");

        expect(machine.serve(drink, 2, false, 10)).toBe(
            "Serving Coffee (small)"
        );
    });
});
