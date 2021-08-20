const API_KEY = 'AIzaSyDjYbgdK9aDlm_flYiNM9Uebt32F44VdR8';
const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
const SPREADSHEET_ID = '1tgXa40G_q2-TdbCenaLT421SJONAmub5WrE5PEBChqU';
const SPREADSHEET_TAB_NAME = 'Sheet1';

function onGAPILoad() {
  gapi.client.init({
    // Don't pass client nor scope as these will init auth2, which we don't want
    apiKey: API_KEY,
    discoveryDocs: DISCOVERY_DOCS,
  }).then(function () {
    console.log('gapi initialized')
    chrome.identity.getAuthToken({interactive: true}, function(token) {
      console.log(token)
      gapi.auth.setToken({
        'access_token': token,
      });

      gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: SPREADSHEET_TAB_NAME,
      }).then(function(response) {
        end_row = response.result.values.length
        localStorage.setItem("number_rows", end_row)
        console.log(`starting write from ${end_row}`)
        write_sheet()
      });
    })
  }, function(error) {
    console.log('error', error)
  });
}

// _________________________________________________________
//columns to input value
var job_title;	
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
        parser(this.responseXML.title)
      }
    xmlHttp.open("GET", theUrl);
    xmlHttp.responseType = "document";
    xmlHttp.send();
}

document.addEventListener("click", function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var tab = tabs[0].url;
 });
  write_sheet()
})

function write_sheet () {
    var values = [
        [
          "test"
        ],
      ];
      var body = {
        values: values
      };
      gapi.client.sheets.spreadsheets.values.update({
         spreadsheetId: SPREADSHEET_ID,
         range: "A1",
         valueInputOption: "RAW",
         resource: body
      }).then((response) => {
        var result = response.result;
        console.log(`${result.updatedCells} cells updated.`);
      });
}