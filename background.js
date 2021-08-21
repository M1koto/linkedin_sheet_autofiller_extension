const API_KEY = 'API_KEY';
const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
const SPREADSHEET_ID = 'SPREADSHEET_ID';
const SPREADSHEET_TAB_NAME = 'Sheet1';

// _________________________________________________________
//columns to input value
var job_title;	
var company;
var	location;	
var date_posted;	
var tag;
var status;
var target_url;

//reference
var fileref=document.createElement('script');
fileref.setAttribute("src", "https://apis.google.com/js/client.js?onload=onGAPILoad");

//on click of icon fetch job info and write to gogole api
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.getSelected(null, function(tab) {
    parser(tab.title)
    write_sheet()
  });
});

// functions ________________________________________

//initiate login to use google API
function onGAPILoad() {
  gapi.client.init({
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
        //store where we should start writing here
        end_row = response.result.values.length
        console.log(`starting write from ${end_row}`)
        chrome.tabs.getSelected(null, function(tab) {
          console.log('Successfully registered')
      });
      });
    })
  }, function(error) {
    console.log('error', error)
  });
}

//parse title
function parser (title) {
    //Get job
    spl = title.split(" | ")
    job_title = spl[0]
    //Get company
    company = spl[1]
    //Get location
    //reg = "(?<= in )[^\|]+(?= | LinkedIn )"
    //location = title.match(reg)[0]
    console.log(company)
    console.log(job_title)
}

function write_sheet () {
  //format cells to update
    ranges = "B" + String(end_row+1) + ":C"
    var values = [
        [
          job_title, company
        ],
      ];
      var body = {
        values: values
      };
      gapi.client.sheets.spreadsheets.values.update({
         spreadsheetId: SPREADSHEET_ID,
         range: ranges,
         valueInputOption: "RAW",
         resource: body
      }).then((response) => {
        var result = response.result;
        console.log(`${result.updatedCells} cells updated.`);
      });
}