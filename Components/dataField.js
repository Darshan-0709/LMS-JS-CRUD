import input from "./input.js";
import label from "./label.js";
import { renderImages } from "./renderImages.js";

export default (name, value, isInput, inputInfo, files) => {
  const div = document.createElement("div");
  div.classList.add("field");

  if (isInput) {
    let fileHolder = null;
    if (inputInfo?.config?.type === "file") {
      fileHolder = document.createElement("div");
    }
    const inputEle = input(
      name,
      value,
      inputInfo.config,
      inputInfo.callback,
      inputInfo.errors,
      files,
      fileHolder
    );

    if (name === "id") {
      return inputEle;
    }

    const labelEle = label(name);
    div.append(labelEle);

    const inputDiv = document.createElement("div");
    inputDiv.append(inputEle);
    if (fileHolder) inputDiv.append(fileHolder);
    inputDiv.setAttribute(`data-error`, name);
    div.append(inputDiv);
    return div;
  }
  const nameEle = document.createElement("div");
  const valueEle = document.createElement("div");
  valueEle.classList.add("product-info");
  nameEle.textContent = name;
  if (name === "images") {
    renderImages(value, valueEle, false);
  } else {
    valueEle.textContent = value;
  }

  div.append(nameEle);
  div.append(valueEle);
  return div;
};
