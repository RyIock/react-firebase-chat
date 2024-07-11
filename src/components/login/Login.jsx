import React, { useState } from "react";
import firebase from "firebase/compat/app";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../../lib/Firebase";
import { doc, setDoc } from "firebase/firestore";
import upload from "../../lib/upload";

const Login = () => {
  const [avatar, setAvatar] = useState({
    //
    file: null,
    url: "",
  });

  const [loading, setLoading] = useState(false);

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
    
  };

  const [signup, setSignup] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true)
    const formData = new FormData(e.target);

    const { username, email, password } = Object.fromEntries(formData);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const imgUrl = await upload(avatar.file)

      await setDoc(doc(database, "users", res.user.uid), {
        username,
        email,
        avatar: imgUrl,
        id: res.user.uid,
        blocked: [],
      });

      await setDoc(doc(database, "userchats", res.user.uid), {
        chats:[],
      });

      console.log("Account created! You can login now.")
    } catch (err) {
      console.log(err);
    }
    finally{
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);


    const formData = new FormData(e.target);

    const { email, password } = Object.fromEntries(formData);


    try{
        await signInWithEmailAndPassword(auth,email,password);
    }
    catch(err){
      console.log(err)
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-auto">
      <div //Login Div
        data-creation={signup}
        className="data-[creation=true]:hidden flex flex-col flex-auto justify-center items-center"
      >
        <h2 className="font-bold text-2xl mb-6">Welcome back,</h2>
        <form className="flex flex-col">
          <input
            className="focus:outline-none mb-3 bg-black/25 p-2 font-semibold placeholder-gray-700 focus:placeholder-gray-800 rounded-lg shadow-sm appearance-none"
            type="text"
            placeholder="Email"
            name="email"
          />
          <input
            className="focus:outline-none mb-3 bg-black/25 p-2 font-semibold placeholder-gray-700 focus:placeholder-gray-800 rounded-lg shadow-sm appearance-none"
            type="password"
            placeholder="Password"
            name="password"
          />
          <button className="items-center rounded-md bg-sky-500 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-sky-950 hover:bg-sky-600">
          {loading ? "Loading" : "Sign In"}
          </button>
        </form>
        <button
          disabled={loading}
          className="disabled:cursor-not-allowed disabled:bg-gray-500/90 text-xs font-semibold m-3 hover:text-gray-400"
          onClick={() => setSignup((prev) => !prev)}
        >
          {" "}
          Create an Account &gt;{" "}
        </button>
      </div>

      <div //Create Account
        data-creation={signup}
        className="data-[creation=false]:hidden flex flex-col flex-auto justify-center items-center"
      >
        <h2 className="font-bold text-2xl">Create an Account</h2>
        <form onSubmit={handleRegister} className="flex flex-col">
          <label //Avatar Upload
            htmlFor="file"
            className="-space-x-5 space-y-14 overflow-hidden flex items-center justify-center *:cursor-pointer"
          >
            <img
              src={avatar.url || "src/assets/avatar.png"}
              alt="User avatar"
              className="size-20 rounded-full my-5"
            />
            <svg
              className="size-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
          <input
            type="file"
            id="file"
            files=""
            className="hidden"
            onChange={handleAvatar}
          />
          <input
            type="text"
            placeholder="Username"
            name="username"
            className="focus:outline-none mb-3 bg-black/25 p-2 font-semibold placeholder-gray-700 focus:placeholder-gray-800 rounded-lg shadow-sm appearance-none"
          />
          <div className="border-black/10 border-2 mb-3"></div>
          <input
            type="text"
            placeholder="Email"
            name="email"
            className="focus:outline-none mb-3 bg-black/25 p-2 font-semibold placeholder-gray-700 focus:placeholder-gray-800 rounded-lg shadow-sm appearance-none"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="focus:outline-none mb-3 bg-black/25 p-2 font-semibold placeholder-gray-700 focus:placeholder-gray-800 rounded-lg shadow-sm appearance-none"
          />
          <button disabled={loading} className="items-center disabled:cursor-not-allowed disabled:bg-gray-500/90 rounded-md bg-sky-500 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-sky-950 hover:bg-sky-600">
           {loading ? "Loading" : "Sign Up"}
          </button>
        </form>
        <button
          className="text-xs font-semibold m-3 hover:text-gray-400"
          onClick={() => setSignup((prev) => !prev)}
        >
          {" "}
          &lt; Back to Login
        </button>
      </div>
    </div>
  );
};

export default Login;
