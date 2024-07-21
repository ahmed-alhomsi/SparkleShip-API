const fs = require("fs")

const SCHOLARSHIPSURL = "http://192.168.1.106:3000/api/scholarships"

let myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2Njg2N2Q0NzZmMmRjZjM0Y2M0NjRkN2UiLCJuYW1lIjoicmVmYXQgc29tYWlhIiwiaWF0IjoxNzIwMDkxMjA0LCJleHAiOjE3MjI2ODMyMDR9.vy3HP51Z1wry00-pcaRopj0Hcc-xr699iIXPD8jI6ts");

let requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

function AddJSONScholarships(oldScholarships) {

fs.readFile('./final.json', 'utf8', (err, json) => {
  if (err) {
    console.error(err);
    return;
  }

  let newData = json.replace(/Scholarship Name/gi, "title").replace(/Eligibility Country/gi, "nationalities").replace(/Eligibility GPA Scale/gi, "minimumGPA").replace(/Funding/gi, "funding").replace(/Course Start/gi, "applyDate").replace(/Study Location/gi, "location").replace(/Deadline/gi, "deadline").replace(/Degree Level/gi, "requiredDegree").replace(/Provider/gi, "providedBy").replace(/Scholarship link/gi, "link")

  fs.appendFileSync('./scholarships.json', newData);
  let newScholarships = JSON.parse(newData)
  
  let filteredScholarships = newScholarships.filter(
    function(scholarship) {
      return this.indexOf(scholarship) < 0;
    },
    oldScholarships
  )

  myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2Njg2N2Q0NzZmMmRjZjM0Y2M0NjRkN2UiLCJuYW1lIjoicmVmYXQgc29tYWlhIiwiaWF0IjoxNzIwMDkxMjA0LCJleHAiOjE3MjI2ODMyMDR9.vy3HP51Z1wry00-pcaRopj0Hcc-xr699iIXPD8jI6ts");

  const addScholarshipsWithDelay = async (scholarships, delay) => {
    for (let i = 0; i < scholarships.length; i++) {
      const scholarship = scholarships[i];
  
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(scholarship),
        redirect: "follow"
      };
  
      try {
        const response = await fetch(SCHOLARSHIPSURL, requestOptions);
        const result = await response.text();
        console.log(result);
      } catch (error) {
        console.error('Error:', error);
      }
  
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  };
  
  addScholarshipsWithDelay(filteredScholarships, 1000);
});
}

fetch(SCHOLARSHIPSURL, requestOptions)
  .then((response) => response.json())
  .then((result) => AddJSONScholarships(result.scholarships))
  .catch((error) => console.error(error));

