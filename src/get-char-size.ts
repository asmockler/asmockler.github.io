export function getCharSize() {
  const el = document.createElement("p");
  el.style.position = "absolute";
  el.style.margin = "0";
  el.style.padding = "0";
  el.style.top = "0";
  el.style.left = "0";
  el.textContent = "0";

  document.body.appendChild(el);

  const size = el.getBoundingClientRect();

  document.body.removeChild(el);

  return size;
}
