/* eslint-disable */
const TableUtil = {
  filterTableData: function (tableColumns, dataArray, filterText) {
    if (filterText != null) {
      filterText = filterText.trim();
      if (filterText !== "") {
        return dataArray.filter(item => {
          let match = false;
          tableColumns.forEach(column => {
            if (column.property !== null) {
              const value = item[column.property];
              if (value != null) {
                if (value.toString().toLowerCase().indexOf(filterText) > -1) {
                  match = true;
                }
              }
            }
          });
          return match;
        });
      }
    }
    return dataArray;
  },
};
export default TableUtil;
