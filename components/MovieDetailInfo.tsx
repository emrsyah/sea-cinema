import React from "react";
import { Calendar, User } from "react-feather";

const extractIcon = (type: string) => {
    if(type === "rd") return (
        <Calendar className="w-5" />
    )
    else if(type === "ag") return (
        <User className="w-5" />
    )
    else if(type === "pr") return (
        <></>
    )
}

const MovieDetailInfo = ({type, content} : {type: "rd" | "ag" | "pr", content: string}) => {
  return (
    <div className="flex items-center gap-2 text-indigo-600 ">
      {extractIcon(type)}
      {content}
    </div>
  );
};

export default MovieDetailInfo;
