//html elements
const sheet_id = localStorage.getItem("sheet_id")
const add_button = document.getElementById("add_button")

//columns to input value
var job; 
var title;	
var company;
var	location;	
var date_posted;	
var tag;
var status;
var target_url;

//functions
function html_parser () {
    console.log(this.responseText);
}

function httpGetAsync(theUrl)
{
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.addEventListener("load", html_parser);
    xmlHttp.open("GET", theUrl);
    xmlHttp.send();
    return this.responseText
}

add_button.addEventListener("click", function() {
    target_url = document.getElementById("job_url").value
    let res = httpGetAsync(target_url)
})

