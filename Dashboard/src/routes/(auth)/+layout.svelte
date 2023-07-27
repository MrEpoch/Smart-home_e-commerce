<script>
    import "../../style.css";
	import Footer from "./footer.svelte";
	import Navigation from "./navigation.svelte";
    import { hidden_nav } from "./stores.js";

    function toggle_nav() {
        hidden_nav.update((value) => !value);
    }
</script>

<section class="page" class:normalGrid={$hidden_nav}>
    <Navigation />
    <div class:page__content__large={hidden_nav} class="page__content">
        <slot />
        <button class:hidden_navBtn={$hidden_nav} on:click={toggle_nav} class="nav_menu">
            <svg class:reversed__menu={$hidden_nav} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>menu-left</title><path fill="currentColor" d="M14,7L9,12L14,17V7Z" /></svg>
        </button>
        <Footer />
    </div>
</section>

<style>
    .page {
        height: 100vh;
        display: flex;
        width: 100%;
    }

    .page__content {
        width: 85%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
    }

    .page__content__large {
        width: 100%;
    }

    .nav_menu {
        position: absolute;
        top: 10px;
        left: 10px;
        background-color: transparent;
        border: none;
        cursor: pointer;
        z-index: 100;
        width: 30px;
        height: 30px;
    }

    .hidden_navBtn {
        
    }

    .reversed__menu {
        transform: rotate(180deg);
        transition: transform 0.3s ease-in-out;
    }

</style>
