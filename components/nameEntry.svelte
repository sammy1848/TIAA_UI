<script>
    export let name = ""; // Exported so it can be bound to a parent component

    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    // Handles input changes
    function handleChange(event) {
      const { value } = event.target;
      name = value;
      dispatch('update', { name: value });  // Emit the updated value
    }
  </script>
  
  <input
    type="text"
    placeholder="Enter your name"
    class="name-input"
    value={name}
    on:input={handleChange}
  />
  
  <style>
  .name-input {
    background-color: black; /* Updated to match the full front-end */
    color: white; /* Updated to match the full front-end */
    padding: 0.5rem; /* Updated to match the full front-end */
    font-size: 1rem; /* Same as before, matches the full front-end */
    border: none; /* Removing the border, assuming the full front-end does not have it */
    border-radius: 20px; /* Updated to match the full front-end */
    outline: none; /* Same as before, good practice to remove outline */
    width: 100%; /* Full width as before */
    max-width: 400px; /* Retained from the partial integration */
    box-sizing: border-box; /* Ensures padding does not affect the overall width */
    margin-bottom: 10px; /* Retained the space below the input */
  }


</style>
  