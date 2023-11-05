<script>
    import { onMount } from "svelte";
    import GreyButton from "../components/greyButton.svelte";
    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher();

    export let avatarURL;
    export let username;
    export let userID;
    export let streakCount = 0;
    export let avatarTier;
    export let currChallenge = "Loading Challenge...";
    export let API_ENDPOINT;

    let refreshKey = 0; // a key to control the refreshing

    let hasInvestedForDay = false;

    let leaderboard = [
        // This is your sample leaderboard data
        { id: 1, name: "Alice", score: 3000 },
        { id: 2, name: "Bob", score: 2500 },
        { id: 3, name: "Charlie", score: 2000 },
        { id: 4, name: "Diana", score: 1500 },
        { id: 5, name: "Evan", score: 1000 },
    ];

    async function getLeaderboardData() {
        try {
            const response = await fetch(`${API_ENDPOINT}${5001}/leaderboard`);
            if (response.status !== 200) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error("Could not get leaderboard data:", error);
            throw error;
        }
    }

    async function updateLeaderboard() {
        let data = await getLeaderboardData();
        let topFive = data.slice(0, 5);
        leaderboard = topFive.map((user, index) => ({
            id: index + 1, // Assigning an id starting from 1
            name: user.username,
            score: user.streak_count,
        }));
    }

    updateLeaderboard();

    async function processInvestment() {
        try {
            const response = await fetch(
                `${API_ENDPOINT}${5003}/payment/${userID}`,
                {
                    method: "POST",
                }
            );

            if (response.status !== 200) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Handle the response from your API
            console.log(data);
            dispatch("invest")
            hasInvestedForDay = true;
            refreshKey++;
        } catch (error) {
            console.error("Could not process investment:", error);
            hasInvestedForDay = false;
        }
    }

    onMount(() => {
        const script = document.createElement("script");
        script.type = "module";
        script.src =
            "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js";
        document.body.appendChild(script);
    });
</script>

<div class="main-page">
    <div class="streak-container">
        <div class="streak-number">{streakCount}</div>
        <div class="fire-icon" style="transform: scale({1 + streakCount / 100});">
            <!-- Replace with your own fire icon PNG file -->
            <img src="/Fire no background.gif" alt="Fire Icon" />
            <!-- Make sure the path is correct -->
        </div>
    </div>

    {#key refreshKey}
        <model-viewer
            id="modelviewer"
            alt="Ready Player Me Avatar"
            src={avatarURL}
            shadow-intensity="1"
            camera-controls
            touch-action="pan-y"
        />
  {/key}

    <div class="sidebar">
        <!-- Sidebar content goes here -->
        <div class="sidebar-top">
            {#if !hasInvestedForDay}
                <div class="challenge-header">Daily Challenge</div>
                <div class="challenge-text">
                    Spend $5 on a fancy dessert, or add it to your travel fund!
                </div>
                <GreyButton on:click={processInvestment}>INVEST!</GreyButton>
            {:else}
                <div class="challenge-complete">
                    Congrats on investing in your future self!
                </div>
            {/if}
        </div>
        <div class="sidebar-bottom">
            <div><i class="fas fa-cog" style="color: red" /> Settings</div>
            <div>
                <i class="fas fa-sign-out-alt" style="color: red" /> Log Out
            </div>
        </div>
    </div>

    <div class="topbar">
        <div class="topbar-left">
            Investify <!-- This is your left-aligned text -->
        </div>
        <div class="topbar-center">
            "{currChallenge}" <!-- This is your center-aligned text -->
        </div>
        <div class="topbar-right">
            <!-- Right-aligned text or elements can go here if needed -->
            {username}
        </div>
    </div>

    <!-- This is where your leaderboard would be rendered -->
    <div class="right-sidebar">
        <div class="title">LEADERBOARD</div>
        {#each leaderboard as player (player.id)}
            <div class="entry">
                <div class="rank">{player.id}</div>
                <div class="name">{player.name}</div>
                <div class="score">{player.score}</div>
            </div>
        {/each}
    </div>

    <!-- The rest of your main page content goes here -->
</div>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Kenia&display=swap");
    @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css");

    .main-page {
        display: grid;
        grid-template-columns: 200px 1fr; /* Adjust the 200px to the width of your sidebar */
        grid-template-rows: auto;
        grid-template-areas: "sidebar left";
        height: 100vh;
        color: white;
        background-color: linear-gradient(
            to top,
            rgb(20, 2, 2),
            rgb(105, 23, 23)
        );
        background: linear-gradient(to top, rgb(20, 2, 2), rgb(105, 23, 23));
        font-family: Arial, sans-serif;
    }



    .challenge-header {
        font-size: 2rem;
    }

    .challenge-text {
        margin-top: 10%;
        font-size: 1.25rem;
        margin-bottom: 7.5%;
    }

    .fire-icon {
        transition: transform 0.3s ease;
    }

    .topbar {
        background: rgb(0, 0, 0);
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 70px;
        padding: 0 20px;
        z-index: 1000;
        display: flex;
        align-items: center;
        font-size: 30px; /* Larger font size, adjust as needed */
        font-family: "Kenia", sans-serif;
        font-style: italic;
        font-weight: bold;
        color: #ffffff;
    }

    .topbar-left {
        flex: 1;
        text-align: left; /* Aligns the text to the left */
        padding-left: 68px;
        color: red;
    }

    .topbar-center {
        flex: 2;
        text-align: center; /* Aligns the text to the center */
        font-style: normal;
        font-size: 25px;
    }

    .topbar-right {
        flex: 1;
        text-align: right; /* Aligns the text to the right */
    }

    .sidebar {
        background: rgb(0, 0, 0);
        position: fixed;
        top: 51px;
        left: 0;
        width: 300px;
        height: 100%;
        padding: 20px 0;
        transition: all 0.5s ease;
        font-size: 25px;
        font-weight: bold;
        display: flex;
        flex-direction: column;
    }

    .sidebar-top {
        flex-grow: 1;
        padding: 40px;
        padding-left: 50px;
        white-space: nowrap;
        text-wrap: wrap;
    }

    .sidebar-bottom {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-top: auto;
        padding-bottom: 120px; /* Padding on all sides */
        padding-left: 70px;
        /* Reduced extra padding at the bottom */
        gap: 30px; /* This will ensure there is a 30px gap between child elements */
    }

    .sidebar-bottom:hover {
        cursor: pointer;
    }

    .right-sidebar {
        background: linear-gradient(to right, rgb(0, 0, 0), rgb(41, 4, 4));
        position: fixed;
        top: 51px;
        right: 0; /* This positions the sidebar on the right */
        width: 300px;
        height: 100%;
        padding: 20px 0;
        transition: all 0.5s ease;
    }

    .streak-container {
        position: fixed; /* Keeps the container in a fixed position on the screen */
        top: calc(
            50% + 250px
        ); /* Adjusts the vertical position to be right below the model viewer */
        left: 50%; /* Positions the left edge of the container at the center of the screen */
        transform: translateX(-50%); /* Centers the container horizontally */
        z-index: 10; /* Ensure it's above other content */
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .fire-icon img {
        max-width: 100%; /* Ensures the image is not larger than its container */
        height: auto; /* Keeps the image aspect ratio */
        /* The following scale transformation is set in the style attribute inline with Svelte bindings */
        /* style="transform: scale({1 + streak / 100});" */
    }

    .streak-number {
        font-size: 3em; /* Very large font size for streak number */
        margin-right: 0.5em; /* Spacing between number and icon */
    }

    .fire-icon {
        transition: transform 0.3s ease;
    }

    #modelviewer {
        position: fixed; /* or use absolute if you want it to scroll with the page */
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        height: 400px; /* Or any fixed height */
        width: 600px; /* Or any fixed width */
        margin: auto; /* This will center the div */
        z-index: 10; /* Ensure it's above other content */
    }

    .title {
        font-size: 24px; /* Font size for leaderboard title */
        margin-bottom: 10px;
    }

    .title {
        background: #f1faee; /* Light background for the title */
        color: #1d3557; /* Dark color for the title text */
        text-transform: uppercase; /* Capitalize the title */
        font-size: 1.5em; /* Larger font size */
        padding: 0.5em 0; /* Add padding on the top and bottom */
        text-align: center;
        margin: 0; /* Reset any default margins */
        font-weight: bold; /* Make the title bold */
    }

    .entry {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1em; /* Increase padding */
        border-bottom: 1px solid #6d6875; /* Add a separator between entries */
        transition: background-color 0.3s ease; /* Transition for hover effect */
    }

    .entry:last-child {
        border-bottom: none; /* No border for the last item */
    }

    .entry:hover {
        background-color: #6d6875; /* Lighter background on hover */
    }

    .rank {
        display: flex;
        align-items: center;
    }

    .name {
        flex-grow: 1; /* Ensures the name takes up available space */
        margin-left: 1em; /* Space out the rank icon and the name */
    }

    .score {
        font-weight: bold; /* Make the score bold */
    }

    #modelviewer {
        height: 400px;
        width: 100%; /* Make it responsive */
        max-width: 600px; /* Max width to control the size on larger screens */
    }

    /* You might need additional styles for fonts, spacings, or to import icons */

    /* Additional styles for your leaderboard and other components would go here */
</style>
