"use client";
import React, { Dispatch, Fragment, SetStateAction, useState } from "react";
import EmptyScreen from "./empty";
import { Loader } from "./loader";
import { TableRowAnimation } from "./animation";

interface TableTypes {
  columns: string[];
  rows: any[];
  callback: () => void;
  page: string;
  title: string;
  loading?: boolean;
}

const AdminGTableComponent: React.FC<TableTypes> = ({
  columns,
  rows,
  callback,
  page,
  title,
  loading,
}) => {
  const [details, setDetails] = useState(false);
  const [row, setRow] = useState<{ [key: string]: string }>({});
  console.log(details)
  console.log(row)

  return (
    <Fragment>
      <div className="flex flex-col gap-12 relative">
        <div className="w-full flex flex-row items-start justify-center">
          {!loading && rows?.length === 0 ? (
            <div className="w-full flex items-center justify-center min-h-[420px]">
              <EmptyScreen btnText={title} callback={callback} page={page} />
            </div>
          ) : (
            <div className="w-full grid">
              <div className="w-full hidden md:block">
                <DesktopTable rows={rows} columns={columns} loading={loading} />
              </div>
              <div className="w-full block md:hidden">
                <MobileTable
                  rows={rows}
                  columns={columns}
                  setDetails={setDetails}
                  rowDetail={setRow}
                  loading={loading}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

const DesktopTable = ({
  rows,
  columns,
  loading,
}: {
  rows: { [key: string]: string }[];
  columns: string[];
  loading: boolean | undefined;
}) => {
  return (
    <Fragment>
      {loading && <Loader table={true} />}
      {loading || (
        <table className="table-auto w-full">
          <thead className="bg-[#ECEDF1]">
            <tr>
              {columns.map((v, i) => {
                return (
                  <th
                    className={`text-[12px] text-[#000] ${
                      i === 0? "flex flex-row justify-start px-[15px] py-[5px]": "px-[15px] py-[5px]"
                    }`}
                    key={i}
                  >
                    <span>{v}</span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows?.map((v, i) => {
              return (
                <TableRowAnimation key={i} index={i}>
                  {Object.values(v).map((w, j) => {
                    return (
                      <td
                        className={`text-[12px] text-[#000] text-center px-[5px] py-[5px]`}
                        key={j}
                      >
                        <span>{w}</span>
                      </td>
                    );
                  })}
                </TableRowAnimation>
              );
            })}
          </tbody>
        </table>
      )}
    </Fragment>
  );
};

interface MobileType {
  rows: { [key: string]: string }[];
  columns: string[];
  setDetails: Dispatch<SetStateAction<boolean>>;
  rowDetail: Dispatch<SetStateAction<{ [key: string]: string }>>;
  loading: boolean | undefined;
}

const MobileTable: React.FC<MobileType> = ({
  rows,
  columns,
  setDetails,
  rowDetail,
  loading,
}) => {
  const mobileColumns = () => {
    const colCopy = [...columns];
    const [sn, first, second] = colCopy;
    const last = colCopy.pop();
    return [sn, first, second, last];
  };

  const mobileRows = () => {
    if (rows) {
      const rowCopy = [...rows];
      const reducedArray = rowCopy.map((item) => {
        const partialObject = Object.fromEntries(
          Object.entries(item).slice(0, 3)
        );
        return partialObject;
      });
      return reducedArray;
    }
  };

  const openDetail = (row: { [key: string]: string }) => {
    rowDetail(row);
    setDetails((prev) => !prev);
  };

  return (
    <Fragment>
      {loading && <Loader table={true} />}
      {loading || (
        <table className="table-auto w-full">
          <thead className="bg-[#0E262E]">
            <tr>
              {mobileColumns().map((v, i) => {
                return (
                  <th
                    className={"px-[5px] py-[15px] text-[12px] text-[#ccc]"}
                    key={i}
                  >
                    {v}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {mobileRows()?.map((v, i) => {
              return (
                <tr className="border-t border-[#F5F5F51A]" key={i}>
                  {Object.values(v).map((w, j) => {
                    return (
                      <td
                        className={`text-[12px] text-[#fff] text-center ${
                          i % 2 === 0
                            ? "bg-[#0E262E] px-[5px] py-[5px]"
                            : "bg-[#0E262E] px-[5px] py-[10px]"
                        }`}
                        key={j}
                      >
                        {w}
                      </td>
                    );
                  })}
                  <td
                    className={`text-[12px] text-[#fff] text-center ${
                      i % 2 === 0
                        ? "bg-[#0E262E] px-[5px] py-[5px]"
                        : "bg-[#0E262E] px-[5px] py-[10px]"
                    } flex items-center justify-center`}
                  >
                    <div
                      onClick={() => {
                        openDetail(rows[i]);
                      }}
                      className="w-[60px] px-[5px] py-[7px] bg-[#0E262E] border border-[#3FA46E] rounded-[5px] text-[#3FA46E]"
                    >
                      Details
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </Fragment>
  );
};

export default AdminGTableComponent;
