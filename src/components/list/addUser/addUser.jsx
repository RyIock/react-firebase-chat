const AddUser = () => {
    return ( 
    <div className="p-5 bg-[#082742] border-[#18405f] shadow-lg rounded-xl border-2 absolute top-0 bottom-0 left-0 right-0 m-auto w-max h-max">
        <form className="flex gap-2 pb-3 items-center justify-center mb-2 border-b-2 border-[#18405f]">
            <input className="bg-black/35 flex-1 border-none outline-none focus:outline-none text-white rounded-lg p-1 pl-3 placeholder:text-gray-700 group-hover:placeholder:text-gray-800 focus:placeholder:text-gray-800 sm:text-sm sm:leading-6" type="text" placeholder="Username" name="username" />
            <button className="bg-sky-600 p-1 px-6 rounded-md text-sm font-semibold">Search</button>
        </form>
        <div className="flex justify-between mt-6">
            <div className="flex items-center gap-5">
                <img className="size-14 rounded-full" src="src/assets/avatar.png" alt=""/>
                <span className="font-semibold">Jane Doe</span>
            </div>
            <button className="bg-black/25 px-6 rounded-md h-10 self-center">Add</button>
        </div>
        
    </div> 
    );
}

export default AddUser;