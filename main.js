// sidebar
function showSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "flex";
}
function Closesidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "none";
}
// dynamic assets
const openButtons = document.querySelectorAll(".openPopup");
const popup = document.getElementById("popupOverlay");
const popupTitle = document.getElementById("popupTitle");
const popupDescription = document.getElementById("popupDescription");
const popupAssets = document.getElementById("popupAssets");
const closePopup = document.getElementById("closePopup");

openButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault(); // ✅ prevents <a href="#"> from navigating

    const title = button.dataset.title;
    const description = button.dataset.description;
    const assetsRaw = button.dataset.assets;
    const tagline = button.dataset.tagline;

    popupTitle.textContent = title;
    popupDescription.textContent = description;
    popupTagline.textContent = tagline;

    popupAssets.innerHTML = "";
    assetsRaw.split(",").forEach((asset) => {
      const li = document.createElement("li");
      li.textContent = asset.trim();
      popupAssets.appendChild(li);
    });

    popup.classList.remove("hidden");
  });
});

// filters
document.addEventListener("DOMContentLoaded", () => {
  const filters = document.querySelectorAll(".pill");
  const packs = document.querySelectorAll(".small-box");

  filters.forEach((pill) => {
    pill.addEventListener("click", (e) => {
      e.preventDefault();

      // Update active pill
      filters.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");

      const selected = pill.dataset.filter;

      // Show/hide packs
      packs.forEach((pack) => {
        const category = pack.dataset.category;

        if (selected === "all" || category === selected) {
          pack.style.visibility = "visible";
          pack.style.opacity = "1";
          pack.style.position = "relative"; // Ensures layout works as expected
        } else {
          pack.style.visibility = "hidden";
          pack.style.opacity = "0";
          pack.style.position = "absolute"; // Hides the space it would occupy
        }
      });
    });
  });
});
// url reader to identify witch pack
document.addEventListener("DOMContentLoaded", () => {
  const openButtons = document.querySelectorAll(".openPopup");
  const packs = document.querySelectorAll(".small-box");

  const popup = document.getElementById("popupOverlay");
  const popupTitle = document.getElementById("popupTitle");
  const popupDescription = document.getElementById("popupDescription");
  const popupAssets = document.getElementById("popupAssets");
  const closePopup = document.getElementById("closePopup");

  // Open a popup programmatically
  function openPackPopup(button) {
    const title = button.dataset.title;
    const description = button.dataset.description;
    const assetsRaw = button.dataset.assets;

    popupTitle.textContent = title;
    popupDescription.textContent = description;
    popupAssets.innerHTML = "";

    assetsRaw.split(",").forEach((asset) => {
      const li = document.createElement("li");
      li.textContent = asset.trim();
      popupAssets.appendChild(li);
    });

    popup.classList.remove("hidden");
  }

  // Handle clicks
  openButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      openPackPopup(button);
    });
  });

  // Check for a pack ID in the URL
  const params = new URLSearchParams(window.location.search);
  const requestedPack = params.get("pack");

  if (requestedPack) {
    const match = Array.from(openButtons).find(
      (btn) => btn.dataset.packId === requestedPack
    );
    if (match) openPackPopup(match);
  }

  // Close popup handlers
  closePopup.addEventListener("click", (e) => {
    e.preventDefault();
    popup.classList.add("hidden");
  });

  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.classList.add("hidden");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      popup.classList.add("hidden");
    }
  });
});
