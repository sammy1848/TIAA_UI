<script>
    export let text = '';
  </script>
  
<style>
  .question-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    top: 0;
    left: 0;
    color: white; /* Text color is white */
    padding: 20px;
    margin: 0 auto 30px; /* Centered horizontally with margin at the bottom */
    text-align: center; /* Text is centered */
    width:700px;
    max-width: 90%; /* Text container takes up to 80% of the parent width */
    line-height: 1.5; /* Line height for better readability */
    font-size: 1.8rem; /* Larger text size */
    font-weight: bold; /* Bold text */
    /* Removed border-bottom, font-family, specific font-size, as they are not needed here */
  }
</style>
  
  <div class="question-container">
    {text}
  </div>
  