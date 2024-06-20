import React, { useState } from 'react'
import { Divider, Radio, Table } from 'antd';
import Loading from '../Loading/Loading';


const TableComponent = (props) => {
    const {selectionType="checkbox",data=[],isLoading=false,columns} = props;
    return (
      <Loading spinning={isLoading}>
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