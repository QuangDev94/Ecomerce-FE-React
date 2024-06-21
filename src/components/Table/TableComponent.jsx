import React, { useMemo, useState } from 'react'
import { Divider, Radio, Table } from 'antd';
import Loading from '../Loading/Loading';
import { Excel } from "antd-table-saveas-excel";

const TableComponent = (props) => {
    const {selectionType="checkbox",data=[],isLoading=false,columns} = props;

    const newColumn = useMemo(() => {
      const filterColumns = columns.filter((col) => col.dataIndex !== 'action');
      return filterColumns;
    },[columns]);

    const handleClick = () => {
      const excel = new Excel();
      excel
        .addSheet("test")
        .addColumns(newColumn)
        .addDataSource(data, {
          str2Percent: true
        })
        .saveAs("Excel.xlsx");
    };
    return (
      <Loading spinning={isLoading}>
          <button onClick={handleClick} style={{
            padding: '5px',
            marginTop: '10px',
            cursor: 'pointer',
            
          }}>Export</button>
          <div style={{marginTop: '10px'}}>
            <Table
              columns={columns}
              dataSource={data}
              {...props}
            />
          </div>
      </Loading>
      );
}

export default TableComponent