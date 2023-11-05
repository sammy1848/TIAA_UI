import { writable } from 'svelte/store';

export const registrationState = writable({
    showSignUpPage: true,
  showPersonalityQuiz: false,
  showAvatarCreation: false,
  showDashboard: false,
});




