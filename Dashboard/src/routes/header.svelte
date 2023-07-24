<script>
    function logout() {
        return;
    }

    let visible_menu = false;
</script>


<header class:responsive-header={visible_menu}>
    <div class:visible__menu={visible_menu} class="hideable__buttons">
        <button id="normalBtn" class="update-product">Update Product</button>
        <button id="normalBtn" class="add-product">Add Product</button>
        <button id="normalBtn" class="delete-product">Delete Product</button>
    </div>
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

    .hideable__buttons {
        display: flex;
        justify-content: space-around;
        width: 70%;
    }

    .menu {
        visibility: hidden;
        display: none;
    }
    
    @media (max-width: 800px) {

        #normalBtn {
            background-color: #f1f1f1;
            color: black;
        }

        #normalBtn:hover {
            background-color: #ddd;
            color: black;
        }

        header .visible__menu {
            position: relative;
        }

        .hideable__buttons {
            display: none;
        }

        .responsive-header .hideable__buttons {
            position: absolute;
            top: 80px;
            left: 0;
            width: 100%;
            background-color: #f1f1f1;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .hideable__buttons button {
            width: 100%;
            margin: 0;
            border-radius: 0;
        }

        .menu {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: dodgerblue;
            width: 50px;
            height: 50px;
            visibility: visible;
            display: block;
        }

        .menu svg {
            width: 30px;
            height: 30px;
        }

        .visible__menu {
            display: block;
        }

        .visible__menu button {
            display: block;
            float: none;
        }
    } 
</style>
