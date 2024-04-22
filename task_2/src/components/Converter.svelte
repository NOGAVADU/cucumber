<style>
    .converter {
        display: flex;
        gap: 1rem;
    }

    .currency__container {
        display: flex;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    .arrows {
        font-size: 30px;
    }

    .loading {
        font-size: 40px;
    }
</style>

<script lang="ts">
    const data = fetch(' https://v6.exchangerate-api.com/v6/db50408ed6f812422cebc753/latest/USD')
        .then(res => res.json())
        .then(res => {
            if (res.result === 'success') {
                const data = res.conversion_rates

                const currencies = []
                for (let key in data) {
                    currencies.push({name: key, value: data[key]})
                }
                return currencies;
            } else {
                return [{name: "ERROR", value: null}]
            }
        })

    function convertCurrency(
        firstInput: HTMLInputElement,
        secondInput: HTMLInputElement,
        firstCurrencyVal: number,
        secondCurrencyVal: number
    ): void {
        const result = ((1 / firstCurrencyVal) * Number(firstInput.value)) * secondCurrencyVal;

        if (firstInput.value !== '') secondInput.value = result % 1 === 0 ? result.toString() : result.toFixed(2).toString()
        else secondInput.value = ''
    }

    let firstInput: HTMLInputElement;
    let secondInput: HTMLInputElement;
    let firstCurrency: number;
    let secondCurrency: number;

</script>
<section class="converter">
    {#await data}
        <p class="loading">Загрузка...</p>
    {:then data}
        <div class="currency__container">
            <input type="number"
                   placeholder="$$$"
                   bind:this={firstInput}
                   on:input={() => convertCurrency(firstInput, secondInput, firstCurrency, secondCurrency)}
            />
            <select bind:value={firstCurrency}
                    on:change={() => convertCurrency(firstInput, secondInput, firstCurrency, secondCurrency)}
            >
                {#each data as currency}
                    <option value={currency.value}>{currency.name}</option>
                {/each}
            </select>
        </div>
        <span class="arrows">&#8596</span>
        <div class="currency__container">
            <input type="number"
                   placeholder="$$$"
                   bind:this={secondInput}
                   on:input={() => convertCurrency(secondInput, firstInput, secondCurrency, firstCurrency)}
            />
            <select bind:value={secondCurrency}
                    on:change={() => convertCurrency(secondInput, firstInput, secondCurrency, firstCurrency)}
            >
                {#each data as currency}
                    <option value={currency.value}>{currency.name}</option>
                {/each}
            </select>
        </div>
    {:catch error}
        <p>Что-то пошло не так :(</p>
        <p>Ошибка: {error}</p>
    {/await}
</section>


