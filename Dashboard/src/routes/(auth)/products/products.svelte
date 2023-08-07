<script lang="ts">
    import type { ProductType } from "./product_types";
    import ErrorSvg from "./error-svg.svg";    

    function checkImage(url: string) {
      var request = new XMLHttpRequest();
      request.open("GET", url, true);
      request.send();
      request.onload = function() {
        if (request.status == 200) //if(statusText == OK)
        {
          return true;
        } else {
          return false;
        }
    }};

    let image: File;

    function ChangeImage(e) {
        image = e.target.files[0];
        return;
    } 

    async function UploadImage(event, product) {
        try {
            if (!image) {
                alert("Please select an image");
                return;
            }
            const formData = new FormData();
            formData.append("image", image);
        } catch (error) {
            console.log(error);
        }
    }
  
    export let products: ProductType[] = [];
</script>

    <div class="delete__container">
        {#each products as product}
            <form action="?/delete" method="POST" >
                <img src={checkImage(product.image) ? product.image : ErrorSvg} alt={product.name} />
                {#if !checkImage(product.image)}
                    <input type="text" name="image" placeholder="Image URL" on:change={ChangeImage}/>
                    <button type="button" onclick={() => UploadImage}>Upload Image</button>
                {/if}    
            <label>
                <input type="text" hidden name="stripeId" value={product.stripeId}  />
                <h2>{product.name}</h2>
            </label>
            <label>
                <input type="text" hidden name="description" value={product.description} />
                <p>{product.description.length < 30 ? product.description : product.description.substring(0, 30 - 3) + "..."}</p>
            </label>
            <input hidden name="id" value={product.id} />
            <button class="delete__button" type="submit">Delete</button>
            </form>
        {/each}
    </div>

<style>
    form {
        padding: 2rem;
        color: #fff;
        width: 100%;
        height: 600px;
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
        max-width: 350px;
        width: 100%;
        height: 200px;
    }

    div {
        width: 100%;
        padding: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        gap: 30px;
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

    form p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
