<script>
    import { createEventDispatcher } from "svelte";


    export let event;
    const dispatch = createEventDispatcher();

    function closeOverlay() {
        dispatch('close');
    }
</script>

<div class="overlay">
    <div class="container">
        <div class="poster">
            <img src={event.poster} alt="Event Poster">
        </div>
        <div class="details">
            <h3 id="name">{event.name}</h3>
            <p id="description">{event.description}</p>
            <p>Fee: {event.fee}</p>
            <p>Date: {event.date}</p>
            <p>Duration: {event.duration} {event.duration == 1 ? 'day' : 'days'}</p>
            <a href={event.link}>Register <i class="fa fa-external-link" aria-hidden="true"></i></a>
        </div>
    </div>
    <div class="close">
        <button on:click={closeOverlay}><i class="fa fa-times" aria-hidden="true"></i></button>
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
    .container {
        height: 600px;
        width: 1000px;
        display: flex;
        /* background-color: black; */
    }
    .poster {
        width: 600px;
        height: 600px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 20px;
    }
    .poster > img {
        max-height: 550px;
        max-width: 550px;
    }
    .details {
        /* background-color: orangered; */
        font-family: var(--body-font);
        width: 400px;
        height: 600px;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    .details > h3 {
        font-family: var(--title-font);
    }
    .close {
        position: absolute;
        top: 10px;
        right: 10px;
    }
</style>