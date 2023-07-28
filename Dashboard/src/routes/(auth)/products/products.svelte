<script lang="ts">
import type { ProductType } from "./product_types";

    export let products: ProductType[] = [];
</script>

    <div class="delete__container">
        {#each products as product}
            <form action="?/delete" method="POST">
            <img src={product.image} alt={product.name} />
            <label>
                <input type="text" hidden name="stripeId" value={product.stripeId}  />
                <h2>{product.name}</h2>
            </label>
            <label>
                <input type="text" hidden name="description" value={product.description} />
                <p>{product.description}</p>
            </label>
            <input name="id" value={product.id} />
            <button class="delete__button" type="submit">Delete</button>
            </form>
        {/each}
    </div>

<style>
    form {
        padding: 2rem;
        color: #fff;
        width: 100%;
        max-width: 500px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 10px;
        background-color: #000;
        border-radius: 5px;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    form img {
        width: 100%;
        height: auto;
    }

    div {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 10px;
    }

    button {
        width: 100%;
        max-width: 400px;
        padding: 10px;
        border: none;
        border-radius: 5px;
        background-color: #333;
        color: #fff;
        font-size: 1.2rem;
        cursor: pointer;
        font-weight: bold;
    }

    form label {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    form input {
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #ccc;
    }

    form h2 {
        font-size: 1.5rem;
        font-weight: bold;
    }
</style>
