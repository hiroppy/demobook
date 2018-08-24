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

import * as prettyBytes from 'pretty-bytes';
import { Item } from './controllers/demos';

const separator = '---';

function tableHeader() {
  return `|  Project Name  | Published Time | Total Size |
| -- | -- | -- |`.trim();
}

function tableRow({
  projectName,
  url,
  date,
  totalSize
}: Pick<Item, 'projectName' | 'url' | 'date' | 'totalSize'>) {
  return `|  [${projectName}](${url})  |  ${date} | ${prettyBytes(totalSize)} |`.trim();
}

function createSection(title: string, body: string) {
  return `## ${title}
${tableHeader()}
${body.trim()}`.trim();
}

function replaceFromSection(item: Item, table: string) {
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

function insertRowToTable(row: string, table: string) {
  const [title, header, separator, ...rest] = table.trim().split('\n');
  const body = [row, ...rest];
  const newTable = [title, header, separator, ...body].join('\n');

  return newTable;
}

function hasItemInTable(item: Item, table: string) {
  const arr = table.split('\n');

  return arr.some((c) => c.includes(`[${item.projectName}]`));
}

function getInfo() {
  return `## Info 🤓

Hosting Server: ${process.env.URL}

<sub>Supported by <a href="https://github.com/hiroppy/demobook">demobook</a>.</sub>`;
}

export function generateOutput(item: Item, beforeBody: string | null) {
  if (!beforeBody) {
    // create body
    const body = tableRow(item);

    // only current
    return createSection('Current 🔥', body);
  }

  // parse before body
  const [current, log, info] = beforeBody.split(separator); // center separator

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

${createSection('Log 📝', oldRow)}

${separator}

${getInfo()}`;
    }
  }

  const { newTable, oldRow } = replaceFromSection(item, current);
  const logTable = oldRow === '' ? log.trim() : insertRowToTable(oldRow, log.trim());

  return `${newTable}

${separator}

${logTable}

${separator}

${getInfo()}`;
}
