
<section class="create_account__page">
    <form class="signup__form" method="POST">
        <h1>Create New Account</h1>
        <input name="firstName" type="text" placeholder="First Name" />
        <input name="lastName" type="text" placeholder="Last Name" />
        <input name="email" type="email"  placeholder="username" />
        <input name="password" type="password" placeholder="password" />
        <button type="submit">Create Account</button>
    </form>
</section>

<style>
    .create_account__page {
        display: flex;
        background: #fafafa;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
    }

    form {
        background: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        max-width: 500px;
        width: 100%;
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
