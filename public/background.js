chrome.runtime.onMessage.addListener((reason) => {
  if (reason.author === 'stonelawfirm') {
    console.log(reason);
    chrome.tabs.create({
      url: reason.url
    });
  }
})