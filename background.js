'use strict'
const l = console.log
const n = console.log.bind(null, '\n')
const i = console.info
const w = console.warn
const e = console.error


//const SEP = '\n'
const MENU_ID = '1'
const textarea = document.querySelector('textarea')




chrome.runtime.onInstalled.addListener(function (details) {
  l('runtime.onInstalled()', details)

  init()
})




chrome.runtime.onStartup.addListener(function () {
  l('runtime.onStartup()', arguments)

  init()
})




function init() {
  l('init()')

  chrome.contextMenus.create({
    title: 'Copy page URL && close tab',
    contexts: [ 'page' ],
    id: MENU_ID
  })
}




chrome.contextMenus.onClicked.addListener(function (info, tab) {
  l('contextMenus.onClicked()', info, tab)

  if (tab.id === chrome.tabs.TAB_ID_NONE) {
    w('trying to close extension popup')
    return
  }

  mainJob(tab)
})




chrome.browserAction.onClicked.addListener(function (tab) {
  l('browserAction.onClicked()', tab)

  mainJob(tab)
})




function mainJob(tab) {
  l('mainJob()')

//  copyToClipboard(tab.url + SEP + tab.title + SEP)
  copyToClipboard(tab.url)

  chrome.tabs.query({ currentWindow: true }, function (tabs) {
    l('tabs.query', tabs)

    if (tabs.length === 1) {
      // keep one tab
      chrome.tabs.create({ })
    }
    chrome.tabs.remove(tab.id)
  })
}




function copyToClipboard(text) {
  l('copyToClipboard()', text)

  textarea.value = text
  textarea.select()
  const result = document.execCommand('copy')
  l('document.execCommand()', result)
}
