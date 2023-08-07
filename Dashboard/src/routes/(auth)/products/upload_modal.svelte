<script lang="ts">
	import Modal from "./Modal.svelte";

    export let token: string;
    export let image_name: string;

    let showModal = false;
    
    const openModal = () => {
        showModal = true;
    }

    const closeModal = () => {
        showModal = false;
    }

    let image_file: any;

    async function handleUpload(e: any): Promise<void> {
        const formData = new FormData();
        formData.append('image', image_file);
        const acc_token = await fetch('http://165.232.120.122/server-admin/admin-token', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
        });
        const acc_token_json = await acc_token.json();
        await fetch('http://165.232.120.122/server-admin/admin-api/upload-img', {
            method: "POST",
            body: formData,
            headers: {
                'Authorization': `Bearer ${await acc_token_json.ACCESS_TOKEN}`,
            }
        })
        return;
    }

    function handleChanges(e: any): void {
        image_file = e.target.files[0];
        const ext = image_file.name.split('.').pop();
        image_name = image_name + '.' + ext;
        return;
    }
 
</script>

<button class="modal__openForm__button" on:click={openModal}>Upload</button>
<Modal {showModal} {closeModal}>
    <h1 slot="header">Create Product</h1>
    <form slot="form" action="?/create" on:submit={handleUpload} method="POST" enctype="multipart/form-data">
        <label>
            <span>File</span>
            <input name="image" on:change={handleChanges} type="file" />
        </label>
        <input type="hidden" name="image_name" value={image_name} />
        <label>
            <span>Name</span>
            <input type="text" name="name" />
        </label>
        <label>
            <span>Stripe ID</span>
            <input type="text" name="stripeId" />
        </label>
        <label>
            <span>Description</span>
            <input type="text" name="description" />
        </label>
        <label>
            <span>Price</span>
            <input type="text" name="price" />
        </label>
        <label>
            <span>Long Description</span>
            <textarea name="long_description" maxlength="150"></textarea>
        <button class="modal__form__button" type="submit">Create Product</button>
    </form>
</Modal>

<style>
    form {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
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

    textarea {
        padding: 10px;
        border-radius: 5px;
        resize: vertical;
        border: 1px solid #ccc;
    }

    button {
        padding: 10px 15px;
        font-size: 1rem;
        border-radius: 5px;
        border: none;
        cursor: pointer;
    }

    .modal__openForm__button {
        padding: 10px 20px;
        font-size: 1rem;
        font-weight: bold;
        border-radius: 5px;
        border: none;
        transition: all 0.3s ease-in-out;
        cursor: pointer;
        background-color: black;
        color: white;
        margin: 10px;
    }

    .modal__openForm__button:hover {
        filter: brightness(0.9);
    }

    .modal__form__button {
        background-color: #000;
        color: #fff;
        font-weight: bold;
    }

    h1 {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
            'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 1.5rem;
        font-weight: bold;
        margin: 0;
    }

 </style>
