import React, { Component } from "react";
import useUserStore from "../../lib/userStore";

const Userinfo = () => {

    const {currentUser } = useUserStore();
  return (
    <div className="">
      <div class="flex items-center p-4">
        <img
          src={currentUser.avatar || "src/assets/Headshot_Square.png"}
          alt=""
          class="h-10 w-10 flex-none rounded-xl"
        />
        <div class="ml-4 flex-auto">
          <div class="font-medium text-white">{currentUser.username}</div>
          <div class="mt-1 text-slate-400">{currentUser.email}</div>
        </div>
      </div>
    </div>
  );
};

export default Userinfo;
