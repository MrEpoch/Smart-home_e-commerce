<script>
    import { hidden_nav } from "./stores.js";
</script>

<div id="page" class:normalSizePage={$hidden_nav} class="dashboard__page">
   dwadwa 
</div>

<style>
    .dashboard__page {
        grid-column: 2 / 3;
        grid-row: 1 / 2;
    }

    .normalSizePage {
        grid-column: 1 / 2;
    }

</style>
