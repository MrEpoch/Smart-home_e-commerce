<script>
    import Header from "./header.svelte";
    import "../../style.css";
	import Footer from "./footer.svelte";
</script>

<section class="page">
    <Header />
    <slot />
    <Footer />
</section>

<style>
    .page {
        height: 100vh;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 100% 1fr;
        justify-content: space-between;
    }
</style>
