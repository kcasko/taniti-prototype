const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#site-nav");
const toast = document.querySelector("#toast");

navToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll("#site-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const itineraries = {
  family: {
    "3": ["Day 1: Arrive and walk Yellow Leaf Bay.", "Day 2: Beach morning, history museum, and family dinner.", "Day 3: Snorkeling or arcade before departure."],
    "5": ["Day 1: Arrive and explore Taniti City.", "Day 2: Beach and history museum.", "Day 3: Rainforest hike.", "Day 4: Merriton Landing activities.", "Day 5: Boat tour and departure."],
    "7": ["Days 1-2: Taniti City and beaches.", "Day 3: History museum and local restaurants.", "Day 4: Rainforest hike.", "Day 5: Snorkeling.", "Day 6: Boat tour.", "Day 7: Merriton Landing and departure."],
    "14": ["Week 1: Beaches, museum, rainforest, and Merriton Landing.", "Week 2: Boat tour, volcano visit, snorkeling, and flexible family days."]
  },
  honeymoon: {
    "3": ["Day 1: Resort check-in and beach dinner.", "Day 2: Helicopter ride and Pan-Asian dinner.", "Day 3: Spa-style slow morning and departure."],
    "5": ["Day 1: Check in near Yellow Leaf Bay.", "Day 2: Beach day.", "Day 3: Volcano tour.", "Day 4: Merriton Landing nightlife.", "Day 5: Brunch and departure."],
    "7": ["Days 1-2: Resort, beach, and restaurants.", "Day 3: Rainforest zip-line.", "Day 4: Volcano tour.", "Day 5: Snorkeling.", "Day 6: Galleries and nightlife.", "Day 7: Departure."],
    "14": ["Week 1: Beach, dining, galleries, and tours.", "Week 2: Rainforest, volcano, snorkeling, and quiet lodging days."]
  },
  adventure: {
    "3": ["Day 1: Arrive and rent bikes.", "Day 2: Rainforest zip-line.", "Day 3: Volcano hike before departure."],
    "5": ["Day 1: Taniti City orientation.", "Day 2: Rainforest hike.", "Day 3: Zip-line.", "Day 4: Volcano tour.", "Day 5: Snorkeling and departure."],
    "7": ["Days 1-2: Beaches and bike rental.", "Day 3: Rainforest hike.", "Day 4: Zip-line.", "Day 5: Volcano.", "Day 6: Fishing charter.", "Day 7: Departure."],
    "14": ["Week 1: Rainforest, zip-line, volcano, and snorkeling.", "Week 2: Fishing charter, bike days, beaches, and flexible tours."]
  },
  business: {
    "3": ["Day 1: Arrive and hotel check-in.", "Day 2: Meetings with Taniti City dinner.", "Day 3: Short museum visit and departure."],
    "5": ["Day 1: Arrive and hotel check-in.", "Days 2-3: Meetings.", "Day 4: Beach or museum.", "Day 5: Departure."],
    "7": ["Week plan: Meetings, Taniti City restaurants, one beach day, and one guided tour."],
    "14": ["Two-week plan: Business schedule with weekend volcano, beach, and Merriton Landing options."]
  }
};

document.querySelector("#buildTrip").addEventListener("click", () => {
  updateItinerary();
});

document.querySelector("#tripType").addEventListener("change", updateItinerary);
document.querySelector("#tripLength").addEventListener("change", updateItinerary);

function updateItinerary() {
  const type = document.querySelector("#tripType").value;
  const length = document.querySelector("#tripLength").value;
  const list = document.querySelector("#itineraryList");
  const title = document.querySelector("#itineraryTitle");
  list.innerHTML = "";
  const label = document.querySelector(`#tripType option[value="${type}"]`).textContent.toLowerCase();
  title.textContent = `Suggested ${length}-day ${label} itinerary`;
  itineraries[type][length].forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
}

document.querySelectorAll(".filter").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    document.querySelectorAll(".activity").forEach((activity) => {
      activity.classList.toggle("hidden", filter !== "all" && activity.dataset.category !== filter);
    });
  });
});

document.querySelectorAll(".save").forEach((button) => {
  button.addEventListener("click", () => {
    const saved = button.classList.toggle("saved");
    button.textContent = saved ? "Saved" : "Save";
    updateSavedActivities();
    showToast(saved ? "Activity saved to itinerary" : "Activity removed from itinerary");
  });
});

function updateSavedActivities() {
  const savedList = document.querySelector("#savedActivities");
  const empty = document.querySelector("#savedEmpty");
  savedList.innerHTML = "";
  const savedItems = [...document.querySelectorAll(".activity")]
    .filter((activity) => activity.querySelector(".save").classList.contains("saved"))
    .map((activity) => activity.querySelector("h3").textContent);
  empty.style.display = savedItems.length ? "none" : "block";
  savedItems.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    savedList.appendChild(li);
  });
}

document.querySelectorAll("[data-toast]").forEach((button) => {
  button.addEventListener("click", () => showToast(button.dataset.toast));
});

const panels = {
  city: "Taniti City is flat, walkable, and served by public buses and taxis.",
  merriton: "Merriton Landing is easy to explore on foot and is close to many activities.",
  island: "Use private buses, rental cars, or guided tours for volcano, rainforest, and island-wide trips."
};

document.querySelectorAll("[data-panel]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector("#transportPanel").textContent = panels[button.dataset.panel];
  });
});

let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 1800);
}
