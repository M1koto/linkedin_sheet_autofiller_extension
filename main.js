//html elements
const sheet_id = localStorage.getItem("sheet_id")
const add_button = document.getElementById("add_button")

//columns to input value
var job_title	
var company;
var	location;	
var date_posted;	
var tag;
var status;
var target_url;

//functions
function parser (title) {
    //Get company
    let reg = "[A-Za-z0-9]+ hiring "
    let matcher = title.match(reg)[0]
    company = matcher.split(" ")[0]
    //Get Job title
    reg = "(?<=hiring )(.+)(?= in )"
    job_title = title.match(reg)[0]
    //Get location
    reg = "(?<= in )[^\|]+(?= | LinkedIn )"
    location = title.match(reg)[0]
    console.log(location, company, job_title)
}
//https://www.linkedin.com/jobs/view/2626542900/
function httpGetAsync(theUrl)
{
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onload = function() {
        console.log(this.responseXML.title)
        parser(this.responseXML.title)
      }
    xmlHttp.open("GET", theUrl);
    xmlHttp.responseType = "document";
    xmlHttp.send();
}

add_button.addEventListener("click", function() {
    target_url = document.getElementById("job_url").value
    let res = httpGetAsync(target_url)
})

