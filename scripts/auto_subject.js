(() => {
    var Subject = [];
//
const head_html =
  "<style>" +
  "#fixed-frame {" +
  "position: fixed;" +
  "height: 298px; " +
  "width: 235px;" +
  "opacity: 0.95;" +
  "background-color: antiquewhite;" +
  "bottom: 0px;" +
  "right: 0px" +
  "}" +
  ".table-row-head {" +
  "font-size: 12px;" +
  "}" +
  ".table-row {" +
  "font-size: 10px;" +
  "}" +
  ".table-row > td {" +
  " border: 1px solid" +
  "}" +
  "</style>" +
  '<div id="fixed-frame">' +
  "<table>" +
  '<thead class="table-row-head">' +
  "<tr>" +
  "<th>Choose</th>" +
  "<th>Tên Môn Học</th>" +
  "<th>Mã Nhóm</th>" +
  "</tr>" +
  "</thead>" +
  "<tbody>";

const tail_html = "</tbody></table></div>";

function build(html, name, nhom) {
  return `<tr class="table-row"><td>${html} </td><td >${name}</td><td >${nhom}</td></tr>`;
}
chrome.storage.sync.get("setupSubject", function(data) {
  Subject = data.setupSubject;
  if (
    (window.location.href ==
      "http://qldt.ptit.edu.vn/Default.aspx?page=dkmonhoc" ||
      window.location.href ==
        "https://qldt.ptit.info/Default.aspx?page=dkmonhoc") &&
    Array.isArray(Subject)
  ) {
    let html = head_html;
    for (index = 0; index < Subject.length; index++) {
      var arr = Subject[index].split("|");
      html += build(Subject[index], arr[2], arr[3]);
    }
    html += tail_html;
    console.log(html);
    $().ready(function() {
      $("body").append(html);
    });
  }
});

})();