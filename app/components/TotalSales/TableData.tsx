import React from 'react';
import { Table } from 'react-bootstrap';

const TableData = () => {
  return (
    <Table
      style={{
        width: 1316,
        marginRight: 15,
        marginLeft: -15,
        marginTop: 16,
        marginBottom: -15,
      }}
    >
      <tbody>
        <tr>
          <td>Income</td>
          <td align="right">0</td>
        </tr>

        <tr>
          <td colSpan={2}>
            <Table className="table">
              <tbody>
                <tr>
                  <td>
                    <b>Tag Name</b>
                  </td>
                  <td>
                    <b>Quantity</b>
                  </td>
                  <td>
                    <b>Price</b>
                  </td>
                </tr>

                <tr>
                  <td>
                    <b>Total</b>
                  </td>
                  <td>
                    <b>0</b>
                  </td>
                  <td>
                    <b>0</b>
                  </td>
                </tr>
              </tbody>
            </Table>
          </td>
        </tr>

        <tr>
          <td>Expenses</td>
          <td align="right" style={{ color: 'red' }}>
            -0
          </td>
        </tr>

        <tr>
          <td>Worker/Stitching Cost</td>
          <td align="right" style={{ color: 'red' }}>
            -0
          </td>
        </tr>

        <tr>
          <td>Net</td>
          <td align="right">0</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default TableData;
