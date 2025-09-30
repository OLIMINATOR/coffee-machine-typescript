import { Drink } from "./Drink";
import { CoffeeMachine } from "./CoffeeMachine";

const machine = new CoffeeMachine();
const drink = new Drink("Coffee", 2, true, 2, "small");

console.log(machine.serve(drink, 2.5, false, 14));
