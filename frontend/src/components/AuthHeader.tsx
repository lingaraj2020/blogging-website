import { Link } from "react-router-dom"

export const AuthHeader=({ type }: { type: "signup" | "signin" })=>{
    <div className="px-10">
        <div className="text-4xl font-extrabold">{type==="signup"?"Create an account":"Welcome back"}</div>
            <div className="text-slate-500 text-lg mt-2">
              {type==="signin"?"Don't have an account?":"Already have an account?"}
              <Link className="underline pl-2" to={type==="signin"?"/signup":"/signin"}>
                {type==="signin"?"Sign Up":"Sign in"}
              </Link>
        </div>
    </div>
}
