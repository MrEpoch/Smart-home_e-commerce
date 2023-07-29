<script>
    import { hidden_nav } from "./stores.js";
    
    function toggle_nav() {
        hidden_nav.update((value) => !value);
    }

</script>

<nav class:hidden_nav={$hidden_nav}>
    <a data-sveltekit-preload-data on:click={toggle_nav} class="app__link" href="/">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>store</title><path d="M12,18H6V14H12M21,14V12L20,7H4L3,12V14H4V20H14V14H18V20H20V14M20,4H4V6H20V4Z" /></svg>
        <p>E-commerce site</p>
    </a>

    <a data-sveltekit-preload-data on:click={toggle_nav} href="/">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>home</title><path fill="currentColor" d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" /></svg>
        <p>Home</p>
    </a>
    <a data-sveltekit-preload-data on:click={toggle_nav} href="/sales">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>tag</title><path fill="currentColor" d="M5.5,7A1.5,1.5 0 0,1 4,5.5A1.5,1.5 0 0,1 5.5,4A1.5,1.5 0 0,1 7,5.5A1.5,1.5 0 0,1 5.5,7M21.41,11.58L12.41,2.58C12.05,2.22 11.55,2 11,2H4C2.89,2 2,2.89 2,4V11C2,11.55 2.22,12.05 2.59,12.41L11.58,21.41C11.95,21.77 12.45,22 13,22C13.55,22 14.05,21.77 14.41,21.41L21.41,14.41C21.78,14.05 22,13.55 22,13C22,12.44 21.77,11.94 21.41,11.58Z" /></svg>
        <p>Sales</p>
    </a>
    <a data-sveltekit-preload-data on:click={toggle_nav} href="/products">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>package-variant-closed</title><path fill="currentColor" d="M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L10.11,5.22L16,8.61L17.96,7.5L12,4.15M6.04,7.5L12,10.85L13.96,9.75L8.08,6.35L6.04,7.5M5,15.91L11,19.29V12.58L5,9.21V15.91M19,15.91V9.21L13,12.58V19.29L19,15.91Z" /></svg>
        <p>Products</p>
    </a>
    <a data-sveltekit-preload-data on:click={toggle_nav} href="new-account">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>account-plus</title><path fill="currentColor" d="M15,14C12.33,14 7,15.33 7,18V20H23V18C23,15.33 17.67,14 15,14M6,10V7H4V10H1V12H4V15H6V12H9V10M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12Z" /></svg>
        <p>New Account</p>
    </a>
</nav>

<style>
    nav {
        min-height: 100%;
        display: flex;
        gap: 10px;
        overflow: hidden;
        transition: all 0.3s ease-in-out;
        flex-direction: column;
        width: 100%;
        max-width: 300px;
        background-color: #000;
    }

    a {
        font-size: 16px;
        font-weight: 600;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        display: inline-block;
        padding: 10px;
        text-decoration: none;
        color: #fff;
        background-color: #000;
        border-radius: 5px;
        margin: 10px;
        display: flex;
        align-items: center;
    }

    a svg {
        margin-left: 10px;
        width: 20px;
        height: 20px;
        margin-right: 10px;
    }

    .app__link {
        display: flex;
        align-items: center;
        background-color: #fff;
        color: #000;
        border-radius: 0;
        margin: 0;
        font-size: 20px;
        font-weight: 700;
        height: 80px;
        padding: 10px;
    }

    .app__link svg {
        width: 30px;
        height: 30px;
    }

    .hidden_nav {
        transition: all 0.3s ease-in-out;
        transform: translateX(-200%);
        width: 0;
        overflow: hidden;
    }

    @media (max-width: 700px) {
        nav {
            position: fixed;
            max-width: 100%;
            width: 100%;
            z-index: 11;
        }
    }

</style>

