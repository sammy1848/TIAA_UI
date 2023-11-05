<script>
    import { createEventDispatcher } from 'svelte';
    export let text;
    export let selected = false;
    
    const dispatch = createEventDispatcher();
    
    function toggleSelection() {
      dispatch('toggle', text);
    }
  </script>
  
  
<style>
  @keyframes slideIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .answer {
    padding: 10px 20px;
    margin: 30px;
    border: 2px solid transparent;
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 0.125s, border-color 0.125s, color 0.125s;
    background-color: black;
    color: white;
    opacity: 0;
    transform: translateY(-100px);
    animation: slideIn 0.5s ease forwards;
    animation-delay: var(--animation-delay); /* Using the passed delay */
  }

  .answer:hover {
    color: white;
    background-color: rgb(100, 0, 100);
  }

  .answer.selected {
    background-color: rgb(100, 0, 100);
    color: white;
    border-color: transparent;
  }
</style>
  
  <div class="answer {selected ? 'selected' : ''}" on:click={toggleSelection}>
    {text}
  </div>
  