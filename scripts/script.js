const hostels = [
  {
    id: 1,
    hostelName: "Sunrise Hostels",
    university: "Kisii University",
    location: "Nyamage Road, Kisii",
    price: 7200,
    distance: 0.6,
    amenities: ["Wi-Fi", "24/7 Security", "Water", "Furnished Room", "Study Area"],
    image: "https://picsum.photos/seed/kisii1/700/400",
    gallery: [
      "https://picsum.photos/seed/kisii1a/900/500",
      "https://picsum.photos/seed/kisii1b/900/500",
      "https://picsum.photos/seed/kisii1c/900/500"
    ],
    available: true
  },
  {
    id: 2,
    hostelName: "Kisii Heights Residence",
    university: "Kisii University",
    location: "Daraja Mbili, Kisii",
    price: 8800,
    distance: 1.2,
    amenities: ["Electricity", "Hot Shower", "Wi-Fi", "Water", "Security"],
    image: "https://picsum.photos/seed/kisii2/700/400",
    gallery: [
      "https://picsum.photos/seed/kisii2a/900/500",
      "https://picsum.photos/seed/kisii2b/900/500",
      "https://picsum.photos/seed/kisii2c/900/500"
    ],
    available: false
  },
  {
    id: 3,
    hostelName: "Campus Gate Suites",
    university: "Kisii University",
    location: "Mwembe, Kisii",
    price: 6400,
    distance: 0.4,
    amenities: ["Study Area", "Water", "Security", "Shared Kitchen"],
    image: "https://picsum.photos/seed/kisii3/700/400",
    gallery: [
      "https://picsum.photos/seed/kisii3a/900/500",
      "https://picsum.photos/seed/kisii3b/900/500",
      "https://picsum.photos/seed/kisii3c/900/500"
    ],
    available: true
  },
  {
    id: 4,
    hostelName: "Machakos Green Court",
    university: "Machakos University",
    location: "Katumani, Machakos",
    price: 7600,
    distance: 0.8,
    amenities: ["Wi-Fi", "Electricity", "Furnished Room", "Laundry"],
    image: "https://picsum.photos/seed/machakos1/700/400",
    gallery: [
      "https://picsum.photos/seed/machakos1a/900/500",
      "https://picsum.photos/seed/machakos1b/900/500",
      "https://picsum.photos/seed/machakos1c/900/500"
    ],
    available: true
  },
  {
    id: 5,
    hostelName: "Athi View Hostels",
    university: "Machakos University",
    location: "Machakos Town",
    price: 6900,
    distance: 1.5,
    amenities: ["Security", "Water", "Study Area", "Mini Market Nearby"],
    image: "https://picsum.photos/seed/machakos2/700/400",
    gallery: [
      "https://picsum.photos/seed/machakos2a/900/500",
      "https://picsum.photos/seed/machakos2b/900/500",
      "https://picsum.photos/seed/machakos2c/900/500"
    ],
    available: true
  },
  {
    id: 6,
    hostelName: "Mua Peak Residences",
    university: "Machakos University",
    location: "Kangundo Road, Machakos",
    price: 9200,
    distance: 0.9,
    amenities: ["Wi-Fi", "Hot Shower", "Electricity", "Furnished Room"],
    image: "https://picsum.photos/seed/machakos3/700/400",
    gallery: [
      "https://picsum.photos/seed/machakos3a/900/500",
      "https://picsum.photos/seed/machakos3b/900/500",
      "https://picsum.photos/seed/machakos3c/900/500"
    ],
    available: false
  },
  {
    id: 7,
    hostelName: "Chuka Pearl Homes",
    university: "Chuka University",
    location: "Chuka Town",
    price: 6100,
    distance: 0.7,
    amenities: ["Water", "Security", "Study Area", "Wardrobe"],
    image: "https://picsum.photos/seed/chuka1/700/400",
    gallery: [
      "https://picsum.photos/seed/chuka1a/900/500",
      "https://picsum.photos/seed/chuka1b/900/500",
      "https://picsum.photos/seed/chuka1c/900/500"
    ],
    available: true
  },
  {
    id: 8,
    hostelName: "Nithi Student Court",
    university: "Chuka University",
    location: "Ndagani, Chuka",
    price: 8300,
    distance: 1.1,
    amenities: ["Wi-Fi", "Electricity", "Security", "Balcony"],
    image: "https://picsum.photos/seed/chuka2/700/400",
    gallery: [
      "https://picsum.photos/seed/chuka2a/900/500",
      "https://picsum.photos/seed/chuka2b/900/500",
      "https://picsum.photos/seed/chuka2c/900/500"
    ],
    available: true
  },
  {
    id: 9,
    hostelName: "Blue Ridge Hostels",
    university: "Chuka University",
    location: "Magumoni, Chuka",
    price: 7400,
    distance: 1.6,
    amenities: ["Water", "Furnished Room", "Security", "Laundry"],
    image: "https://picsum.photos/seed/chuka3/700/400",
    gallery: [
      "https://picsum.photos/seed/chuka3a/900/500",
      "https://picsum.photos/seed/chuka3b/900/500",
      "https://picsum.photos/seed/chuka3c/900/500"
    ],
    available: false
  },
  {
    id: 10,
    hostelName: "Murang'a Hilltop Residence",
    university: "Murang'a University",
    location: "Kiharu, Murang'a",
    price: 7000,
    distance: 0.5,
    amenities: ["Wi-Fi", "Security", "Electricity", "Study Tables"],
    image: "https://picsum.photos/seed/muranga1/700/400",
    gallery: [
      "https://picsum.photos/seed/muranga1a/900/500",
      "https://picsum.photos/seed/muranga1b/900/500",
      "https://picsum.photos/seed/muranga1c/900/500"
    ],
    available: true
  },
  {
    id: 11,
    hostelName: "Mukuyu Student Nest",
    university: "Murang'a University",
    location: "Mukuyu, Murang'a",
    price: 8600,
    distance: 1.3,
    amenities: ["Water", "Hot Shower", "Kitchen", "Furnished Room"],
    image: "https://picsum.photos/seed/muranga2/700/400",
    gallery: [
      "https://picsum.photos/seed/muranga2a/900/500",
      "https://picsum.photos/seed/muranga2b/900/500",
      "https://picsum.photos/seed/muranga2c/900/500"
    ],
    available: true
  },
  {
    id: 12,
    hostelName: "Tech Valley Suites",
    university: "Murang'a University",
    location: "Murang'a Town",
    price: 9800,
    distance: 1.8,
    amenities: ["Wi-Fi", "Security", "Private Study Booth", "Laundry"],
    image: "https://picsum.photos/seed/muranga3/700/400",
    gallery: [
      "https://picsum.photos/seed/muranga3a/900/500",
      "https://picsum.photos/seed/muranga3b/900/500",
      "https://picsum.photos/seed/muranga3c/900/500"
    ],
    available: false
  },
  {
    id: 13,
    hostelName: "Rongo Prime Hostels",
    university: "Rongo University",
    location: "Rongo Town",
    price: 6200,
    distance: 0.9,
    amenities: ["Water", "Security", "Study Area", "Wi-Fi"],
    image: "https://picsum.photos/seed/rongo1/700/400",
    gallery: [
      "https://picsum.photos/seed/rongo1a/900/500",
      "https://picsum.photos/seed/rongo1b/900/500",
      "https://picsum.photos/seed/rongo1c/900/500"
    ],
    available: true
  },
  {
    id: 14,
    hostelName: "Migori Corner Residences",
    university: "Rongo University",
    location: "Rongo-Migori Highway",
    price: 8100,
    distance: 1.4,
    amenities: ["Electricity", "Water", "Furnished Room", "Wi-Fi"],
    image: "https://picsum.photos/seed/rongo2/700/400",
    gallery: [
      "https://picsum.photos/seed/rongo2a/900/500",
      "https://picsum.photos/seed/rongo2b/900/500",
      "https://picsum.photos/seed/rongo2c/900/500"
    ],
    available: true
  },
  {
    id: 15,
    hostelName: "South Nyanza Homes",
    university: "Rongo University",
    location: "Opapo, Migori",
    price: 5600,
    distance: 2.2,
    amenities: ["Water", "Shared Kitchen", "Security", "Study Space"],
    image: "https://picsum.photos/seed/rongo3/700/400",
    gallery: [
      "https://picsum.photos/seed/rongo3a/900/500",
      "https://picsum.photos/seed/rongo3b/900/500",
      "https://picsum.photos/seed/rongo3c/900/500"
    ],
    available: true
  },
  {
    id: 16,
    hostelName: "Polytechnic Plaza",
    university: "Kisii National Polytechnic",
    location: "Kisii CBD",
    price: 6000,
    distance: 0.5,
    amenities: ["Security", "Water", "Electricity", "Study Area"],
    image: "https://picsum.photos/seed/poly1/700/400",
    gallery: [
      "https://picsum.photos/seed/poly1a/900/500",
      "https://picsum.photos/seed/poly1b/900/500",
      "https://picsum.photos/seed/poly1c/900/500"
    ],
    available: true
  },
  {
    id: 17,
    hostelName: "Nyangena Student Halls",
    university: "Kisii National Polytechnic",
    location: "Nyangena, Kisii",
    price: 7300,
    distance: 1,
    amenities: ["Wi-Fi", "Hot Shower", "Furnished Room", "Security"],
    image: "https://picsum.photos/seed/poly2/700/400",
    gallery: [
      "https://picsum.photos/seed/poly2a/900/500",
      "https://picsum.photos/seed/poly2b/900/500",
      "https://picsum.photos/seed/poly2c/900/500"
    ],
    available: false
  },
  {
    id: 18,
    hostelName: "Gateway Technical Residence",
    university: "Kisii National Polytechnic",
    location: "Nyanchwa, Kisii",
    price: 8400,
    distance: 1.7,
    amenities: ["Wi-Fi", "Security", "Water", "Private Desk"],
    image: "https://picsum.photos/seed/poly3/700/400",
    gallery: [
      "https://picsum.photos/seed/poly3a/900/500",
      "https://picsum.photos/seed/poly3b/900/500",
      "https://picsum.photos/seed/poly3c/900/500"
    ],
    available: true
  }
];

const universities = [...new Set(hostels.map((hostel) => hostel.university))];

const byId = (id) => document.getElementById(id);

const searchInput = byId("searchInput");
const universityFilter = byId("universityFilter");
const priceFilter = byId("priceFilter");
const priceValue = byId("priceValue");
const availabilityFilter = byId("availabilityFilter");
const sortFilter = byId("sortFilter");
const hostelsGrid = byId("hostelsGrid");
const bookingForm = byId("bookingForm");
const bookingMessage = byId("bookingMessage");
const bookingUniversity = byId("bookingUniversity");
const bookingHostel = byId("bookingHostel");
const toast = byId("toast");
const contactForm = byId("contactForm");
const contactMessageStatus = byId("contactMessageStatus");
const menuToggle = byId("menuToggle");
const navLinks = byId("navLinks");
const loader = byId("loader");
const backToTop = byId("backToTop");

const modal = byId("hostelModal");
const modalBackdrop = byId("modalBackdrop");
const modalClose = byId("modalClose");
const modalTitle = byId("modalTitle");
const modalMeta = byId("modalMeta");
const modalAmenities = byId("modalAmenities");
const galleryImage = byId("galleryImage");
const galleryPrev = byId("galleryPrev");
const galleryNext = byId("galleryNext");

const state = {
  favorites: new Set(JSON.parse(localStorage.getItem("hostelFavorites") || "[]")),
  activeGallery: {
    images: [],
    index: 0
  }
};

const CHATBOT_API_ENDPOINT = "/api/chat";
const CHATBOT_STORAGE_KEY = "hostelChatHistory";
const CHATBOT_MAX_HISTORY = 10;
const CHATBOT_THINKING_MS = 5000;

const MOBILE_DRAWER_ANIMATION_MS = 260;

function openMobileDrawer() {
  if (!navLinks || !menuToggle) {
    return;
  }

  navLinks.classList.remove("closing");
  navLinks.classList.add("open");
  menuToggle.classList.add("is-open");
  menuToggle.setAttribute("aria-expanded", "true");
}

function closeMobileDrawer() {
  if (!navLinks || !menuToggle) {
    return;
  }

  if (!navLinks.classList.contains("open")) {
    menuToggle.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    return;
  }

  navLinks.classList.add("closing");
  navLinks.classList.remove("open");
  menuToggle.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");

  window.setTimeout(() => {
    if (navLinks) {
      navLinks.classList.remove("closing");
    }
  }, MOBILE_DRAWER_ANIMATION_MS);
}

function showToast(message) {
  if (!toast) {
    return;
  }

  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

function saveFavorites() {
  localStorage.setItem("hostelFavorites", JSON.stringify([...state.favorites]));
}

function markActiveNav() {
  const page = document.body.dataset.page;
  if (!page) {
    return;
  }

  document.querySelectorAll(".nav-links a[data-page]").forEach((link) => {
    link.classList.toggle("active", link.dataset.page === page);
  });
}

function hostelCardTemplate(hostel) {
  const availabilityText = hostel.available ? "Available" : "Fully Booked";
  const availabilityClass = hostel.available ? "badge--available" : "badge--booked";
  const amenityTags = hostel.amenities.map((amenity) => `<span>${amenity}</span>`).join("");
  const isFavorite = state.favorites.has(hostel.id) ? "active" : "";

  return `
    <article class="card hostel-card">
      <div class="hostel-image" style="background-image: url('${hostel.image}')"></div>
      <div class="hostel-top">
        <h3 class="hostel-name">${hostel.hostelName}</h3>
        <span class="badge ${availabilityClass}">${availabilityText}</span>
      </div>
      <p class="meta">${hostel.university} - ${hostel.location}</p>
      <div class="hostel-stats">
        <span>KES ${hostel.price.toLocaleString()}/month</span>
        <span>${hostel.distance} km from campus</span>
      </div>
      <div class="amenities">${amenityTags}</div>
      <div class="hostel-actions">
        <button class="btn btn--primary btn--small" data-action="book" data-id="${hostel.id}" ${hostel.available ? "" : "disabled"}>Book Hostel</button>
        <button class="btn btn--outline btn--small" data-action="details" data-id="${hostel.id}">View Details</button>
        <button class="btn btn--outline btn--small favorite-btn ${isFavorite}" data-action="favorite" data-id="${hostel.id}">Save</button>
      </div>
    </article>
  `;
}

function getFilteredHostels() {
  if (!searchInput || !universityFilter || !priceFilter || !availabilityFilter || !sortFilter) {
    return hostels;
  }

  const searchValue = searchInput.value.toLowerCase().trim();
  const selectedUniversity = universityFilter.value;
  const maxPrice = Number(priceFilter.value);
  const availabilityValue = availabilityFilter.value;
  const sortValue = sortFilter.value;

  let filtered = hostels.filter((hostel) => {
    const matchesSearch = hostel.hostelName.toLowerCase().includes(searchValue);
    const matchesUniversity = selectedUniversity === "all" || hostel.university === selectedUniversity;
    const matchesPrice = hostel.price <= maxPrice;
    const matchesAvailability =
      availabilityValue === "all" ||
      (availabilityValue === "available" && hostel.available) ||
      (availabilityValue === "booked" && !hostel.available);

    return matchesSearch && matchesUniversity && matchesPrice && matchesAvailability;
  });

  if (sortValue === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  }

  if (sortValue === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  }

  if (sortValue === "distance-asc") {
    filtered.sort((a, b) => a.distance - b.distance);
  }

  return filtered;
}

function renderHostels() {
  if (!hostelsGrid) {
    return;
  }

  const filteredHostels = getFilteredHostels();

  if (!filteredHostels.length) {
    hostelsGrid.innerHTML = '<div class="empty-state">No hostels matched your current filters. Try changing search or budget.</div>';
    return;
  }

  hostelsGrid.innerHTML = filteredHostels.map((hostel) => hostelCardTemplate(hostel)).join("");
}

function populateUniversitySelects() {
  if (universityFilter && universityFilter.options.length === 1) {
    universities.forEach((university) => {
      const option = document.createElement("option");
      option.value = university;
      option.textContent = university;
      universityFilter.append(option);
    });
  }

  if (bookingUniversity && bookingUniversity.options.length === 1) {
    universities.forEach((university) => {
      const option = document.createElement("option");
      option.value = university;
      option.textContent = university;
      bookingUniversity.append(option);
    });
  }
}

function populateHostelSelect(universityValue = "") {
  if (!bookingHostel) {
    return;
  }

  const selectedUniversity = universityValue || (bookingUniversity ? bookingUniversity.value : "");
  const filtered = hostels.filter((hostel) => {
    if (!selectedUniversity) {
      return hostel.available;
    }

    return hostel.university === selectedUniversity && hostel.available;
  });

  bookingHostel.innerHTML = '<option value="">Choose hostel</option>';

  filtered.forEach((hostel) => {
    const option = document.createElement("option");
    option.value = hostel.hostelName;
    option.textContent = `${hostel.hostelName} (KES ${hostel.price.toLocaleString()})`;
    bookingHostel.append(option);
  });
}

function applyStoredUniversityFilter() {
  if (!universityFilter) {
    return;
  }

  const selectedUniversity = localStorage.getItem("selectedUniversityFilter");
  if (selectedUniversity && universities.includes(selectedUniversity)) {
    universityFilter.value = selectedUniversity;
  }

  localStorage.removeItem("selectedUniversityFilter");
}

function applyStoredBookingSelection() {
  if (!bookingUniversity || !bookingHostel) {
    return;
  }

  const selected = localStorage.getItem("selectedBookingHostel");
  if (!selected) {
    return;
  }

  try {
    const parsed = JSON.parse(selected);
    if (parsed.university) {
      bookingUniversity.value = parsed.university;
      populateHostelSelect(parsed.university);
    }

    if (parsed.hostelName) {
      bookingHostel.value = parsed.hostelName;
    }
  } catch (error) {
    console.error("Unable to parse selected hostel", error);
  }

  localStorage.removeItem("selectedBookingHostel");
}

function queueBookingFromCard(hostelId) {
  const hostel = hostels.find((item) => item.id === hostelId);
  if (!hostel || !hostel.available) {
    showToast("This hostel is currently fully booked.");
    return;
  }

  localStorage.setItem(
    "selectedBookingHostel",
    JSON.stringify({
      id: hostel.id,
      university: hostel.university,
      hostelName: hostel.hostelName
    })
  );

  window.location.href = "booking.html";
}

function openModal(hostelId) {
  if (!modal || !galleryImage || !modalTitle || !modalMeta || !modalAmenities) {
    return;
  }

  const hostel = hostels.find((item) => item.id === hostelId);
  if (!hostel) {
    return;
  }

  state.activeGallery.images = hostel.gallery;
  state.activeGallery.index = 0;
  galleryImage.src = hostel.gallery[0];

  modalTitle.textContent = hostel.hostelName;
  modalMeta.textContent = `${hostel.university} | ${hostel.location} | KES ${hostel.price.toLocaleString()} per month | ${hostel.distance} km from campus`;
  modalAmenities.textContent = `Amenities: ${hostel.amenities.join(", ")}`;

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  if (!modal) {
    return;
  }

  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

function updateGallery(direction) {
  if (!galleryImage) {
    return;
  }

  const total = state.activeGallery.images.length;
  if (!total) {
    return;
  }

  state.activeGallery.index = (state.activeGallery.index + direction + total) % total;
  galleryImage.src = state.activeGallery.images[state.activeGallery.index];
}

function toggleFavorite(hostelId) {
  if (state.favorites.has(hostelId)) {
    state.favorites.delete(hostelId);
    showToast("Hostel removed from favorites");
  } else {
    state.favorites.add(hostelId);
    showToast("Hostel saved to favorites");
  }

  saveFavorites();
  renderHostels();
}

function validateBookingForm() {
  if (!bookingUniversity || !bookingHostel) {
    return "Booking form is not available.";
  }

  const fullName = byId("fullName").value.trim();
  const email = byId("email").value.trim();
  const phone = byId("phone").value.trim();
  const depositValue = byId("deposit").value;
  const deposit = Number(depositValue);
  const checkInDate = byId("checkInDate").value;
  const duration = byId("duration").value;
  const gender = byId("gender").value;

  const phoneRegex = /^(\+254|0)\d{9}$/;

  if (!fullName || !email || !phone || !depositValue || !bookingUniversity.value || !bookingHostel.value || !checkInDate || !duration || !gender) {
    return "Please fill in all required booking fields.";
  }

  if (Number.isNaN(deposit) || deposit <= 0) {
    return "Please enter a valid deposit amount greater than zero.";
  }

  if (!phoneRegex.test(phone)) {
    return "Please enter a valid Kenyan phone number (07XXXXXXXX or +254XXXXXXXXX).";
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const selectedDate = new Date(checkInDate);

  if (selectedDate < today) {
    return "Check-in date cannot be in the past.";
  }

  return "";
}

function saveBooking() {
  if (!bookingUniversity || !bookingHostel) {
    return;
  }

  const bookings = JSON.parse(localStorage.getItem("hostelBookings") || "[]");

  bookings.push({
    fullName: byId("fullName").value.trim(),
    email: byId("email").value.trim(),
    phone: byId("phone").value.trim(),
    deposit: Number(byId("deposit").value),
    university: bookingUniversity.value,
    hostel: bookingHostel.value,
    checkInDate: byId("checkInDate").value,
    duration: byId("duration").value,
    gender: byId("gender").value,
    notes: byId("notes").value.trim(),
    bookedAt: new Date().toISOString()
  });

  localStorage.setItem("hostelBookings", JSON.stringify(bookings));
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });

      if (navLinks && menuToggle) {
        closeMobileDrawer();
      }
    });
  });
}

function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item, index) => {
    const button = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (!button || !answer) {
      return;
    }

    const answerId = answer.id || `faq-answer-${index + 1}`;
    const buttonId = button.id || `faq-question-${index + 1}`;

    answer.id = answerId;
    answer.setAttribute("role", "region");
    answer.setAttribute("aria-labelledby", buttonId);
    answer.style.maxHeight = "0px";

    button.id = buttonId;
    button.setAttribute("aria-controls", answerId);
    button.setAttribute("aria-expanded", "false");

    button.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      if (isOpen) {
        item.classList.remove("open");
        button.setAttribute("aria-expanded", "false");
        answer.style.maxHeight = "0px";
      } else {
        item.classList.add("open");
        button.setAttribute("aria-expanded", "true");
        answer.style.maxHeight = `${answer.scrollHeight}px`;
      }
    });
  });

  window.addEventListener("resize", () => {
    document.querySelectorAll(".faq-item.open .faq-answer").forEach((answer) => {
      if (answer instanceof HTMLElement) {
        answer.style.maxHeight = `${answer.scrollHeight}px`;
      }
    });
  });
}

function initUniversityQuickFilters() {
  document.querySelectorAll(".view-hostels").forEach((button) => {
    button.addEventListener("click", () => {
      const university = button.dataset.university;
      if (university) {
        localStorage.setItem("selectedUniversityFilter", university);
      }
    });
  });
}

function initHostelFilters() {
  if (!searchInput || !universityFilter || !priceFilter || !availabilityFilter || !sortFilter || !hostelsGrid) {
    return;
  }

  applyStoredUniversityFilter();
  renderHostels();

  searchInput.addEventListener("input", renderHostels);
  universityFilter.addEventListener("change", renderHostels);
  availabilityFilter.addEventListener("change", renderHostels);
  sortFilter.addEventListener("change", renderHostels);

  priceFilter.addEventListener("input", () => {
    if (priceValue) {
      priceValue.textContent = priceFilter.value;
    }
    renderHostels();
  });

  hostelsGrid.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    const action = target.dataset.action;
    const hostelId = Number(target.dataset.id);
    if (!action || !hostelId) {
      return;
    }

    if (action === "book") {
      queueBookingFromCard(hostelId);
    }

    if (action === "details") {
      openModal(hostelId);
    }

    if (action === "favorite") {
      toggleFavorite(hostelId);
    }
  });
}

function initBookingForm() {
  if (!bookingForm || !bookingUniversity || !bookingHostel) {
    return;
  }

  populateHostelSelect();
  applyStoredBookingSelection();

  bookingUniversity.addEventListener("change", () => {
    populateHostelSelect();
  });

  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const error = validateBookingForm();

    if (error) {
      bookingMessage.textContent = error;
      bookingMessage.style.color = "#d84949";
      return;
    }

    saveBooking();
    bookingMessage.textContent = "Booking submitted successfully. We will contact you shortly.";
    bookingMessage.style.color = "#15965a";
    showToast("Booking submitted successfully");
    bookingForm.reset();
    populateHostelSelect();
  });
}

function initContactForm() {
  if (!contactForm) {
    return;
  }

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = byId("contactName").value.trim();
    const email = byId("contactEmail").value.trim();
    const message = byId("contactMessage").value.trim();
    const recipientNode = byId("contactRecipientEmail");
    const recipientEmail = recipientNode ? recipientNode.textContent.trim() : "";

    if (!name || !email || !message) {
      contactMessageStatus.textContent = "Please complete all contact fields.";
      contactMessageStatus.style.color = "#d84949";
      return;
    }

    if (!recipientEmail) {
      contactMessageStatus.textContent = "Contact recipient email is missing on this page.";
      contactMessageStatus.style.color = "#d84949";
      return;
    }

    const subject = encodeURIComponent(`Hostel Booking Contact - ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    const mailtoUrl = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;

    window.location.href = mailtoUrl;

    contactMessageStatus.textContent = "Opening your email app with your message draft.";
    contactMessageStatus.style.color = "#15965a";
    showToast("Email draft opened");
    contactForm.reset();
  });
}

function initCommonEvents() {
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      if (navLinks.classList.contains("open")) {
        closeMobileDrawer();
      } else {
        openMobileDrawer();
      }
    });

    document.addEventListener("click", (event) => {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      if (!navLinks.classList.contains("open")) {
        return;
      }

      if (navLinks.contains(target) || menuToggle.contains(target)) {
        return;
      }

      closeMobileDrawer();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) {
        navLinks.classList.remove("open", "closing");
        menuToggle.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  if (backToTop) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }
    });

    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", closeModal);
  }

  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  if (galleryPrev) {
    galleryPrev.addEventListener("click", () => updateGallery(-1));
  }

  if (galleryNext) {
    galleryNext.addEventListener("click", () => updateGallery(1));
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }

    if (modal && modal.classList.contains("open") && event.key === "ArrowRight") {
      updateGallery(1);
    }

    if (modal && modal.classList.contains("open") && event.key === "ArrowLeft") {
      updateGallery(-1);
    }
  });
}

function getStoredChatHistory() {
  try {
    const raw = localStorage.getItem(CHATBOT_STORAGE_KEY);
    const parsed = JSON.parse(raw || "[]");

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter((item) => item && (item.role === "user" || item.role === "assistant") && typeof item.content === "string")
      .slice(-CHATBOT_MAX_HISTORY * 2);
  } catch (error) {
    console.error("Could not read chatbot history", error);
    return [];
  }
}

function saveChatHistory(history) {
  localStorage.setItem(CHATBOT_STORAGE_KEY, JSON.stringify(history.slice(-CHATBOT_MAX_HISTORY * 2)));
}

function createChatMessage(role, content) {
  const message = document.createElement("div");
  message.className = `chatbot__message chatbot__message--${role}`;
  message.textContent = content;
  return message;
}

function createThinkingMessageNode() {
  const message = document.createElement("div");
  message.className = "chatbot__message chatbot__message--assistant chatbot__message--animate-in chatbot__typing";
  message.innerHTML = '<span>Thinking...</span><span class="chatbot__typing-dots" aria-hidden="true"><span></span><span></span><span></span></span>';
  return message;
}

function appendChatMessage(messagesNode, role, content, animate) {
  const messageNode = createChatMessage(role, content);
  if (animate) {
    messageNode.classList.add("chatbot__message--animate-in");

    if (role === "assistant") {
      messageNode.classList.add("chatbot__message--assistant-reveal");
    }
  }

  messagesNode.append(messageNode);
  messagesNode.scrollTop = messagesNode.scrollHeight;
  return messageNode;
}

async function waitForThinkingMinimum(startedAt) {
  const elapsed = Date.now() - startedAt;
  const remaining = CHATBOT_THINKING_MS - elapsed;

  if (remaining > 0) {
    await new Promise((resolve) => {
      window.setTimeout(resolve, remaining);
    });
  }
}

function setChatbotStatus(statusNode, message) {
  if (!statusNode) {
    return;
  }

  statusNode.textContent = message;
}

async function requestChatbotReply(message, history) {
  const response = await fetch(CHATBOT_API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message,
      history
    })
  });

  if (!response.ok) {
    const errorPayload = await response.json().catch(() => ({}));
    const detail = typeof errorPayload.error === "string" ? errorPayload.error : "Chat service is unavailable right now.";
    throw new Error(detail);
  }

  const payload = await response.json();
  const reply = typeof payload.reply === "string" ? payload.reply.trim() : "";

  if (!reply) {
    throw new Error("The assistant returned an empty response.");
  }

  return reply;
}

function initChatbot() {
  if (!document.body) {
    return;
  }

  const chatbotRoot = document.createElement("section");
  chatbotRoot.className = "chatbot";
  chatbotRoot.innerHTML = `
    <button class="chatbot__toggle" type="button" aria-label="Open assistant" aria-expanded="false">Chat Assistant</button>
    <div class="chatbot__panel" aria-hidden="true">
      <div class="chatbot__header">
        <h3>Hostel Assistant</h3>
        <button class="chatbot__close" type="button" aria-label="Close assistant">&times;</button>
      </div>
      <div class="chatbot__messages" aria-live="polite"></div>
      <p class="chatbot__status" role="status" aria-live="polite">Ask about hostels, pricing, booking, and availability.</p>
      <form class="chatbot__form">
        <textarea class="chatbot__input" rows="2" placeholder="Type your question..."></textarea>
        <button class="btn btn--primary btn--small" type="submit">Send</button>
      </form>
    </div>
  `;

  document.body.append(chatbotRoot);

  const toggleButton = chatbotRoot.querySelector(".chatbot__toggle");
  const closeButton = chatbotRoot.querySelector(".chatbot__close");
  const panel = chatbotRoot.querySelector(".chatbot__panel");
  const messagesNode = chatbotRoot.querySelector(".chatbot__messages");
  const statusNode = chatbotRoot.querySelector(".chatbot__status");
  const form = chatbotRoot.querySelector(".chatbot__form");
  const input = chatbotRoot.querySelector(".chatbot__input");
  const sendButton = form ? form.querySelector("button[type='submit']") : null;

  if (!toggleButton || !closeButton || !panel || !messagesNode || !form || !input || !sendButton) {
    return;
  }

  const history = getStoredChatHistory();

  if (history.length) {
    history.forEach((entry) => {
      appendChatMessage(messagesNode, entry.role, entry.content, false);
    });
  } else {
    appendChatMessage(
      messagesNode,
      "assistant",
      "Hi, I can help you compare hostels, estimate budgets, and guide your booking process.",
      false
    );
  }

  const openChatbot = () => {
    chatbotRoot.classList.add("open");
    panel.setAttribute("aria-hidden", "false");
    toggleButton.setAttribute("aria-expanded", "true");
    input.focus();
  };

  const closeChatbot = () => {
    chatbotRoot.classList.remove("open");
    panel.setAttribute("aria-hidden", "true");
    toggleButton.setAttribute("aria-expanded", "false");
  };

  toggleButton.addEventListener("click", () => {
    if (chatbotRoot.classList.contains("open")) {
      closeChatbot();
    } else {
      openChatbot();
    }
  });

  closeButton.addEventListener("click", closeChatbot);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const message = input.value.trim();

    if (!message || sendButton.disabled) {
      return;
    }

    input.value = "";
    const nextHistory = [...history, { role: "user", content: message }].slice(-CHATBOT_MAX_HISTORY * 2);
    history.splice(0, history.length, ...nextHistory);
    saveChatHistory(history);

    appendChatMessage(messagesNode, "user", message, false);
    const typingNode = createThinkingMessageNode();
    messagesNode.append(typingNode);
    messagesNode.scrollTop = messagesNode.scrollHeight;

    sendButton.disabled = true;
    input.disabled = true;
    setChatbotStatus(statusNode, "Assistant is thinking...");

    const startedAt = Date.now();

    try {
      const reply = await requestChatbotReply(message, history);
      await waitForThinkingMinimum(startedAt);
      typingNode.remove();

      appendChatMessage(messagesNode, "assistant", reply, true);
      const updatedHistory = [...history, { role: "assistant", content: reply }].slice(-CHATBOT_MAX_HISTORY * 2);
      history.splice(0, history.length, ...updatedHistory);
      saveChatHistory(history);

      setChatbotStatus(statusNode, "Response ready.");
    } catch (error) {
      await waitForThinkingMinimum(startedAt);
      typingNode.remove();
      const fallback = error instanceof Error ? error.message : "Chat service is currently unavailable.";
      appendChatMessage(messagesNode, "assistant", fallback, true);
      setChatbotStatus(statusNode, "Unable to get a response right now.");
    } finally {
      sendButton.disabled = false;
      input.disabled = false;
      input.focus();
    }
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      form.requestSubmit();
    }
  });
}

function setYear() {
  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });
}

function hideLoader() {
  if (!loader) {
    return;
  }

  window.setTimeout(() => {
    loader.classList.add("hidden");
  }, 500);
}

function init() {
  markActiveNav();
  populateUniversitySelects();
  initSmoothScroll();
  initFaqAccordion();
  initUniversityQuickFilters();
  initHostelFilters();
  initBookingForm();
  initContactForm();
  initCommonEvents();
  initChatbot();
  setYear();
  hideLoader();
}

init();
