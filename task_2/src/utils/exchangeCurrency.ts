import type {Currencies} from "../app";

export default async function exchangeCurrency(from: Currencies, fromAmount: number, to: Currencies): Promise<number> {
    const response = await fetch(`https://open.er-api.com/v6/latest/${from}`);
    const data = await response.json();
    return (data.rates[to] * fromAmount).toFixed(4);
}