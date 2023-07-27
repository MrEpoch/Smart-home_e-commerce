<script>
    import { hidden_nav } from "./stores.js";
</script>


<footer class:normalSize={$hidden_nav}>
    <span>© 2023</span>
    <p>
        Made by 
            <a href="https://parallax-stencuk.pages.dev/">Alexandr Stenčuk</a>
    </p>
</footer>

<style>
    footer {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #f5f5f5;
        height: 100px;
        width: 100%;
        font-size: 14px;
        color: #333;
    
        transition: all 0.3s ease-in-out;
    }

    span {
        font-size: 12px;
        color: #999;
    }

    a {
        color: #333;
    }
    
    p {
        margin: 0;
    }

    .normalSize {
    }

</style>
