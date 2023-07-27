
<section class="login__page">
    <form class="login__form" method="POST" action="?/login_acc">
        <h1>Login</h1>
        <input name="email" type="email"  placeholder="username" />
        <input name="password" type="password" placeholder="password" />
        <button type="submit">Login</button>
    </form>
</section>

<style>
    .login__page {
        display: flex;
        background: #fafafa;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    form {
        background: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        max-width: 300px;
        padding: 5rem;
        gap: 2rem;
        border-radius: 10px;
    }

    h1 {
        margin: 0;
        font-size: 2rem;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        margin-bottom: 1rem;
    }

    input {
        padding: 0.7rem;
        border: 1px solid #ccc;
        border-radius: 5px;
        width: 100%;
    }

    button {
        background: #000;
        color: #fff;
        font-size: 1rem;
        font-weight: bold;
        padding: 0.5rem;
        border-radius: 5px;
        width: 100%;
        border: none;
        cursor: pointer;
    }

</style>
