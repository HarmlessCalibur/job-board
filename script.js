const jobs = [
  { title: "Frontend Developer", company: "Google", location: "Remote" },
  { title: "Backend Developer", company: "Amazon", location: "Bangalore" },
  { title: "UI Designer", company: "Microsoft", location: "Hyderabad" },
  { title: "Software Engineer", company: "Meta", location: "Remote" }
];

const jobList = document.getElementById("job-list");

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
    `;

    jobList.appendChild(jobCard);
  });
}

displayJobs(jobs);