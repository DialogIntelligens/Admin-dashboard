import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const TableSkelton = ({ Rows }) => {
  const renderSkeletonRows = () => {
    let rows = [];
    for (let i = 0; i < 5; i++) {
      let cells = [];
      for (let j = 0; j < Rows; j++) {
        cells.push(
          <td key={j}>
            <Skeleton height={20} />
          </td>
        );
      }
      rows.push(
        <tr key={i}>
          {cells}
        </tr>
      );
    }
    return rows;
  };

  return <>{renderSkeletonRows()}</>;
};

export default TableSkelton;
