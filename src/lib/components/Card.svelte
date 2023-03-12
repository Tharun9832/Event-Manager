<script>
    import { createEventDispatcher } from "svelte";

    export let event;
    const dispatch = createEventDispatcher();

    function sendInfo() {
        dispatch('message', {
            event: event
        });
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="container">
    <div class="event-poster" on:click={sendInfo}>
        <img src={event.poster} alt="Event Poster" />
    </div>
    <div class="event-details" on:click={sendInfo}>
        <h3 id="name">{event.name}</h3>
        <p id="description">{event.description}</p>
        <p>Fee: {event.fee}</p>
        <p>Date: {event.date}</p>
        <p>Duration: {event.duration} {event.duration == 1 ? 'day' : 'days'}</p>
    </div>
</div>

<style>
    .container {
        height: 370px;
        width: 250px;
        border: 2px solid var(--title-color);
        box-shadow: 5px 5px var(--title-color);
    }
    .event-poster {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 220px;
        width: 246px;
        border-bottom: 2px solid var(--title-color);
        background-color: var(--bg-secondary);
    }
    .event-poster > img {
        max-height: 200px;
        max-width: 216px;
        box-shadow: 1px 1px 3px gray;
    }
    .event-details {
        padding: 15px 10px;
        line-height: 1.4;
        width: 250px;
        height: 150px;
        color: var(--body-color);
        font-family: var(--body-font);
    }
    .event-details > * {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 220px;
    }
    #name {
        font-family: var(--title-font);
        color: var(--title-color);
    }
    .container:hover {
        cursor: pointer;
        animation: over 0.3s forwards;
    }
    @keyframes over {
        to {
            translate: 5px 5px;
            box-shadow: 0px 0px;
        }
    } 
</style>
