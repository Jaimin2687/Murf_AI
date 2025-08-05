document.addEventListener("DOMContentLoaded", () => {
  const generateBtn = document.getElementById("generate-btn");
  const inputBox = document.getElementById("text-input");
  const audioPlayer = document.getElementById("audio-player");
  const startButton = document.getElementById("start");
  const responseBox = document.getElementById("response");

  // 🎤 Echo Bot
  const startRecBtn = document.getElementById("start-recording");
  const stopRecBtn = document.getElementById("stop-recording");
  const echoAudio = document.getElementById("echo-audio");

  let mediaRecorder;
  let audioChunks = [];

  if (startRecBtn && stopRecBtn && echoAudio) {
    startRecBtn.addEventListener("click", async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        audioChunks = [];

        mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
        mediaRecorder.onstop = () => {
          const blob = new Blob(audioChunks, { type: 'audio/webm' });
          const audioURL = URL.createObjectURL(blob);
          echoAudio.src = audioURL;
          echoAudio.classList.remove("hidden");
          echoAudio.play();
        };

        mediaRecorder.start();
        startRecBtn.disabled = true;
        stopRecBtn.disabled = false;
      } catch (err) {
        alert("Microphone access denied or not available.");
      }
    });

    stopRecBtn.addEventListener("click", () => {
      if (mediaRecorder && mediaRecorder.state !== "inactive") {
        mediaRecorder.stop();
        startRecBtn.disabled = false;
        stopRecBtn.disabled = true;
      }
    });
  }

  // 🌀 Pre-filled welcome message
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

  // 📝 Custom TTS generation
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

  // Optional: Logging audio playback
  if (audioPlayer) {
    audioPlayer.addEventListener("play", () => console.log("Audio is playing..."));
    audioPlayer.addEventListener("pause", () => console.log("Audio paused."));
    audioPlayer.addEventListener("ended", () => console.log("Audio ended."));
  }
});
