const API_KEY = 'AIzaSyDjYbgdK9aDlm_flYiNM9Uebt32F44VdR8';
const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
const SPREADSHEET_ID = '1tgXa40G_q2-TdbCenaLT421SJONAmub5WrE5PEBChqU';
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
        chrome.tabs.getSelected(null, function(tab) {
           httpGetAsync(tab.url, function() {
             console.log('Successfully get job info')
           })
      });
        write_sheet()
      });
    })
  }, function(error) {
    console.log('error', error)
  });
}

//functions
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


chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.getSelected(null, function(tab) {
    parser(tab.title)
    write_sheet()
  });
});

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