import React, { Component } from "react";

class Details extends Component {
  state = {};
  render() {
    return (
      <div className="flex-col basis-1/4 min-w-52 hidden lg:flex border-l-2 border-[#18405f]">
        <div className="p-2 pt-5 flex flex-col items-center gap-3 border-b-2 border-[#18405f]">
          <img
            src="src\assets\avatar.png"
            alt=""
            className="size-14 rounded-full"
          />
          <h2 className="font-bold">Jane Doe</h2>
          <p className="text-xs font-semibold flex-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit
          </p>
        </div>
        <div className="overflow-auto p-2 flex flex-col gap-4 grow *:*:flex *:*:items-center *:*:justify-between *:*:px-1">
          <div className="Chat Settings">
            <div className="title">
              <span>Chat Settings</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 bg-black/25 rounded-full p-1.5 cursor-pointer"
              >
                <path
                  fillRule="evenodd"
                  d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div className="Chat Settings">
            <div className="title">
              <span>Chat Settings</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 bg-black/25 rounded-full p-1.5 cursor-pointer"
              >
                <path
                  fillRule="evenodd"
                  d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div className="Privacy">
            <div className="title">
              <span>Privacy % help</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 bg-black/25 rounded-full p-1.5 cursor-pointer"
              >
                <path
                  fillRule="evenodd"
                  d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div // Shared photos
          className="flex flex-col gap-1">
            <div className="title">
              <span>Shared photos</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 bg-black/25 rounded-full p-1.5 cursor-pointer"
              >
                <path
                  fillRule="evenodd"
                  d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div //content holder
              className="flex flex-col p-1 rounded-lg gap-2  shadow-md"
            >
              <div //content to be held
              className="group cursor-pointer flex justify-between items-center w-full rounded-md bg-black/20">
                <div className="flex gap-2 items-center">
                  <img
                    src="src\assets\Headshot_Square.png"
                    alt=""
                    className="size-8 rounded-md"
                  />
                  <p className="text-xs group-hover:text-gray-400">photo_2023_2.png</p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className=" size-5 m-1 text-gray-100 group-hover:fill-gray-400 group-hover:scale-95"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div //content to be held
              className="group cursor-pointer flex justify-between items-center w-full rounded-md bg-black/20">
                <div className="flex gap-2 items-center">
                  <img
                    src="src\assets\Headshot_Square.png"
                    alt=""
                    className="size-8 rounded-md"
                  />
                  <p className="text-xs group-hover:text-gray-400">photo_2023_2.png</p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className=" size-5 m-1 text-gray-100 group-hover:fill-gray-400 group-hover:scale-95"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div //content to be held
              className="group cursor-pointer flex justify-between items-center w-full rounded-md bg-black/20">
                <div className="flex gap-2 items-center">
                  <img
                    src="src\assets\Headshot_Square.png"
                    alt=""
                    className="size-8 rounded-md"
                  />
                  <p className="text-xs group-hover:text-gray-400">photo_2023_2.png</p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className=" size-5 m-1 text-gray-100 group-hover:fill-gray-400 group-hover:scale-95"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div //content to be held
              className="group cursor-pointer flex justify-between items-center w-full rounded-md bg-black/20">
                <div className="flex gap-2 items-center">
                  <img
                    src="src\assets\Headshot_Square.png"
                    alt=""
                    className="size-8 rounded-md"
                  />
                  <p className="text-xs group-hover:text-gray-400">photo_2023_2.png</p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className=" size-5 m-1 text-gray-100 group-hover:fill-gray-400 group-hover:scale-95"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="Chat Settings">
            <div className="title">
              <span>Chat Settings</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 bg-black/25 rounded-full p-1.5 cursor-pointer"
              >
                <path
                  fillRule="evenodd"
                  d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        <button className="bg-red-500/50 hover:bg-red-900 rounded-md font-bold text-center py-1 mt-auto">Block User</button>
        <button className="bg-sky-400/50 hover:bg-sky-900 rounded-md font-bold text-center py-1">Logout</button>
        </div>
      </div>
    );
  }
}

export default Details;
