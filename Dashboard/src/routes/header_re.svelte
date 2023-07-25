<script lang="ts">
    function logout() {
        return;
    }

    let visible_menu = false;
    let w: number;
</script>

<header bind:clientWidth={w} class:responsive-header={visible_menu}>
    {#if w && Math.floor(w) > 800 && !visible_menu}
            <div class="header__btn-container">
                <button id="normalBtn" class="update-product">Update Product</button>
                <button id="normalBtn" class="add-product">Add Product</button>
                <button id="normalBtn" class="delete-product">Delete Product</button>
            </div>
        {:else if w && Math.floor(w) < 800 && visible_menu}
            <div class:responsiveBtn={true} class="header__btn-container">
                <button id="normalBtn" class="update-product">Update Product</button>
                <button id="normalBtn" class="add-product">Add Product</button>
                <button id="normalBtn" class="delete-product">Delete Product</button>
            </div>
        {/if}
    <button class="logout" on:click={logout}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>logout-variant</title><path fill="currentColor" d="M14.08,15.59L16.67,13H7V11H16.67L14.08,8.41L15.5,7L20.5,12L15.5,17L14.08,15.59M19,3A2,2 0 0,1 21,5V9.67L19,7.67V5H5V19H19V16.33L21,14.33V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H19Z" /></svg>
    </button>
    <button on:click={() => {visible_menu = !visible_menu}} class="menu">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>menu-open</title><path fill="currentColor" d="M21,15.61L19.59,17L14.58,12L19.59,7L21,8.39L17.44,12L21,15.61M3,6H16V8H3V6M3,13V11H13V13H3M3,18V16H16V18H3Z" /></svg>
    </button>
</header>

<style>
    header {
        width: 100%;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        background-color: #f1f1f1;
    }

    button {
        width: 140px;
        height: 50px;
        border-radius: 5px;
        border: none;
        pointer-events: auto;
        background-color: #4CAF50;
        color: white;
        cursor: pointer;
        font-size: 16px;
        transition: transform 0.2s ease-in-out;
    }

    button:hover {
        transform: scale(1.02);
        transition: transform 0.2s ease-in-out;;
    }

    .logout {
        background-color: #f44336;
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
    }

    .logout svg {
        width: 30px;
        height: 30px;
    }

    .menu {
        display: none;
    }

    .header__btn-container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 70%;
        gap: 10px;
    }

    @media (max-width: 800px) {

        .responsiveBtn {
            position: relative; 
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .responsiveBtn button {
            display: block;
            float: none;
            text-align: left;
        }

        .menu {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: dodgerblue;
            width: 50px;
            height: 50px;
            display: block;
        }

        .menu svg {
            width: 30px;
            height: 30px;
        }

    } 
</style>
