<script>
    import { createEventDispatcher } from "svelte";
    import { authStore } from "../stores/auth-store";
    import { doc, deleteDoc } from "firebase/firestore";
    import { db } from "../firebase-config";
    import { ref, getDownloadURL, deleteObject  } from "firebase/storage";
    import { storage } from "../firebase-config";

    export let event;
    const dispatch = createEventDispatcher();
    const desertRef = ref(storage, 'posters/'+event.poster);

    function closeOverlay() {
        dispatch('close');
    }

    const handleDelete = async () => {
        console.log("Deleting event...");
        await deleteDoc(doc(db, "events", event.id));

        deleteObject(desertRef).then(() => {
            // File deleted successfully
        }).catch((error) => {
            // Uh-oh, an error occurred!
        });

        dispatch('close');
    }

    let posterLink;
    getDownloadURL(ref(storage, 'posters/'+event.poster))
    .then((url) => {
        posterLink = url;
    })
    .catch((url) => {
        getDownloadURL(ref(storage, 'noposter.jpg'))
        .then((url) => {
            posterLink = url;
        })
    })

    function sendInfo() {
        dispatch('message', {
            event: event
        });
    }
</script>

<div class="overlay">
    <div class="delete" class:hide={!$authStore.isLoggedIn}>
        <button on:click={handleDelete}>Delete Event</button>
    </div>
    <div class="container">
        <div class="poster">
            <img src={posterLink} alt="Event Poster">
        </div>
        <div class="details">
            <p id="name">{event.name}</p>
            <p id="description"><b>Event description:</b> {event.description}</p>
            <p><b>Fee:</b> {event.fee}</p>
            <p><b>Date:</b> {event.date}</p>
            <p><b>Duration:</b> {event.duration} {event.duration == 1 ? 'day' : 'days'}</p>
            <a href={event.link} target="_blank" rel="noreferrer">Register <i class="fa fa-external-link" aria-hidden="true"></i></a>
        </div>
    </div>
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
    .container {
        height: 600px;
        width: 1000px;
        display: flex;
        align-items: center;
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
        font-family: var(--body-font);
        width: 400px;
        height: 500px;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }
    .details > a:link {
        color: var(--highlight);
    }
    .details > a:visited {
        color: var(--highlight);
    }
    #name {
        font-family: var(--title-font);
        font-size: 1.5rem;
    }
    .close {
        position: absolute;
        top: 10px;
        right: 10px;
    }
    .delete {
        position: absolute;
        top: 10px;
        left: 10px;
    }
    .close > button, .delete > button {
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
    .close > button:hover, .delete > button:hover {
        background-color: transparent;
        color: var(--highlight);
        transition: 0.3s;
        cursor: pointer;
    }
    .hide {
        display: none;
    }
</style>