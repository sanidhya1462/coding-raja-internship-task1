import React from "react";
import nookies from "nookies";
import baseUrl from "@/helpers/baseUrl";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useState } from "react";
let taskId;
const account = (props) => {
  const router = useRouter();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const { Tasks } = props;
  const cookie = nookies.get();
  const User = cookie.user ? JSON.parse(cookie.user) : "";
  const handleEdit = (userId) => {
    taskId = userId;
    setIsEditOpen(!isEditOpen);
  };
  async function handleEditSubmit(event) {
    event.preventDefault();
    console.log(taskId);
    // console.log("clicked");
    // console.log(User);
    // console.log(name , email , password , mobile , selectedGender , selectedMedia , selectedOption)
    const res = await fetch(`${baseUrl}/api/create`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        TaskId: taskId,
        Title: formData.title,
        Description: formData.description,
      }),
    });
    const res2 = await res.json();
    if (res2.error) {
      // M.toast({ html: res2.error, classes: "red" });
    } else {
      toast.success(res2.message);

      window.location.reload();
    }
  }
  async function handleDelete(id) {
    const res = await fetch(`${baseUrl}/api/create`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Id: id,
      }),
    });
    const res2 = await res.json();
    if (res2.error) {
      toast.error(res2.error);
    } else {
      toast.success(res2.message);
      router.push("/home");
    }
  }

  return (
    <section className="text-gray-600 body-font">
      {isEditOpen && (
        <div className="floating-form absolute border-2 rounded-md bg-black p-5 w-1/3 item">
          <h1 className="text-black text-3xl text-center font-medium">
            Edit Form
          </h1>
          <form className="max-w-md mx-auto my-14" onSubmit={handleEditSubmit}>
            <div className="flex flex-col gap-y-5">
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  id="floating_email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
                <label
                  for="floating_email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Task Title
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <label
                  for="message"
                  className="block mb-2 text-sm text-gray-500 dark:text-gray-400"
                >
                  Task Description
                </label>
                <textarea
                  id="message"
                  rows="8"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your task's description here..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                ></textarea>
              </div>

              <div className="flex flex-col md:flex-row md:justify-between gap-2 md:gap-0">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => {
                    window.location.reload();
                  }}
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
          <img
            src="/devtown.png"
            alt="User"
            className="w-24 h-24 rounded-full"
          />
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
            {User.name}
          </h1>
          <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
            {User.email}
          </p>
        </div>
        
        <div class="text-gray-600 body-font overflow-hidden">
          <div class="container px-5 py-24 mx-auto">
            <div class="-my-8 divide-y-2 divide-gray-100">
            {Tasks.map((Task) => (
              <div class="py-8 flex flex-wrap md:flex-nowrap border-b" key={Task._id}>
                <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                  <span class="font-semibold title-font text-gray-700">
                    {Task.title}
                  </span>
                  <span class="mt-1 text-gray-500 text-sm">{Task.date} </span>
                </div>
                <div className="flex flex-col justify-between ">
                <div class="md:flex-grow">
                  <p class="leading-relaxed">
                  {Task.description}
                  </p>
                </div>
                <div className="flex flex-row justify-between mt-3">
                  <button
                    type="button"
                    onClick={()=>{
                      handleEdit(Task._id)
                    }}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      handleDelete(Task._id);
                    }}
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >
                    Delete
                  </button>
                </div>

                </div>

              </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
export async function getServerSideProps(ctx) {
  const cookie = nookies.get(ctx);

  if (!cookie.token) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/login" });
    res.end();
  }
  const res = await fetch(`${baseUrl}/api/tasks`, {
    headers: {
      Authorization: cookie.token,
    },
  });
  const res2 = await res.json();
  
  return {
    props: {
      Tasks: res2,
    },
  };
}

export default dynamic(() => Promise.resolve(account), { ssr: false });
