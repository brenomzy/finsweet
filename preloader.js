// select the preloader and container elements
const preloader = document.querySelector('#preloader');
const container = document.querySelector('.page-wrapper');

// set the initial visibility of the container to 'hidden'
container.style.visibility = 'hidden';

// check if the user is accessing the main URL directly
const referringURL = document.referrer;
const currentURL = window.location.href;

// check if the referring URL is from an external source (not the same domain)
const isExternalReferrer = referringURL && !referringURL.includes(currentURL);

// check if Webflow's Editor mode is active (by finding any class containing 'w-editor')
const isWebflowEditor = [...document.documentElement.classList].some(className => className.includes('w-editor'));

// function to handle the display of the preloader and content
function handleDisplay(isEditorMode) {
  if ((isDirectAccess || isExternalReferrer) && !isEditorMode) {
    const showContent = () => {
      preloader.classList.remove('preload-hidden');
      container.style.visibility = 'visible';
    };

    if (document.readyState === 'complete') {
      setTimeout(showContent, 0);
    } else {
      window.addEventListener('load', showContent);
      document.addEventListener('DOMContentLoaded', showContent);
    }
  } else {
    // show the website content immediately (if the user is not accessing the main URL directly, or is navigating within the site, or if Webflow's Editor mode is active)
    preloader.classList.add('preload-hidden');
    container.style.visibility = 'visible';
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
