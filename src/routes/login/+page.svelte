<script>
    import { signInWithEmailAndPassword } from "firebase/auth";
    import { auth } from "$lib/firebase-config";
    import { authStore } from "$lib/stores/auth-store";
    import { goto } from "$app/navigation";

    let email, password;
    let hasError = false;

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                authStore.update((curr) => {
                    return { ...curr, isLoggedIn: true, currentUser: user };
                });
                goto("/");
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                hasError = true;
            });
    };

</script>

<div class="container">
    <div class="form">
        <p class="login">Login to continue</p>
        <input
            type="text"
            bind:value={email}
            name="uname"
            id="uname"
            placeholder="Email address"
        />
        <input
            type="password"
            bind:value={password}
            name="pass"
            id="pass"
            placeholder="Password"
        />
        <button on:click={handleLogin}>Submit</button>
        <p class:hide-message={!hasError} style="color:red">Check you Email and Password</p>
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
    .login {
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
    .hide-message {
        display: none;
    }
</style>
