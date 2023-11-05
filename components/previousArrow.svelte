<script>
    import { createEventDispatcher } from 'svelte';
  
    // This dispatcher allows the component to communicate with its parent.
    const dispatch = createEventDispatcher();
  
    // Function to dispatch a click event
    function handleClick() {
      dispatch('click');
    }
  </script>
  
  <style>
    .previous-arrow {
      position: absolute;
      bottom: 20px;
      left: 20px;
      width: 75px;
      height: 75px;
      background-color: #333; /* Default color */
      color: white;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s;
    }
  
    .previous-arrow:hover {
      background-color: #555; /* Color changes on hover */
    }
  
    .previous-arrow:active {
      background-color: #777; /* Color changes on pressed */
    }
  
    .arrow-icon {
      border: solid white;
      border-width: 0 5px 5px 0;
      display: inline-block;
      padding: 3px;
      transform: rotate(135deg);
      -webkit-transform: rotate(135deg);
    }
  </style>
  
  <button class="previous-arrow" on:click={handleClick}>
    <i class="arrow-icon"></i>
  </button>
  