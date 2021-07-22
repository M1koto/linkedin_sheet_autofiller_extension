
const confirm_button = document.getElementById("sheet_button")

confirm_button.addEventListener("click", function() {
    const sheet_link = document.getElementById("sheet_link").value
    let reg = "\/d\/[A-Za-z0-9_|-]+\/"
    let matcher = sheet_link.match(reg)
    let spreadsheetId = matcher[0].slice(3, matcher[0].length - 1)
    localStorage.setItem("sheet_id", spreadsheetId)
})
//https://docs.google.com/spreadsheets/d/1tgXa40G_q2-TdbCenaLT421SJONAmub5WrE5PEBChqU/edit#gid=0
