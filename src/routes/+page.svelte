<script>
    import Card from './Card.svelte';
    import Overlay from './overlay.svelte';
    export let data;
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
    {#each data.events as event}
        <Card {event} on:message={showOverlay}/>
    {/each}
</div>

<div style="display: {hideOverlay ? 'none' : ''};">
    <Overlay event={dummy} on:close={closeOverlay} />
</div>

<style>
    .container {
        margin: 40px;
        display: grid;
        gap: 40px;
        grid-template-columns: repeat(auto-fill, 250px);
    }
</style>