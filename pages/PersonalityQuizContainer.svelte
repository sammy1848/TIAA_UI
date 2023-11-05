<script>
    import PersonalityQuestion from "./PersonalityQuestion.svelte";
    import PreviousArrow from "../components/previousArrow.svelte";
    import NextArrow from "../components/nextArrow.svelte";
    import FinishButton from "../components/finishButton.svelte";
    import {registrationState} from "../stores/store"
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();


    const questions = [
        {
            question:
                "When it comes to stacking your savings, what's the big dream driving you?",
            answers: [
                "Locking down that stress-free future where you're totally covered.",
                "Globetrotting to bucket-list spots and soaking up every culture.",
                "Setting up your fam with the best — because they mean everything.",
                "Hitting that level of cash flow where you call all the shots.",
                "Crushing those financial milestones and celebrating every win.",
            ],
            singleSelect: false,
        },
        {
            question:
                "What are those life moments you're looking forward to the most? Feel free to mix and match; your future's just as customizable as your playlist.",
            answers: [
                "Jet-setting or discovering hidden local gems — every journey's an epic story.",
                "Leveling up your hobbies or sports game — from side hustle to spotlight.",
                "Building a vault of epic family tales and traditions.",
                "Making a mark in your community or on the world stage.",
                "Expanding your mind and skills in ways that would make your bio epic.",
                "Crafting a home vibe that's all chill, comfort, and style.",
                "Launching or scaling that dream project that’s going to be your legacy.",
            ],
            singleSelect: false,
        },
        {
            question: "Pick out the goals that are worth hustling for",
            answers: [
                "Your own spot: A home that’s less about the ‘gram and more about your sanctuary.",
                "Your ride: Think electric, high-tech, and ready for those road trip playlists.",
                "Your escape: Vacations that aren’t just breaks, but life-changing experiences.",
                "Your growth: An education fund because knowledge is not just power, it’s progress.",
                "Your security: A retirement fund that says ‘later’ to the 9-to-5 grind.",
                "Your health: Insurance that’s less about the fine print, more about peace of mind.",
                "Your investment: Property that’s not just a space, but a smart move.",
            ],
            singleSelect: false,
        },
        {
            question:
                "What's a mini money move you could crush this week to boost that savings game?",
            answers: [
                "Whipping up your own killer lunch creations — who needs overpriced salads, anyway?",
                "Trading that barista shoutout for a homebrew — your wallet (and your kitchen skills) will thank you.",
                "Choosing kicks over cabs — turn that commute into your cardio and keep that coin.",
                "Hitting 'unsubscribe' on a meh service — because who needs to pay for stuff they barely use?",
                "Skipping the impulse online buys — pause and picture your bank balance saying, 'We good.'",
                "Going DIY with your entertainment — think movie night in or a home-spa sesh.",
                "Doing a closet cleanse and flipping your finds online — your style could be someone’s treasure (and your next deposit).",
                "Opting for a 'no-spend' day — challenge yourself to spend zero cash and watch the savings stack",
            ],
            singleSelect: false,
        },
        {
            question:
                "How do you feel about debt? Pick the statement that feels most like your financial style.",
            answers: [
                "I ghost debt like a bad date — if I can't pay cash, I'm out.",
                "Debt's chill if we're talking manageable numbers — I'm not about that over-the-top life.",
                "I'm playing 4D chess with my cash — debt's a strategy, not a scare",
                "Not gonna lie, sometimes debt feels like that messy roommate I can't shake.",
            ],
            singleSelect: true,
        },
    ];

    let currentQuestionIndex = 0;
    let selectedAnswers = Array.from({ length: questions.length }, () => []);

     // Reactive statement to determine if there are selected answers for the current question
     $: hasSelectedAnswers = selectedAnswers[currentQuestionIndex] && selectedAnswers[currentQuestionIndex].length > 0;

    // Function to update answers for the current question
    function updateAnswersForCurrentQuestion(answers) {
        selectedAnswers[currentQuestionIndex] = answers;
    }  

    function goToNextQuestion() {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex += 1;
        }
    }

    function goToPreviousQuestion() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex -= 1;
        }
    }

    // Helper functions for arrow visibility
    $: showPreviousArrow = currentQuestionIndex > 0;
    $: showNextArrow = currentQuestionIndex < questions.length - 1;

    // Reactive variable for showing Finish button
    $: showFinishButton = currentQuestionIndex === questions.length - 1 && hasSelectedAnswers;
    // TODO: Change to this when you're done developing
    //$: showFinishButton = selectedAnswers.every(answerArray => answerArray.length > 0);


    function handleFinish() {
        let resultString = questions.map((questionObj, index) => {
            let answersString = selectedAnswers[index].join(", ");
            return `${questionObj.question}: ${answersString}`;
        }).join("\n\n");

        // Dispatch the custom event with the results string
        dispatch('finish', { results: resultString });
        registrationState.update(state => ({...state, showPersonalityQuiz:false, showAvatarCreation: true}))
    }


</script>

<body>
    <PersonalityQuestion
      singleSelect={questions[currentQuestionIndex].singleSelect}
      question={questions[currentQuestionIndex].question}
      answers={questions[currentQuestionIndex].answers}
      selectedAnswers={selectedAnswers[currentQuestionIndex]}
      on:answerSelected={(event) => updateAnswersForCurrentQuestion(event.detail)}
    />
    {#if showPreviousArrow}
      <PreviousArrow on:click={goToPreviousQuestion} />
    {/if}
    {#if showNextArrow}
      <NextArrow on:click={goToNextQuestion} />
    {/if}
    {#if showFinishButton}
        <FinishButton on:finish={handleFinish} />
    {/if}
</body>