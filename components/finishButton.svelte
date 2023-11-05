<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function handleFinish() {
        dispatch('finish');
    }
</script>

<style>
    .finish-button {
        /* similar styles to next-arrow */
        position: absolute;
        bottom: 20px;
        right: 20px;
        width: 75px;
        height: 75px;
        background-color: #333; /* Green color */
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.2s;
    }

    .finish-button:hover {
        background-color: #555; /* Lighter green on hover */
    }

    .finish-button:active {
        background-color: #777; /* Darker green on pressed */
    }

    .finish-text {
        color: white;
        font-size: 14px;
        text-align: center;
    }
</style>

<button class="finish-button" on:click={handleFinish}>
    <span class="finish-text">Finish</span>
</button>
