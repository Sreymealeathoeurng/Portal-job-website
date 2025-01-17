document.addEventListener("DOMContentLoaded", function () {
    // Dropdown toggle functionality
    const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
    const dropdownMenus = document.querySelectorAll(".dropdown-menu");

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener("click", function (event) {
            event.preventDefault();
            const menu = this.nextElementSibling;
            const isExpanded = this.getAttribute("aria-expanded") === "true";

            // Close all dropdowns first
            dropdownMenus.forEach(menu => menu.classList.remove("show"));
            dropdownToggles.forEach(toggle => toggle.setAttribute("aria-expanded", "false"));

            // Toggle the clicked dropdown
            if (!isExpanded) {
                menu.classList.add("show");
                this.setAttribute("aria-expanded", "true");
            }
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener("click", function (event) {
        dropdownToggles.forEach(toggle => {
            const menu = toggle.nextElementSibling;
            if (!toggle.contains(event.target) && !menu.contains(event.target)) {
                menu.classList.remove("show");
                toggle.setAttribute("aria-expanded", "false");
            }
        });
    });

    // Job search functionality
    document.addEventListener("DOMContentLoaded", () => {
        // Search button functionality
        document.querySelector("#search").addEventListener("click", () => {
            const keyword = document.querySelector("input[placeholder='Keywords']").value.toLowerCase();
            const location = document.querySelector("#location").value.toLowerCase();
            const jobType = document.querySelector("#job-type").value.toLowerCase();
    
            document.querySelectorAll(".Job").forEach(job => {
                const jobText = job.innerText.toLowerCase();
                if (
                    (!keyword || jobText.includes(keyword)) &&
                    (!location || jobText.includes(location)) &&
                    (!jobType || jobText.includes(jobType))
                ) {
                    job.style.display = "block";
                } else {
                    job.style.display = "none";
                }
            });
        });
    
        // Checkbox filter functionality
        const filterCheckboxes = document.querySelectorAll(".big-block input[type='checkbox']");
        filterCheckboxes.forEach(checkbox => {
            checkbox.addEventListener("change", () => {
                const selectedFilters = Array.from(filterCheckboxes)
                    .filter(cb => cb.checked)
                    .map(cb => cb.nextElementSibling.textContent.toLowerCase());
    
                document.querySelectorAll(".Job").forEach(job => {
                    const jobText = job.innerText.toLowerCase();
                    if (selectedFilters.some(filter => jobText.includes(filter))) {
                        job.style.display = "block";
                    } else {
                        job.style.display = "none";
                    }
                });z
            });
        });
    
        // Save and Apply button functionality
        document.querySelectorAll(".buttons button").forEach(button => {
            button.addEventListener("click", function () {
                if (this.classList.contains("save")) {
                    alert("Job saved!");
                } else if (this.classList.contains("apply")) {
                    alert("Redirecting to application page...");
                }
            });
        });
    });
});    