export const getGridData = async() => {
  const response = await fetch('data.json' ,{
    headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
     }
  });
  const gridData = await response.json();
  return  processData(gridData);
}

function processData({results, columns, pageTotal, total}) {
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
    return {
      rows, columnsOrder, columns, pageTotal, total 
    }
}