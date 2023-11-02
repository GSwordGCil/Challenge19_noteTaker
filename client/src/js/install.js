// /client/src/js/install.js


// const butInstall = document.getElementById('buttonInstall');

// // Logic for installing the PWA
// // TODO: Add an event handler to the `beforeinstallprompt` event
// window.addEventListener('beforeinstallprompt', (event) => {});

// // TODO: Implement a click event handler on the `butInstall` element
// butInstall.addEventListener('click', async () => {});

// // TODO: Add an handler for the `appinstalled` event
// window.addEventListener('appinstalled', (event) => {});


// Create a reference to the butInstall DOM element
const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  event.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = event;
  // Update UI to notify the user they can add to home screen
  butInstall.style.display = 'block';
});

butInstall.addEventListener('click', async () => {
  // Hide our user interface that shows our A2HS button
  butInstall.style.display = 'none';
  // Show the prompt
  deferredPrompt.prompt();
  // Wait for the user to respond to the prompt
  const { outcome } = await deferredPrompt.userChoice;
  // Optionally, send analytics event with outcome of user choice
  console.log(`User response to the install prompt: ${outcome}`);
  // We've used the prompt, and can't use it again, discard it
  deferredPrompt = null;
});

// Track the 'appinstalled' event
window.addEventListener('appinstalled', (event) => {
  // Clear the deferredPrompt so it can be garbage collected
  deferredPrompt = null;
});
