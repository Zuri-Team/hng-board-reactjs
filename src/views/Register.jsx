import React, { useState } from "react";

export default () => {
  return (
    <div className="log-in w-full h-screen flex items-center bg-gray-400">
      <div className="w-full max-w-lg rounded bg-white h-auto block mx-auto my-25">
        <p className="mx-auto block tracking-tight leading-tight text-center text-teal-600 my-6">
          Welcome to HNG Board
        </p>
        <form
          action=""
          className=" bg-white shadow-md rounded h-full px-8 py-8 pt-8"
        >
          <div className="px-4 pb-4">
            <label htmlFor="email" className="text-sm block font-bold  pb-2">
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              name="email"
              id=""
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 "
              placeholder="Johnbull@example.com"
            />
          </div>
          <div className="px-4 pb-4">
            <label htmlFor="password" className="text-sm block font-bold pb-2">
              PASSWORD
            </label>
            <input
              type="password"
              name="email"
              id=""
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300"
              placeholder="Enter your password"
            />
          </div>
          <div className="my-3">
            <button
              className="bg-blue-500 hover:bg-blue-700 w-40 text-white block mx-auto font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Sign In
            </button>
            <small className="flex mx-auto text-end w-auto pl-16 tracking-tight leading-tight text-md mt-10">
              Don't have an account ?{" "}
              <a className="ml-2 flex cursor-pointer justify-end">Sign Up</a>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
};
