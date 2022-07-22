import { FetchParams } from "../stores/GridStore";

export const getGridData = async({filter = "", filterKey = null, pageNumber = 1, recordsPerPage = 10}  :FetchParams) => {
  const response = await fetch('data.json' ,{
    headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
     }
  });
  const gridData = await response.json();

  // Filtering records
  if (filter && filter.length > 0) {
    gridData.results = gridData.results.filter(result => result[filterKey!].contains(filter));
  }

  // Paginating
  const startingRecord = (pageNumber - 1) * recordsPerPage;
  gridData.results = gridData.results.slice(startingRecord, startingRecord + recordsPerPage);

  gridData.pageTotal = recordsPerPage;
  gridData.pageNumber = pageNumber;

  return processData(gridData);
}

function processData({results, columns, pageTotal, total, pageNumber}) {
    const rows = results.map((row: any) => {
        return {
            docId: row.document.docId,
            name: row.name,
            documentType: row.document.documentType.documentTypeAcronym,
            displayRevision: row.displayRevision,
            displayStatus: row.displayStatus,
            effectiveDate: row.effectiveDate,
            owner: row.owner.user.name,
            description: row.description,
            crId: row.changeRequest.crId,
        }
    });

    let columnsOrder: Array<string> = [];
    for (const key of Object.keys(columns)) {
      if (columns[key].isVisible) {
        const index = columns[key].index;
        columnsOrder[index] = key;
      }
    }

    columnsOrder = columnsOrder.filter(column => column);
    const data = {
      rows, columnsOrder, columns, pageTotal, total, pageNumber 
    }
    console.log(data);
    return data;
}