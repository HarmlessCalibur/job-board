const jobs = [
  { title: "Frontend Developer", company: "Google", location: "Remote" },
  { title: "Backend Developer", company: "Amazon", location: "Bangalore" },
  { title: "UI Designer", company: "Microsoft", location: "Hyderabad" },
  { title: "Software Engineer", company: "Meta", location: "Remote" }
];

const jobList = document.getElementById("job-list");
const searchInput = document.getElementById("searchInput");

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

    // ✅ NOW jobCard exists, so we can select inside it
    const saveBtn = jobCard.querySelector(".save-btn");

    saveBtn.addEventListener("click", () => {
      savedJobs.push(job);
      localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
      alert("Job saved!");
    });

    jobList.appendChild(jobCard);
  });
}

searchInput.addEventListener("input", function () {
  const value = this.value.toLowerCase();

  const filtered = jobs.filter(job =>
    job.title.toLowerCase().includes(value) ||
    job.company.toLowerCase().includes(value) ||
    job.location.toLowerCase().includes(value)
  );

  displayJobs(filtered);
});
let savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
displayJobs(jobs);