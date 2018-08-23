'use strict';

/*
## Current
| title | title| title |
| --- | --- | --- |
| main | date| size|
| main | date| size|
| main | date| size|

## Log
| title | title| title |
| --- | --- | --- |
| main | date| size|
| main | date| size|
| main | date| size|
*/

const separator = '---';

function tableHeader() {
  return `|  Project Name  | Published Time | Total Size (byte) |
| -- | -- | -- |`.trim();
}

function tableRow({ projectName, url, date, totalSize }) {
  return `|  [${projectName}](${url})  |  ${date} | ${totalSize} |`.trim();
}

function createSection(title, body) {
  return `## ${title}
${tableHeader()}
${body.trim()}`.trim();
}

function replaceFromSection(item, table) {
  const arr = table.split('\n');
  let oldRow = '';
  let newTable = '';

  const existed = arr.some((c) => c.includes(`[${item.projectName}]`));

  if (existed) {
    newTable = arr
      .map((c) => {
        if (c.includes(`[${item.projectName}]`)) {
          oldRow = c.trim();
          return tableRow(item);
        }
        return c;
      })
      .join('\n')
      .trim();
  } else {
    newTable = insertRowToTable(tableRow(item), table).trim();
  }

  return {
    newTable,
    oldRow
  };
}

function insertRowToTable(row, table) {
  const [title, header, separator, ...rest] = table.trim().split('\n');
  const body = [row, ...rest];
  const newTable = [title, header, separator, ...body].join('\n');

  return newTable;
}

function hasItemInTable(item, table) {
  const arr = table.split('\n');

  return arr.some((c) => c.includes(`[${item.projectName}]`));
}

function generateOutput(item, beforeBody) {
  if (!beforeBody) {
    // create body
    const body = tableRow(item);

    // only current
    return createSection('Current 🔥', body);
  }

  // parse before body
  const [current, log] = beforeBody.split(separator); // center separator

  // only Current exists
  if (!log) {
    // check Current exists
    if (!hasItemInTable(item, current.trim())) {
      return insertRowToTable(tableRow(item), current.trim());
    } else {
      // create Log section

      const { newTable, oldRow } = replaceFromSection(item, current.trim());

      return `${newTable}

${separator}

${createSection('Log 📝', oldRow)}`;
    }
  }

  const { newTable, oldRow } = replaceFromSection(item, current);
  const logTable = oldRow === '' ? log.trim() : insertRowToTable(oldRow, log.trim());

  return `${newTable}

${separator}

${logTable}`;
}

module.exports = generateOutput;
