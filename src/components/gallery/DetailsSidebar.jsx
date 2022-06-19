import { HeartIcon } from "@heroicons/react/outline";
import {
  PencilIcon,
  PlusSmIcon as PlusSmIconSolid,
} from "@heroicons/react/solid";
import classNames from "classnames";
import React, { useState } from "react";
import reportProfile from "../../report-profile";

const cuteDoggoImg =
  "https://images.unsplash.com/photo-1608096275202-85fd2fc2e4d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fGZ1bm55JTIwZG9nc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60";

const currentFile = {
  name: "KOALA_KUKU",
  size: "3.9 MB",
  source:
    "https://images.unsplash.com/photo-1579075475207-e59cd9d39be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8a29hbGFzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  information: {
    "Uploaded by": "Marie Culver",
    Created: "June 8, 2020",
    "Last modified": "June 8, 2020",
    Dimensions: "4032 x 3024",
    Resolution: "72 x 72",
  },
  sharedWith: [
    {
      id: 1,
      name: "Aimee Douglas",
      imageUrl:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=1024&h=1024&q=80",
    },
    {
      id: 2,
      name: "Andrea McMillan",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=oilqXxSqey&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  ],
};

export default function DetailsSidebar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [heartCount, setHeartCount] = useState(0);

  const increment = () => setHeartCount((c) => c + 1);

  return (
    <aside className="hidden w-96 bg-white p-8 border-l border-gray-200 overflow-y-auto lg:block">
      <React.Profiler id="SidebarDetails" onRender={reportProfile}>
        <div className="pb-16 space-y-6">
          <div>
            <div className="block w-full aspect-w-10 aspect-h-7 rounded-lg overflow-hidden">
              <img
                src={heartCount >= 10 ? cuteDoggoImg : currentFile.source}
                alt="doggo"
                className="object-cover"
              />
            </div>
            <div className="mt-4 flex items-start justify-between">
              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  <span className="sr-only">Details for </span>
                  {currentFile.name}_{heartCount}
                </h2>
                <p className="text-sm font-medium text-gray-500">
                  {currentFile.size}
                </p>
              </div>
              <button
                onClick={increment}
                type="button"
                className="ml-4 bg-white rounded-full h-8 w-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <HeartIcon
                  className={classNames("h-6 w-6", {
                    "text-red-600": heartCount > 0,
                  })}
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Information</h3>
            <dl className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
              {Object.keys(currentFile.information).map((key) => (
                <div
                  key={key}
                  className="py-3 flex justify-between text-sm font-medium"
                >
                  <dt className="text-gray-500">{key}</dt>
                  <dd className="text-gray-900">
                    {currentFile.information[key]}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Description</h3>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-sm text-gray-500 italic">
                Add a description to this image.
              </p>
              <button
                type="button"
                className="bg-white rounded-full h-8 w-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <PencilIcon className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Add description</span>
              </button>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Shared with</h3>
            <ul
              role="list"
              className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200"
            >
              {currentFile.sharedWith.map((person) => (
                <li
                  key={person.id}
                  className="py-3 flex justify-between items-center"
                >
                  <div className="flex items-center">
                    <img
                      src={person.imageUrl}
                      alt=""
                      className="w-8 h-8 rounded-full"
                    />
                    <p className="ml-4 text-sm font-medium text-gray-900">
                      {person.name}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="ml-6 bg-white rounded-md text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Remove<span className="sr-only"> {person.name}</span>
                  </button>
                </li>
              ))}
              <li className="py-2 flex justify-between items-center">
                <button
                  type="button"
                  className="group -ml-1 bg-white p-1 rounded-md flex items-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <span className="w-8 h-8 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                    <PlusSmIconSolid className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="ml-4 text-sm font-medium text-indigo-600 group-hover:text-indigo-500">
                    Share
                  </span>
                </button>
              </li>
            </ul>
          </div>
          <div className="flex">
            <button
              type="button"
              className="flex-1 bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Download
            </button>
            <button
              type="button"
              className="flex-1 ml-3 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Delete
            </button>
          </div>
        </div>
      </React.Profiler>
    </aside>
  );
}
