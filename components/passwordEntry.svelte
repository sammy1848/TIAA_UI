<script>
    import { createEventDispatcher } from 'svelte';
  
    let password = ""; // Local variable within the component
    const dispatch = createEventDispatcher();
  
    // Dispatches the 'update' event with the current value of the password
    function handleChange(event) {
      password = event.target.value;
      dispatch('update', { password });
    }
  </script>
  
  <input
    type="password"
    placeholder="Enter your password"
    class="password-input"
    value={password}
    on:input={handleChange}
  />
  
  <style>
   .password-input {
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
  