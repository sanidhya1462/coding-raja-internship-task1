import React from "react";
import nookies from "nookies";
import baseUrl from "@/helpers/baseUrl";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useState } from "react";
let taskId;
const home = (props) => {
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
                <div className="">
                  <div>
                  <img src="/devtown.png" alt="" className="rounded-full w-8 h-8 mt-5"/>
                  {Task.user.email}

                  </div>
                  <div
                    class="py-8 flex flex-wrap md:flex-nowrap"
                    key={Task._id}
                  >
                    <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                      <span class="font-semibold title-font text-gray-700">
                        {Task.title}
                      </span>
                      <span class="mt-1 text-gray-500 text-sm">
                        {Task.date}{" "}
                      </span>
                    </div>
                    <div className="flex flex-col justify-between ">
                      <div class="md:flex-grow">
                        <p class="leading-relaxed">{Task.description}</p>
                      </div>
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
  const res = await fetch(`${baseUrl}/api/create`, {
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

export default dynamic(() => Promise.resolve(home), { ssr: false });
