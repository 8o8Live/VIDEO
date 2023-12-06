document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById('myVideo');
  let hasPlayedOnce = false; // Variable to track if the video has played at least once

  // Set the playback rate to 0.5 (half of the normal speed)
  video.playbackRate = 0.5;

  // Function to handle the intersection changes
  function handleVideo(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        video.muted = false; // Unmute the video
        if (!hasPlayedOnce) {
          video.play(); // Start playing if it hasn't played yet
          hasPlayedOnce = true;
        }
      } else {
        if (hasPlayedOnce) {
          video.pause(); // Pause the video if it goes out of view after playing once
          observer.disconnect(); // Disconnect the observer to stop further observations
        }
      }
    });
  }

  // Create an Intersection Observer to watch for when the video comes into view
  const observer = new IntersectionObserver(handleVideo, { threshold: 0.5 });

  // Start observing the video element
  observer.observe(video);

  // Add event listener for scroll
  window.addEventListener('scroll', handleScroll);

  // Function to handle scroll event
  function handleScroll() {
    video.pause(); // Pause the video when the user starts scrolling
    observer.disconnect(); // Disconnect the observer to stop further observations
    window.removeEventListener('scroll', handleScroll); // Remove the scroll event listener
  }
});
