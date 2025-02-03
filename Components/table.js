import tableHeader from "./tableHeader.js";
import tableRow from "./tableRow.js";

export default (model) => {
  if (!model?.length > 0) return null;
  const table = document.createElement("table");
  const headers = Object.keys(model[0]);
  const th = tableHeader(headers, ["table-header"]);
  table.append(th);
  const tbody = document.createElement("tbody");
  model.forEach((row) => {
    const tr = tableRow(row);
    tbody.append(tr);
  });
  table.append(tbody);
  return table;
};
