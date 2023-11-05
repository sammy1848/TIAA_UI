<script>
    import { createEventDispatcher} from 'svelte'
    import AnswerContainer from "../components/answerContainer.svelte";
    import QuestionContainer from "../components/questionContainer.svelte";

    const dispatch = createEventDispatcher();

    export let question = ""
    export let singleSelect = false;
    export let answers = [];
    export let selectedAnswers = [];

    function handleToggle(selectedText) {
        if (singleSelect) {
        selectedAnswers = [selectedText];
        } else {
        const index = selectedAnswers.indexOf(selectedText);
        if (index !== -1) {
            selectedAnswers.splice(index, 1); 
        } else {
            selectedAnswers.push(selectedText); 
        }
        selectedAnswers = selectedAnswers.slice(); // This is necessary to trigger reactivity
        }
        dispatch('answerSelected', selectedAnswers);
    }
</script>

<div>
  <QuestionContainer text={question} />
  {#key questionId} <!-- When questionId changes, the block inside will re-render -->
    <div>
      {#each answers as answer, index (answer)} <!-- (answer) is the key for each item -->
        <AnswerContainer 
          text={answer} 
          selected={selectedAnswers.includes(answer)}
          on:toggle={() => handleToggle(answer)}
          delay={(index + 1) * 0.1}
        />
      {/each}
    </div>
  {/key}
</div>

<style>
    
</style>
