let identity = 0;
const HtmlElement = function (type, textContentt) {
  this.type = type;
  this.id = identity;
  this.textContentt = textContentt;
  identity += 1;

  if (new.target) {
    throw new Error("this is abstruct class");
  }
};
HtmlElement.prototype.render = function () {
  const doc = document.createElement(this.type);
  doc.id = "elm" + this.id;
  if (this.type == "img") {
    doc.src = this.src;
    doc.alt = this.alt;
  } else if (this.type == "select") {
    for (const opt of this.optionsInSelect) {
      const option = document.createElement("option");
      option.textContent = opt;
      doc.appendChild(option);
    }
  } else {
    doc.textContent = this.textContentt;

    console.log("jhg");
  }
  document.body.append(doc);
};
const ImageElement = function (src, alt) {
  this.src = src;
  this.alt = alt;
  HtmlElement.call(this, "img");
};
const SelectElement = function (optionsInSelect) {
  this.optionsInSelect = optionsInSelect;

  HtmlElement.call(this, "select");
};
ImageElement.prototype = Object.create(HtmlElement.prototype);
SelectElement.prototype = Object.create(HtmlElement.prototype);

function createElements() {
  const caption = document.getElementById("caption1").value;
  const elementType = document.getElementById("element-type").value;

  try {
    const element = new HtmlElement(elementType, caption);
    element.render();
  } catch (error) {
    console.log(error.message);
  }
}
function createPicture() {
  const alt = document.getElementById("alt").value;
  const src = document.getElementById("src").value;

  try {
    const pic = new ImageElement(src, alt);
    pic.render();
  } catch (error) {
    console.log(error.message);
  }
}
function createSelect() {
  const lst = document.getElementById("lst").value.split(",");

  try {
    const sel = new SelectElement(lst);
    sel.render();
  } catch (error) {
    console.log(error.message);
  }
}
