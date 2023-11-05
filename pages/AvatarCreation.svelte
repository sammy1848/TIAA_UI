<script>
    import { createEventDispatcher, onMount, onDestroy } from 'svelte';

    const dispatch = createEventDispatcher();
    let frame;
    const subdomain = 'pranav-nadimpalli'; // Replace with your custom subdomain
    

    function handleFrameMessages(event) {
      const message = parseMessage(event);
      if (message?.source !== 'readyplayerme') {
        return;
      }
  
      if (message.eventName === 'v1.frame.ready') {
        frame.contentWindow.postMessage(
          JSON.stringify({
            target: 'readyplayerme',
            type: 'subscribe',
            eventName: 'v1.**',
          }),
          '*'
        );
      }
  
      if (message.eventName === 'v1.avatar.exported') {
        frame.style.display = 'none'; // Hides the iframe
        dispatch('finish', {url: message.data.url}); // Dispatches the 'finish' event
      }
    }
  
    function parseMessage(event) {
      try {
        return JSON.parse(event.data);
      } catch {
        return null;
      }
    }
  
    onMount(() => {
      if (frame) { // Check if frame is bound correctly
        frame.src = `https://${subdomain}.readyplayer.me/avatar?frameApi`;
      }
      window.addEventListener('message', handleFrameMessages);
    });
  
    onDestroy(() => {
      window.removeEventListener('message', handleFrameMessages);
    });
  </script>
  
  <style>
    iframe {
      width: 100vw;
      height: 100vh;
      border: none;
      position: fixed;
      top: 0;
      left: 0;
    }
  </style>
  
  <iframe
    bind:this={frame}
    allow="camera *; microphone *; clipboard-write">
  </iframe>
  