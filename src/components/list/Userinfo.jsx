import React, { Component } from "react";
import useUserStore from "../../lib/userStore";

const Userinfo = () => {

    const {currentUser } = useUserStore();
  return (
    <div className="">
      <div className="flex items-center p-4">
        <img
          src={currentUser.avatar || "src/assets/Headshot_Square.png"}
          alt=""
          className="h-10 w-10 flex-none rounded-xl"
        />
        <div className="ml-4 flex-auto">
          <div className="font-medium text-white">{currentUser.username}</div>
          <div className="mt-1 text-slate-400">{currentUser.email}</div>
        </div>
      </div>
    </div>
  );
};

export default Userinfo;
