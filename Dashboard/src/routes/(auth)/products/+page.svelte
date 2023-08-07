<script lang="ts">
	import Products from "./products.svelte";
    import UploadModal from "./upload_modal.svelte";
    import type { ProductType } from "./product_types";

    export let data;
    export let image_name: string = data.randomImageName as string;
    export let products: ProductType[] = data.products;
    export let token: string = data.token as string;
</script>

<UploadModal {token} {image_name} />
<Products {products} />
