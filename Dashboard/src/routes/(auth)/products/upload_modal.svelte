<script lang="ts">
	import Modal from "./Modal.svelte";
    
    let showModal = false;
    
    const openModal = () => {
        showModal = true;
    }

    const closeModal = () => {
        showModal = false;
    }
</script>

<button class="modal__openForm__button" on:click={openModal}>Upload</button>
<Modal {showModal} {closeModal}>
    <h1 slot="header">Create Product</h1>
    <form slot="form" action="?/create" method="POST" enctype="multipart/form-data">
        <label>
            <span>File</span>
            <input type="file" name="image" />
        </label>
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
        padding: 10px 15px;
        font-size: 1rem;
        border-radius: 5px;
        border: none;
        cursor: pointer;
        background-color: #fff;
        color: #000;
    }

    .modal__form__button {
        background-color: #000;
        color: #fff;
        font-weight: bold;
    }

</style>
