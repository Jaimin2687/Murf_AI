document.getElementById("pingBtn").addEventListener("click", async () => {
  const res = await fetch("/ping");
  if (res.ok) {
    document.getElementById("response").classList.remove("hidden");
    document.getElementById("response").textContent = "✅ " + (await res.json()).message;
  }
});
document.getElementById("pingBtn").addEventListener("mouseover", () => {
  document.getElementById("response").classList.add("hidden");
});
document.getElementById("pingBtn").addEventListener("mouseout", () => {
  document.getElementById("response").classList.add("hidden");
});
document.getElementById("response").classList.add("hidden");