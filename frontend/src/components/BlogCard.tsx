import { Link } from "react-router-dom";

interface BlogCardProps{
    authorName:string;
    title:string;
    content:string;
    publishedDate:string;
    id:string;
}

export const BlogCard=({
    id,
    authorName,
    title,
    content,
    publishedDate

}:BlogCardProps)=>{
    return <Link to={`/blog/${id}`}>
    <div className=" p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
        <div className="flex">
            <Avatar size={"small"}  name={authorName}/>
            <div className="flex justify-center flex-col font-medium pl-2">{authorName}</div>
            <div className="flex pl-2 justify-center flex-col ">
                <Circle/>
            </div>
            <div className="flex justify-center flex-col pl-2 font-thin text-slate-500">
                {publishedDate} 
            </div>
        </div>
        <div className="text-xl font-bold pt-2">
            {title}
        </div>
        <div className="text-md font-normal pt-1">
            {content.slice(0,100) + " ..."}
        </div>
        <div className=" text-slate-500 text-sm font-normal pt-4">
            {`${Math.ceil(content.length/100)} minute(s) read`}
        </div>
    </div>
</Link>
}


export function Circle(){
    return <div className="h-1 w-1 rounded-full bg-slate-500">

    </div>
}

export function Avatar({name,size='small'}:{name:string,size:"small" | "big"}){
    return <div className={`relative inline-flex items-center justify-center ${size==="small"?"w-8 h-8":"w-10 h-10"} overflow-hidden bg-gray-600 rounded-full dark:bg-gray-600`}>
    <span className={`${"small"?"text-xs":"text-lg"} font-bold text-gray-100 dark:text-gray-300`}>{name[0]}</span>
</div>
}