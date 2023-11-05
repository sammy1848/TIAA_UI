<script>
    import NameEntry from "../components/nameEntry.svelte";
    import PasswordEntry from "../components/passwordEntry.svelte";
    import GreyButton from "../components/greyButton.svelte";
    import {registrationState} from "../stores/store"
    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher();

    const API_ENDPOINT = "http://54.210.73.216:"

    let name = '';
    let password = '';

    // Event handlers that update local state
    function handleNameUpdate(event) {
        name = event.detail.name;
    }

    function handlePasswordUpdate(event) {
        password = event.detail.password;
    }

    async function doesUserExist(username) {
        try {
            const response = await fetch(`${API_ENDPOINT}7060/retrieve_user_data/${encodeURIComponent(username)}`);
            console.log(`${API_ENDPOINT}7060/retrieve_user_data/${encodeURIComponent(username)}`)
            if (response.status === 200) {
                // If the response is okay, then the user exists
                
                return true;
            } else if (response.status === 404) {
                // If the response is a 404, then the user does not exist
                return false;
            } else {
                // If another error occurs, log it and treat as if the user does not exist
                console.error('Server error:', response.status);
                return false;
            }
        } catch (error) {
            // If a network error occurs, log it and treat as if the user does not exist
            console.error('Network error:', error);
            return false;
        }
    }

    async function handleSignIn() {
        console.log('Signing in with:', name, password);
        // Check if user exists
        const userExists = await doesUserExist(name);
        
        if (!userExists) {
            alert("Username does not exist!");
            return;
        }

        // Continue with sign-in process
        dispatch('finish', {name: name, new: false});
        registrationState.update(state => ({...state, showDashboard: true, showSignUpPage: false}));
    }

    async function handleSignUp() {
        console.log('Signing up with:', name, password);
        const userExists = await doesUserExist(name);
        if(userExists) {
            alert("Username is already taken!")
            return;
        }
        dispatch('finish', {name: name, new: true});
        registrationState.update(state => ({...state, showPersonalityQuiz: true, showSignUpPage: false}))
    }

</script>


<div class="login-container">
  <div class="title">Investify</div>
  <div class="form-container">
    <NameEntry class="login-field" on:update={handleNameUpdate}/>
    <PasswordEntry class="login-field" on:update={handlePasswordUpdate}/>
    <GreyButton class="greyButton" on:click={handleSignIn}>Sign In</GreyButton>
    <GreyButton class="greyButton" on:click={handleSignUp}>Sign Up</GreyButton>
  </div>
</div>
  


<style>
:global(body) {
    margin: 0;
    padding: 0;
    background: linear-gradient(to top, rgb(20, 2, 2), rgb(105, 23, 23));
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-family: Arial , sans-serif;
}
.title {
    font-size: 50px; /* Adjust as needed */
    font-weight: bold;
    font-style: italic;
    color: white; /* Change color to match the second image */
    margin-bottom: 2rem; /* Add some space below the title */
    /* Remove background image styles if not needed */
    /* Other styles */
    background-image: url('/New Investify Logo.png'); /* Add your image path here */
  background-repeat: no-repeat; /* Prevent the background image from repeating */
  background-size: 520px 200px; /* Make the image as large as possible within the title area without cropping or stretching */
  background-position: center; /* Center the background image */
  width: 700px; /* Set a fixed width for your title area */
  height: 200px; /* Set a fixed height for your title area */
    display: flex; /* Use flex to center content within the container */
  justify-content: center; /* Center the text horizontally */
  align-items: center; /* Center the text vertically */
  text-align: center; /* Ensures text inside the title is centered */
  padding: 20px; /* Adjust padding as needed */
  color:rgb(185, 23, 35);
}

.form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    /* Add other styling as needed */
}

.login-field {
    width: 80%; /* Set width to match the design */
    margin-bottom: 1rem; /* Space between fields */
}

.login-field input {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 0.5rem; /* If you want space between the input fields */
    /* Style your input fields as necessary */
}

.greyButton {
    width: 80%; /* Match the button width to the input fields */
    padding: 1rem; /* Add more padding for a bigger button */
    margin-bottom: 1rem; /* Space between buttons */
    /* Add additional button styling here */
    cursor: pointer; /* Makes it clear the button is clickable */
    background-color: #333; /* Example button color, change as needed */
    color: white; /* Text color for the button */
    font-size: 1rem;
    border-radius: 4px; /* Rounded corners for the button */
}
</style>