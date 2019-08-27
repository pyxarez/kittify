import { WiredCheckbox } from "wired-elements";

const checkbox = document.getElementsByTagName("wired-checkbox")[0];

chrome.storage.sync.get('checked', function (data) {
  console.log(data);
  checkbox.checked = data.checked;
});

checkbox.addEventListener("change", function (event) {
  chrome.storage.sync.set({ checked: !event.target.checked }, function () {
    console.log("Change checked");
  });
});