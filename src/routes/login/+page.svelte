<div class="container">
    <div class="form">
        <p>Login to continue</p>
        <input type="text" name="uname" id="uname" placeholder="Username">
        <input type="password" name="pass" id="pass" placeholder="Password">
        <button>Submit</button>
    </div>
</div>

<style>
    .container {
        width: 100%;
        height: 90vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .form {
        height: 250px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        font-family: var(--body-font);
        color: var(--title-color);
    }
    .form > p {
        font-size: 1.2rem;
    }
    .form > input {
        font-family: var(--body-font);
        color: var(--body-color);
        width: 250px;
        font-size: 0.9rem;
        padding: 10px 15px;
        border: 2px solid var(--title-color);
        outline: none;
        border-radius: 5px;
    }
    .form > button {
        padding: 10px 15px;
        background-color: var(--title-color);
        border: 0px;
        border-radius: 5px;
        color: white;
        font-family: var(--body-font);
        font-size: 0.9rem;
        box-shadow: 0px 4px #cfd1d4;
    }
    .form > button:active {
        box-shadow: 0px 0px;
        transform: translateY(4px);
    }
</style>