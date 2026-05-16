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

document.querySelector("#tripType").addEventListener("change", updateItinerary);
document.querySelector("#tripLength").addEventListener("change", updateItinerary);

function updateItinerary() {
  const type = document.querySelector("#tripType").value;
  const length = document.querySelector("#tripLength").value;
  const list = document.querySelector("#itineraryList");
  const title = document.querySelector("#itineraryTitle");
  const label = document.querySelector(`#tripType option[value="${type}"]`).textContent.toLowerCase();

  list.innerHTML = "";
  title.textContent = `Suggested ${length}-day ${label} itinerary`;
  document.querySelector("#summaryTrip").textContent = `${length}-day ${label}`;

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
  const summaryActivities = document.querySelector("#summaryActivities");
  savedList.innerHTML = "";
  const savedItems = [...document.querySelectorAll(".activity")]
    .filter((activity) => activity.querySelector(".save").classList.contains("saved"))
    .map((activity) => activity.querySelector("h3").textContent);

  empty.style.display = savedItems.length ? "none" : "block";
  summaryActivities.textContent = savedItems.length ? savedItems.join(", ") : "None yet";

  savedItems.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    savedList.appendChild(li);
  });
}

document.querySelectorAll("[data-toast]").forEach((button) => {
  button.addEventListener("click", () => showToast(button.dataset.toast));
});

document.querySelectorAll(".select-lodging").forEach((button) => {
  button.addEventListener("click", () => {
    const lodging = button.dataset.lodging;
    document.querySelectorAll(".select-lodging").forEach((item) => {
      item.classList.remove("selected");
      item.textContent = "Select hotel";
    });
    button.classList.add("selected");
    button.textContent = "Selected";
    document.querySelector("#lodgingSelection").textContent = lodging;
    document.querySelector("#summaryLodging").textContent = lodging;
    showToast(`${lodging} added to current plan`);
  });
});

const panels = {
  city: "Taniti City is flat, walkable, and served by public buses and taxis from 5 a.m. to 11 p.m.",
  merriton: "Merriton Landing is easy to explore on foot and is close to restaurants, tours, and nightlife.",
  island: "Use private buses, rental cars, or guided tours for volcano, rainforest, and island-wide trips."
};

document.querySelectorAll("[data-panel]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-panel]").forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-pressed", "false");
    });
    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");
    document.querySelector("#transportPanel").textContent = panels[button.dataset.panel];
  });
});

const mapLocations = {
  city: {
    type: "City center",
    name: "Taniti City",
    description: "Taniti City is the best base for first-time visitors who want restaurants, public buses, taxis, the history museum, and walkable access to city beaches.",
    details: ["Best for: restaurants, museum, city beach", "Transportation: public buses, taxis, walking", "Nearby lodging: Yellow Leaf Bay Hotel"]
  },
  bay: {
    type: "Beach area",
    name: "Yellow Leaf Bay",
    description: "Yellow Leaf Bay is a convenient beach area for families, snorkeling trips, fishing charters, and hotel stays close to Taniti City.",
    details: ["Best for: family beach days, snorkeling, fishing", "Transportation: taxis, rental bikes, walking from nearby hotels", "Nearby lodging: Yellow Leaf Bay Hotel"]
  },
  merriton: {
    type: "Entertainment district",
    name: "Merriton Landing",
    description: "Merriton Landing has many of Taniti's newer restaurants, pubs, tours, and evening activities within a compact walking area.",
    details: ["Best for: dining, nightlife, tour departures", "Transportation: walking, taxis, private buses", "Nearby lodging: Merriton Landing Inn"]
  },
  rainforest: {
    type: "Nature area",
    name: "Rainforest",
    description: "The rainforest is a strong choice for visitors looking for guided hikes, zip-line experiences, and nature-focused day trips.",
    details: ["Best for: guided hikes and zip-line tours", "Transportation: private bus or guided tour", "Suggested pairing: Merriton Landing activities"]
  },
  volcano: {
    type: "Landmark",
    name: "Taniti Volcano",
    description: "Taniti's active volcano is a signature nature stop and works best as a planned day trip by guided tour, private bus, or boat tour.",
    details: ["Best for: adventure travelers and scenic tours", "Transportation: guided tour, private bus, or boat tour", "Suggested pairing: rainforest hike"]
  }
};

document.querySelectorAll(".map-marker").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".map-marker").forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-pressed", "false");
    });
    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");
    updateMapInfo(button.dataset.location);
  });
});

function updateMapInfo(locationKey) {
  const location = mapLocations[locationKey];
  const details = document.querySelector("#mapDetails");
  document.querySelector("#mapType").textContent = location.type;
  document.querySelector("#mapName").textContent = location.name;
  document.querySelector("#mapDescription").textContent = location.description;
  details.innerHTML = "";
  location.details.forEach((detail) => {
    const li = document.createElement("li");
    li.textContent = detail;
    details.appendChild(li);
  });
}

let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 1800);
}
