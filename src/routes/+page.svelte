<script>
    import Card from "$lib/components/Card.svelte";
    import Overlay from "$lib/components/Overlay.svelte";
    import AddEvent from "$lib/components/AddEvent.svelte";
    import { authStore } from "$lib/stores/auth-store";
    import { db } from "$lib/firebase-config";
    import { collection, query, onSnapshot } from "firebase/firestore";

    let events = [], placeHolderText = "Loading events...";

    const q = query(collection(db, "events"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const fbEvents = [];
        querySnapshot.forEach((doc) => {
            const event = {
                name: doc.data().name,
                description: doc.data().description,
                fee: doc.data().fee,
                date: doc.data().date,
                duration: doc.data().duration,
                link: doc.data().link,
                poster: doc.data().poster,
                id: doc.id,
            };
            fbEvents.push(event);
        });
        events = fbEvents;
        if (events.length === 0) {
            placeHolderText = "No events available right now...";
        }
    });

    let hideOverlay = true;
    let hideAddEvent = true;
    let dummy = {};

    function showOverlay(e) {
        dummy = e.detail.event;
        hideOverlay = false;
    }
    function closeOverlay() {
        hideOverlay = true;
    }
    function toggleAddEvent() {
        hideAddEvent = !hideAddEvent;
    }
</script>

<div class="container">
    {#each events as event (event.id)}
        <Card {event} on:message={showOverlay} />
    {/each}
</div>

{#if events.length === 0}
        <p class="placeholder">{placeHolderText}</p>
{/if}

{#if $authStore.isLoggedIn}
    <div class="add-event">
        <button on:click={toggleAddEvent}>Add Event</button>
    </div>
{/if}

{#if !hideOverlay}
    <div>
        <Overlay event={dummy} on:close={closeOverlay} />
    </div>
{/if}

{#if !hideAddEvent}
    <div>
        <AddEvent on:close={toggleAddEvent}/>
    </div>
{/if}

<style>
    .container {
        margin: 40px;
        display: grid;
        gap: 40px;
        grid-template-columns: repeat(auto-fill, 250px);
    }
    .add-event {
        position: fixed;
        bottom: 20px;
        right: 20px;
    }
    .add-event > button {
        padding: 10px 15px;
        color: var(--highlight);
        font-size: 0.8rem;
        font-family: var(--body-font);
        background: white;
        outline: none;
        border: 2px solid var(--highlight);
        border-radius: 5px;
        transition: 0.3s;
    }
    .add-event > button:hover {
        background-color: var(--highlight);
        color: white;
        transition: 0.3s;
        cursor: pointer;
    }
    .placeholder {
        text-align: center;
        font-family: var(--body-font);
        font-size: 1.2rem;
        color: #a2a2a2;
    }
</style>
