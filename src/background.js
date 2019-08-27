chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.get('checked', function (data) {
    console.log(data);
    if (!data.checked) {
      chrome.storage.sync.set({ checked: true }, function () {
        console.log("Change checked");
      });
    }
  });

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostEquals: 'www.rambler.ru' },
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });

  chrome.webRequest.onBeforeRequest.addListener((...args) => {
    // chrome.storage.sync.get('checked', function (data) {
    //   console.log(data);
 
    //   if (data.checked) {
    //     return { redirectUrl: "https://cataas.com/cat" };
    //   }
    // });

    return { redirectUrl: "https://cataas.com/cat?" + Math.random() * 1000 };
  },
  {
    urls: [
      "*://store.rambler.ru/*",
      "*://*.rl0.ru/*",
      // "*://dsp-rambler.ru/*"
    ],
    types: ["image"]
  },
    ["blocking"]
  )
  // url: [{urlMatches : 'https://www.google.com/'}
});