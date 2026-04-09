const jobs = [
  { title: "Frontend Developer", company: "Google", location: "Remote", salary: "₹12–18 LPA", type: "Full-time" },
  { title: "Frontend Developer", company: "Netflix", location: "Bangalore", salary: "₹10–16 LPA", type: "Full-time" },
  { title: "Frontend Developer", company: "Adobe", location: "Hyderabad", salary: "₹8–14 LPA", type: "Contract" },

  { title: "Backend Developer", company: "Amazon", location: "Bangalore", salary: "₹15–22 LPA", type: "Full-time" },
  { title: "Backend Developer", company: "Flipkart", location: "Remote", salary: "₹12–20 LPA", type: "Remote" },
  { title: "Backend Developer", company: "Uber", location: "Hyderabad", salary: "₹14–21 LPA", type: "Full-time" },

  { title: "UI Designer", company: "Microsoft", location: "Hyderabad", salary: "₹8–12 LPA", type: "Full-time" },
  { title: "UI Designer", company: "Figma", location: "Remote", salary: "₹7–11 LPA", type: "Remote" },
  { title: "UI Designer", company: "Canva", location: "Bangalore", salary: "₹6–10 LPA", type: "Contract" },

  { title: "Software Engineer", company: "Meta", location: "Remote", salary: "₹20–30 LPA", type: "Full-time" },
  { title: "Software Engineer", company: "Apple", location: "Bangalore", salary: "₹18–28 LPA", type: "Full-time" },
  { title: "Software Engineer", company: "Tesla", location: "Hyderabad", salary: "₹16–25 LPA", type: "Full-time" }
];

// DOM elements
const jobList = document.getElementById("job-list");
const searchInput = document.getElementById("searchInput");
const locationFilter = document.getElementById("locationFilter");
const typeFilter = document.getElementById("typeFilter");

// modal elements
const modal = document.getElementById("job-modal");
const closeBtn = document.getElementById("close-modal");

// saved jobs
let savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];

// display jobs
function displayJobs(jobArray) {
  jobList.innerHTML = "";

  if (jobArray.length === 0) {
    jobList.innerHTML = "<p>No suitable tasks found.</p>";
    return;
  }

  jobArray.forEach(job => {
    const jobCard = document.createElement("div");
    jobCard.classList.add("job-card");

    jobCard.innerHTML = `
      <div class="job-title">${job.title}</div>
      <div class="job-company">${job.company}</div>
      <div class="job-location">${job.location}</div>
      <div class="job-salary">${job.salary}</div>
      <div class="job-type">${job.type}</div>
      <button class="apply-btn">Apply</button>
      <button class="save-btn">Save</button>
    `;

    const saveBtn = jobCard.querySelector(".save-btn");
const applyBtn = jobCard.querySelector(".apply-btn");

applyBtn.addEventListener("click", (event) => {
  event.stopPropagation();

  // for now just feedback
  alert("Redirecting to application portal...");
});

    // check if already saved
    const isSaved = savedJobs.some(
      saved => saved.title === job.title && saved.company === job.company
    );

    if (isSaved) {
      saveBtn.textContent = "Saved";
      saveBtn.disabled = true;
    }

    // SAVE BUTTON
    saveBtn.addEventListener("click", (event) => {
      event.stopPropagation();

      if (!isSaved) {
        savedJobs.push(job);
        localStorage.setItem("savedJobs", JSON.stringify(savedJobs));

        saveBtn.textContent = "Saved";
        saveBtn.disabled = true;

        const toast = document.getElementById("toast");
        toast.classList.add("show");

        setTimeout(() => {
          toast.classList.remove("show");
        }, 2000);
      }
    });

    // OPEN MODAL
    jobCard.addEventListener("click", () => {
      document.getElementById("modal-title").textContent = job.title;
      document.getElementById("modal-company").textContent = "Company: " + job.company;
      document.getElementById("modal-location").textContent = "Location: " + job.location;
      document.getElementById("modal-salary").textContent = "Salary: " + job.salary;
      document.getElementById("modal-type").textContent = "Type: " + job.type;

      modal.classList.remove("hidden");
    });

    jobList.appendChild(jobCard);
  });
}

// filter logic
function applyFilters() {
  const searchValue = searchInput.value.toLowerCase();
  const locationValue = locationFilter.value;
  const typeValue = typeFilter.value;

  const filtered = jobs.filter(job => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchValue) ||
      job.company.toLowerCase().includes(searchValue) ||
      job.location.toLowerCase().includes(searchValue);

    const matchesLocation =
      locationValue === "" || job.location === locationValue;

    const matchesType =
      typeValue === "" || job.title === typeValue;

    return matchesSearch && matchesLocation && matchesType;
  });

  displayJobs(filtered);
}

// event listeners
searchInput.addEventListener("input", applyFilters);
locationFilter.addEventListener("change", applyFilters);
typeFilter.addEventListener("change", applyFilters);

// CLOSE BUTTON
closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// CLICK OUTSIDE TO CLOSE
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.add("hidden");
  }
});

// PREVENT INNER CLICK FROM CLOSING
const modalContent = document.querySelector(".modal-content");

if (modalContent) {
  modalContent.addEventListener("click", (event) => {
    event.stopPropagation();
  });
}

// initial load
displayJobs(jobs);