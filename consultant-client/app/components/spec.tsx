"use client";

import { Fragment } from "react";
import { Font } from "./font";
import Navigation from "./navigation";
import AdminGTableComponent from "./admin.gtable";

const TablePageLayout = ({count, title, columns, rows, page, component, isCount = true, loading, previous, next, currentPage}: any) => {
    return(
        <Fragment>
            <div className="w-full h-[auto] bg-[#fff] border rounded-[10px] overflow-hidden">
                <div className="w-full h-[auto] bg-[#ECEDF1] px-[15px] py-[13px]">
                    <div className="w-full flex flex-col space-y-[10px] md:space-y-[0px] md:flex-row justify-between items-start md:items-end">
                        {isCount &&
                            <div className="flex flex-col">
                                <Font style="text-[18px] text-[#3FA46E] font-[700]">{count}</Font>
                                <Font style="text-[10px] text-[#8F8F8F]">{title}</Font>
                            </div>
                        }
                        <div className="w-[auto]">
                            {component}
                        </div>
                    </div>
                </div>
                <AdminGTableComponent
                    columns={columns}
                    rows={rows}
                    callback={() => {}}
                    page={page}
                    title={page}
                    loading={loading}
                />
            </div>
            <Navigation previous={previous} next={next} count={count} page={currentPage} />
        </Fragment>
    )
}

export default TablePageLayout;