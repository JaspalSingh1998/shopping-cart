export default function addGlobalEventListener(type, selector, callback) {
  return document.addEventListener(type, (e) => {
    if (e.target.matches(selector)) {
      callback(e);
    }
  });
}
