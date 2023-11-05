<script>
    // This is a placeholder for the click event that can be customized when the button is used
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    function handleClick() {
        dispatch("click");
    }
</script>

<button on:click={handleClick} class="btn">
    <slot />
    <!-- This allows for custom button text -->
</button>

<style>
    .btn {
        padding: 0.5rem 1rem; /* Same as before, matches the full front-end */
        border: none; /* Same as before */
        background-color: black; /* Updated to match the full front-end */
        color: white; /* Same as before, matches the full front-end */
        font-size: 1rem; /* Same as before, matches the full front-end */
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif; /* Retained from partial integration */
        border-radius: 20px; /* Updated to match the full front-end */
        cursor: pointer; /* Same as before */
        outline: none; /* Same as before */
        margin-bottom: 1rem; /* Added from full front-end */
        transition: background-color 0.125s, color 0.125s; /* Updated to match the full front-end */
    }

    .btn:hover {
        color: white; /* Retained as per the full front-end hover state */
        background-color: rgb(100,0,100); /* Updated to match the full front-end */
    }

</style>
