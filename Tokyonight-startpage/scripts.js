/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {}
const engine = "glowstery"
const engineUrls = {
  duckduckgo: "https://duckduckgo.com/?q=",
  youtube: "https://www.youtube.com/results?q=",
  glowstery: "https://glowstery.com/search?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"7TrD7ZC69F9UDqPO","label":"reddit","bookmarks":[{"id":"gyqACcHEaDea6sps","label":"r/startpages","url":"https://www.reddit.com/r/startpages/"},{"id":"OT12eKZfd4WfdT6t","label":"r/typescript","url":"https://www.reddit.com/r/typescript/"},{"id":"1A3Q7HYS1orSduKJ","label":"r/unixporn","url":"https://www.reddit.com/r/unixporn/"}]},{"id":"a0HtTn72y4VoqOCU","label":"worth reading","bookmarks":[{"id":"Mfv8v4R8gQxtf30B","label":"happy hues","url":"https://www.happyhues.co/"},{"id":"lj0UZI4afHJJeeGC","label":"styled-components","url":"https://www.joshwcomeau.com/react/demystifying-styled-components/"},{"id":"UEPKXzvSzpWCCkfH","label":"react docs","url":"https://reactjs.org/docs/getting-started.html"}]},{"id":"UgLh25idOlHrCNQD","label":"sources","bookmarks":[{"id":"EcXzrLcM4JzYnSdg","label":"gif","url":"https://designyoutrust.com/2019/05/the-chill-and-retro-motion-pixel-art-of-motocross-saito/"},{"id":"Lq3vUabWnLr88vNg","label":"@startpage","url":"https://prettycoffee.github.io/startpage"},{"id":"Gm8hW88psK1ju6xo","label":"author","url":"https://prettycoffee.github.io/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
