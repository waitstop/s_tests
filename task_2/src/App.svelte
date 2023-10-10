<script lang="ts">
    import type {Currencies, State} from './app.d.ts'
    import debounce from "./utils/debounce";
    import exchangeCurrency from "./utils/exchangeCurrency";

    let currencies: Currencies[] = ['USD', 'EUR', 'GBP', 'JPY', 'RUB']

    let state: State[] = [
        {
            currency: 'USD',
            amount: 0
        },
        {
            currency: 'RUB',
            amount: 0
        }
    ]

    async function updateCurrency(event: Event, index: number) {
        const target = event.target as HTMLSelectElement;
        state[index] = {
            ...state[index],
            currency: target.value as Currencies,
        }
        const newAmount = await exchangeCurrency(
            state[index].currency,
            state[index].amount,
            state[index === 0 ? 1:0].currency
        )
        state[index === 0 ? 1 : 0] = {
            ...state[index === 0 ? 1 : 0],
            amount: newAmount
        }
    }

    function updateAmount(event: Event, index: number) {
        const target = event.target as HTMLInputElement;
        state[index] = {
            ...state[index],
            amount: parseFloat(target.value)
        }
        debounce(async () => {
            const newAmount = await exchangeCurrency(
                state[index].currency,
                state[index].amount,
                state[index === 0 ? 1:0].currency
            )
            state[index === 0 ? 1 : 0] = {
                ...state[index === 0 ? 1 : 0],
                amount: newAmount
            }
        })
    }

</script>

<main>
    <h1>Конвертер валют 💱</h1>

    <div class="input-wrapper">
        <input bind:value={state[0].amount} on:input={(e)=> updateAmount(e, 0)} type="number"/>
        <select bind:value={state[0].currency} on:change={(e)=> updateCurrency(e, 0)}>
            {#each currencies as currency}
                <option disabled={state[1].currency === currency}
                        value="{currency}">
                    {currency}
                </option>
            {/each}
        </select>
    </div>

    <div class="input-wrapper">
        <input bind:value={state[1].amount} on:input={(e)=> updateAmount(e, 1)} type="number"/>
        <select bind:value={state[1].currency} on:change={(e)=> updateCurrency(e, 1)}>
            {#each currencies as currency}
                <option disabled={state[0].currency === currency}
                        value="{currency}">
                    {currency}
                </option>
            {/each}
        </select>
    </div>

</main>

<style>
    .input-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        gap: 1rem;
    }

    .input-wrapper input, .input-wrapper select {
        padding: 1rem;
    }

    .input-wrapper input {
        width: 100%;
    }
</style>