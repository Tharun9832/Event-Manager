<script>
    import { collection, addDoc } from "firebase/firestore";
    import { createEventDispatcher } from "svelte";
    import { db } from "../firebase-config";

    let name, desc, fee, date, duration, link;
    const dispatch = createEventDispatcher();

    function closeOverlay() {
        dispatch('close');
    }

    function handleSubmit() {
        let event = {
            name: name,
            description: desc,
            fee: fee,
            date: date,
            duration: duration,
            link: link,
        }
        addDoc(collection(db, "events"), event);
        dispatch('close');
    }
</script>

<div class="overlay">
    <div class="add-event">
        <button on:click={handleSubmit}>Add Event</button>
    </div>
    <form>
        <label for="event-name">
            Event name : <br>
            <input type="text" name="event-name" id="ename" bind:value={name}>
        </label>
        <label for="event-desc">
            Event description : <br>
            <input type="text" name="event-description" id="edesc" bind:value={desc}>
        </label>
        <label for="fee">
            Event fee (in rupee) : <br>
            <input type="text" name="fee" id="fee" bind:value={fee}>
        </label>
        <label for="date">
            Event date (dd/mm/yyyy) : <br>
            <input type="text" name="date" id="date" bind:value={date}>
        </label>
        <label for="duration">
            Event duration (no. of days) : <br>
            <input type="text" name="date" id="date" bind:value={duration}>
        </label>
        <label for="link">
            Event registration link : <br>
            <input type="text" name="link" id="link" bind:value={link}>
        </label>
        <label for="poster">
            Upload poster:
            <input type="file" name="poster" id="poster">
        </label>
    </form>
    <div class="close">
        <button on:click={closeOverlay}>X</button>
    </div>
</div>

<style>
    .overlay {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
    }
    .overlay > form {
        height: 600px;
        width: 500px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-family: var(--body-font);
    }
    input {
        width: 500px;
        padding: 10px;
        font-size: 1rem;
        border-radius: 5px;
    }
    .close {
        position: absolute;
        top: 10px;
        right: 10px;
    }
    .add-event {
        position: absolute;
        top: 10px;
        left: 10px;
    }
    .close > button, .add-event > button {
        padding: 10px 15px;
        color: white;
        font-size: 0.8rem;
        font-family: var(--body-font);
        background: var(--highlight);
        outline: none;
        border: 2px solid var(--highlight);
        border-radius: 5px;
        transition: 0.3s;
    }
    .close > button:hover, .add-event > button:hover {
        background-color: transparent;
        color: var(--highlight);
        transition: 0.3s;
        cursor: pointer;
    }
</style>