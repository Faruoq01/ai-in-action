"use client";
import { Fragment } from "react";
import GTableComponent from "./gtable";
import Navigation from "./navigation";

const StudentTablePageLayout = ({count, title, columns, rows, page, component, isCount = true, loading}: any) => {
    console.log(count, title, isCount)
    return(
        <Fragment>
            <div className="w-full h-[auto] bg-[#0E262E] border-[#F5F5F51A] rounded-[10px] overflow-hidden">
                <div className="w-full h-[auto] bg-transparent px-[15px] py-[13px]">
                    <div className="w-full flex flex-col space-y-[10px] md:space-y-[0px] md:flex-row justify-between items-start md:items-end">
                        <div className="w-[auto]">
                            {component}
                        </div>
                    </div>
                </div>
                <GTableComponent
                    columns={columns}
                    rows={rows}
                    callback={() => {}}
                    page={page}
                    title={page}
                    loading={loading}
                />
            </div>
            <Navigation />
        </Fragment>
    )
}

export default StudentTablePageLayout;