export type Currencies = "USD" | "EUR" | "GBP" | "JPY" | "RUB";

export type State = {
    currency: Currencies,
    amount: number
};