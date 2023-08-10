// select the preloader and container elements
const preloader = document.querySelector('#preloader');
const container = document.querySelector('.page-wrapper');

// set the initial visibility of the container to 'hidden'
container.style.visibility = 'hidden';

// function to handle the display of the preloader and content
function handleDisplay(isEditorMode) {
  const showContent = () => {
    preloader.classList.remove('preload-hidden');
    container.style.visibility = 'visible';
  };

  if (isEditorMode) {
    showContent();
  } else {
    if (document.readyState === 'complete') {
      setTimeout(showContent, 0);
    } else {
      window.addEventListener('load', showContent);
      document.addEventListener('DOMContentLoaded', showContent);
    }
  }
}

// check if Webflow's Editor mode is active using an interval
function checkEditorMode(callback) {
  let checkCount = 0;
  const checkInterval = setInterval(() => {
    const isEditorMode = !!document.querySelector('.w-editor-bem-EditorApp');
    if (isEditorMode) {
      console.log('Editor mode detected.');
      callback(true);
      clearInterval(checkInterval);
    } else if (checkCount >= 20) { // after 2 seconds (20 checks x 100ms), stop checking
      console.log('Editor mode not detected.');
      callback(false);
      clearInterval(checkInterval);
    } else {
      checkCount++;
    }
  }, 100); // check every 100ms
}

checkEditorMode(handleDisplay);
