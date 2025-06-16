"use client";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../lib/redux/controls";
import { ApplicationService } from "../lib/services/application.service";
import { setApplicationList } from "../lib/redux/slices/application";
import TableComponent from "./table";
import { Font } from "./font";

const DashApplication = () => {
    const dispatch = useAppDispatch();
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(6);
    const [count, setCount] = useState(0);
    const applications = useAppSelector(state => state.application.applications);
    const reload = useAppSelector(state => state.application.reload);
    const [loading, setLoading] = useState(false);

    const getStudentList = useCallback(async() => {
        setLoading(true);
        const { error, payload } = await ApplicationService.getApplicationList(skip, limit);
        setLoading(false);
        if(!error && payload){
            dispatch(setApplicationList(payload?.applications));
            setCount(payload?.counts)
        }
    }, [reload]);

    useEffect(() => {
        setSkip(0);
        setLimit(30);
        getStudentList();
    }, [getStudentList]);

    const getRows = () => {
        return applications?.map((item: any) => {
            return {
                name: item?.student?.user?.firstname.concat(" ", item?.student?.user?.lastname),
                email: item?.student?.user?.email,
                course: item?.course?.courseName,
                school: item?.school?.schoolName,
                status: item?.status
            }
        })
    }

    const rowList = getRows();
    
    return(
        <Fragment>
            <div className="col-span-12 lg:col-span-8 rounded-[10px] border border-[#DDDDDD] shadow-sm bg-white py-[20px]">
                <div className="flex flex-row justify-between items-center px-[20px]">
                    <Font style="text-[14px] text-[#505F79] font-[600]">Recent Application</Font>
                    <Font style="text-[12px] text-[#505F79]">View All</Font>
                </div>
                <TableComponent
                    columns={columns}
                    rows={rowList}
                    callback={() => {}}
                    page={"Applications"}
                    title={"Applications"}
                    loading={false}
                />
            </div>
        </Fragment>
    )
}

const columns = [
    "Name",
    "Email",
    "Course",
    "School",
    "Status"
]

export default DashApplication;