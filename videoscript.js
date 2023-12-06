
 const video = document.getElementById('myVideo');
  let hasPlayedOnce = false; // Variable to track if the video has played at least once

  // Set the playback rate to 0.5 (half of the normal speed)
  video.playbackRate = 0.5;

  // Function to unmute the video when it comes into view
  function handleVideo(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        video.muted = false; // Unmute the video
        if (!hasPlayedOnce) {
          video.play(); // Start playing if it hasn't played yet
          hasPlayedOnce = true;
        }
        observer.unobserve(entry.target); // Stop observing once it's visible
      } else {
        if (hasPlayedOnce) {
          video.pause(); // Pause the video if it goes out of view after playing once
        }
      }
    });
  }

  // Create an Intersection Observer to watch for when the video comes into view
  const observer = new IntersectionObserver(handleVideo, { threshold: 0.5 });

  // Start observing the video element
  observer.observe(video);
