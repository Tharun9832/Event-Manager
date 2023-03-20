<script>
    import Card from "$lib/components/Card.svelte";
    import Overlay from "$lib/components/Overlay.svelte";
    import { authStore } from "$lib/stores/auth-store";
    import { db } from "$lib/firebase-config";
    import { collection, query, onSnapshot } from "firebase/firestore";

    let events = [];

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
                id: doc.id,
            };
            fbEvents.push(event);
        });
        events = fbEvents;
    });

    let hideOverlay = true;
    let dummy = {};

    function showOverlay(e) {
        dummy = e.detail.event;
        hideOverlay = false;
    }
    function closeOverlay() {
        hideOverlay = true;
    }
</script>

<div class="container">
    {#each events as event}
        <Card {event} on:message={showOverlay} />
    {/each}
</div>

{#if $authStore.isLoggedIn}
    <div class="add-event">
        <button>Add Event</button>
    </div>
{/if}

{#if !hideOverlay}
    <div>
        <Overlay event={dummy} on:close={closeOverlay} />
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
    }
</style>
