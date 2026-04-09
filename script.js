const jobs = [
  { title: "Frontend Developer", company: "Google", location: "Remote" },
  { title: "Backend Developer", company: "Amazon", location: "Bangalore" },
  { title: "UI Designer", company: "Microsoft", location: "Hyderabad" },
  { title: "Software Engineer", company: "Meta", location: "Remote" }
];

// DOM elements
const jobList = document.getElementById("job-list");
const searchInput = document.getElementById("searchInput");
const locationFilter = document.getElementById("locationFilter");
const typeFilter = document.getElementById("typeFilter");

// saved jobs (persistent)
let savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];

// display jobs
function displayJobs(jobArray) {
  jobList.innerHTML = "";

  jobArray.forEach(job => {
    const jobCard = document.createElement("div");
    jobCard.classList.add("job-card");

    jobCard.innerHTML = `
      <div class="job-title">${job.title}</div>
      <div class="job-company">${job.company}</div>
      <div class="job-location">${job.location}</div>
      <button class="apply-btn">Apply</button>
      <button class="save-btn">Save</button>
    `;

    const saveBtn = jobCard.querySelector(".save-btn");

    // check if already saved
    const isSaved = savedJobs.some(saved => saved.title === job.title);

    if (isSaved) {
      saveBtn.textContent = "Saved";
      saveBtn.disabled = true;
    }

    saveBtn.addEventListener("click", () => {
      if (!isSaved) {
        savedJobs.push(job);
        localStorage.setItem("savedJobs", JSON.stringify(savedJobs));

        saveBtn.textContent = "Saved";
        saveBtn.disabled = true;

        alert("Job saved!");
      }
    });

    jobList.appendChild(jobCard);
  });
}

// filter + search logic
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

// initial load
displayJobs(jobs);