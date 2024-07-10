import React, { useState } from "react";

const Login = () => {
  const [avatar, setAvatar] = useState({
    //
    file: null,
    url: "",
  });

  const handleAvatar = e => {
    if(e.target.files[0]){

        console.log("GOT IT")
       setAvatar({
        file:e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
    }) 
    }
  }

  const createAccount = true;

  return (
    <div className="flex flex-auto">


      <div
        data-creation={createAccount}
        className="data-[creation=true]:hidden flex flex-col flex-auto justify-center items-center"
      >
        <h2>Welcome back,</h2>
        <form className="flex flex-col">
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button>Sign In</button>
        </form>
        <button>Create an Account</button>
      </div>

      <div
        data-creation={createAccount}
        className="data-[creation=false]:hidden flex flex-col flex-auto justify-center items-center"
      >
        <h2>Join today!</h2>
        <form className="flex flex-col">
          <label htmlFor="file">Upload Image</label>
          <input type="file" id="file" className=" hidden" onChange={handleAvatar} />
          <input type="text" placeholder="Username" name="username" />
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button>Sign In</button>
        </form>
        <button>Back to Login</button>
      </div>


    </div>
  );
};

export default Login;
