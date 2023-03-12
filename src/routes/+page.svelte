<script>
    import Card from "$lib/components/Card.svelte";
    import Overlay from "$lib/components/Overlay.svelte";
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
                id: doc.data().id
            }
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

<div class:hide-overlay={hideOverlay}>
    <Overlay event={dummy} on:close={closeOverlay} />
</div>

<style>
    .container {
        margin: 40px;
        display: grid;
        gap: 40px;
        grid-template-columns: repeat(auto-fill, 250px);
    }
    .hide-overlay {
        display: none;
    }
</style>
