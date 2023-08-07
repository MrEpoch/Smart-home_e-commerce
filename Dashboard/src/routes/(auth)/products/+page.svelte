<script lang="ts">
	import Products from "./products.svelte";
    import UploadModal from "./upload_modal.svelte";
    import type { ProductType } from "./product_types";

    export let data;
    export let products: ProductType[] = data.products;
</script>

<UploadModal />
<Products {products} />
