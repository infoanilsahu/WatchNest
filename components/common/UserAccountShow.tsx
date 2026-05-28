import { User2 } from "lucide-react";


export function UserAccountShow({username,name}: UserAccountShowProp) {
    return (
        <div className=" rounded-3xl border border-white/10 bg-linear-to-br from-[#0B1220] to-[#111827] p-4 shadow-[0_0_40px_rgba(108,77,255,0.12)] my-4 m-2">
      <div className="flex items-center gap-4  ">
        
        {/* Avatar */}
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#6C4DFF]/15 border border-[#6C4DFF]/20">
          <User2 className="h-8 w-8 text-[#8B5CFF]" />
        </div>

        {/* User Info */}
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {name}
          </h2>

          <p className="text-sm text-gray-400">
            @{username}
          </p>
        </div>
      </div>
      </div>
    )
}



interface UserAccountShowProp {
    username: string;
    name: string;
}