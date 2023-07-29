<script lang="ts">

    export let showModal: boolean;
    export let closeModal: () => void;
</script>


{#if showModal}
    <div class="modal">
        <button aria-roledescription="button" class="modal-overlay" on:click={closeModal}></button>
        <div class="modal-content">
            <button class="close" on:click={closeModal}>&times;</button>
            <slot name="header">
                <h3>Upload</h3>
            </slot>
            <slot name="form" />
        </div>
    </div>
{/if}

<style>
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 13;
        padding: 20px;
        width: 100%;
        height: 100%;
        overflow: auto;
    }

    .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
    }

    .modal-content {
        position: relative;
        z-index: 2;
        background-color: #fff;
        padding: 20px;
        width: 100%;
        max-width: 500px;
        border-radius: 5px;
    }

    button {
        cursor: pointer;
    }

    button.close {
        position: absolute;
        top: 10px;
        right: 10px;
        background-color: transparent;
        border: none;
        font-size: 2rem;
        color: #000;
    }

</style>
