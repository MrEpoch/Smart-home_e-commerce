<script lang="ts">
	import Products from "./products.svelte";
    import UploadModal from "./upload_modal.svelte";
    import type { ProductType } from "./product_types";

    export let data;
    export let token: string = data.token as string;
    export let image_name: string = data.image_name as string;
    export let products: ProductType[] = data.products;
</script>

<UploadModal {image_name} {token} />
<Products {products} />
