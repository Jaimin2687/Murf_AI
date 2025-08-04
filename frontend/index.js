document.addEventListener("DOMContentLoaded", () => {
  const generateBtn = document.getElementById("generate-btn");
  const inputBox = document.getElementById("text-input");
  const audioPlayer = document.getElementById("audio-player");
  const startButton = document.getElementById("start");
  const responseBox = document.getElementById("response");

  // 🔹 For the pre-filled welcome voice generation using #start
  if (startButton) {
    startButton.addEventListener("click", async () => {
      responseBox.classList.remove("hidden");
      responseBox.textContent = "AQUA is preparing your voice... 🌊";

      try {
        const res = await axios.post("http://localhost:5000/server", {
          text: "Hello there, I’m Aqua 🌊 — your voice agent. Let's dive into creativity!"
        });

        const audioUrl = res.data.audioUrl;
        responseBox.innerHTML = `
          <p class="mb-4 text-sky-800 font-semibold">Here's your generated voice 👇</p>
          <audio controls class="w-full">
            <source src="${audioUrl}" type="audio/mpeg">
            Your browser does not support the audio element.
          </audio>
        `;
      } catch (err) {
        responseBox.textContent = "Error: " + (err.response?.data?.detail || err.message);
      }
    });
  }

  // 🔹 For the custom text-to-speech input
  if (generateBtn) {
    generateBtn.addEventListener("click", async () => {
      const text = inputBox.value.trim();

      if (!text) {
        alert("🌊 Please enter something for AQUA to say.");
        return;
      }

      try {
        const response = await axios.post("http://localhost:5000/server", {
          text: text
        });

        if (response.data.audioUrl) {
          audioPlayer.src = response.data.audioUrl;
          audioPlayer.classList.remove("hidden");
          audioPlayer.play();
        } else {
          alert("🚫 Could not generate audio. Please try again.");
        }
      } catch (error) {
        console.error("⚠️ Error contacting server:", error);
        alert("❌ An error occurred while generating audio.");
      }
    });
  }
});
// 🔹 For the audio player controls
  if (audioPlayer) {
    audioPlayer.addEventListener("play", () => {
      console.log("Audio is playing...");
    });

    audioPlayer.addEventListener("pause", () => {
      console.log("Audio is paused.");
    });

    audioPlayer.addEventListener("ended", () => {
      console.log("Audio playback has ended.");
    });
  }
