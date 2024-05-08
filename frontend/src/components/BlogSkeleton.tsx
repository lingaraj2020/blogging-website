import { Circle } from "./BlogCard"


export const BlogSkeleton=()=>{
    return <div role="status" className="animate-pulse">
        <div className=" p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
        <div className="flex">
            <div className="h-8 w-8 bg-gray-200 rounded-full w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            <div className="flex pl-2 justify-center flex-col ">
                <Circle/>
            </div>
            <div className="flex justify-center flex-col pl-2 font-thin text-slate-500">
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div> 
            </div>
        </div>
        <div className="text-xl font-bold pt-2">
        <div className="h-2 bg-gray-200 rounded-full  max-w-[330px] mb-2.5"></div>
        </div>
        <div className="text-md font-normal pt-1">
        <div className="h-2 bg-gray-200 rounded-full  max-w-[330px] mb-2.5"></div>
        </div>
        <div className=" text-slate-500 text-sm font-normal pt-4">
        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
        </div>
    </div>
</div>
}