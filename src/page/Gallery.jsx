import classNames from "classnames";
import produce from "immer";
import React from "react";
import DetailsSidebar from "../components/gallery/DetailsSidebar";
import Tabs from "../components/gallery/Tabs";

import files from "../data/files.json";
import { useForceRerender } from "../utils";

const GalleryStateContext = React.createContext();

function galleryReducer(state, action) {
  switch (action.type) {
    case "UPDATE_GALLERY_ITEM_COLOR": {
      const color =
        "#" +
        Math.floor(Math.random() * (0xffffff + 1))
          .toString(16)
          .padStart(6, "0");

      const updatedItems = produce(files, (draftFile) => {
        const file = draftFile.find((el) => el.id === action.file.id);
        file.colorHex = color;
      });

      return { ...state, items: updatedItems };
    }
    case "UPDATE_GALLERY": {
      return { ...state, items: [] };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function GalleryProvider({ children }) {
  const [state, dispatch] = React.useReducer(galleryReducer, {
    items: files,
  });

  const value = [state, dispatch];
  // const value = React.useMemo(() => [state, dispatch], [state, dispatch]);

  return (
    <GalleryStateContext.Provider value={value}>
      {children}
    </GalleryStateContext.Provider>
  );
}

function useGalleryState() {
  const context = React.useContext(GalleryStateContext);
  if (!context) {
    throw new Error("useAppState must be used within the AppProvider");
  }
  return context;
}

function ImageCard({ file }) {
  const [_, dispatch] = useGalleryState();
  const updateColor = () =>
    dispatch({ type: "UPDATE_GALLERY_ITEM_COLOR", file });

  return (
    <li className="relative">
      <div
        onClick={updateColor}
        className={classNames(
          file.current
            ? "ring-2 ring-offset-2 ring-indigo-500"
            : "focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500",
          "group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden"
        )}
        style={{
          borderColor: file.colorHex,
          borderWidth: "5px",
        }}
      >
        <img
          src={file.source}
          alt=""
          className={classNames(
            file.current ? "" : "group-hover:opacity-75",
            "object-cover pointer-events-none"
          )}
        />
        <button type="button" className="absolute inset-0 focus:outline-none">
          <span className="sr-only">View details for {file.name}</span>
        </button>
      </div>
      <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
        {file.name}
      </p>
      <p className="block text-sm font-medium text-gray-500 pointer-events-none">
        {file.size}
      </p>
    </li>
  );
}

ImageCard = React.memo(ImageCard);

function GallerySection({ files }) {
  const [state] = useGalleryState();

  return (
    <section className="mt-8 pb-16" aria-labelledby="gallery-heading">
      <h2 id="gallery-heading" className="sr-only">
        Recently viewed
      </h2>
      <ul
        role="list"
        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
      >
        {state.items.map((file) => (
          <ImageCard file={file} key={file.name} />
        ))}
      </ul>
    </section>
  );
}

GallerySection = React.memo(GallerySection);

export default function Gallery() {
  const forceRerender = useForceRerender();
  return (
    <>
      <div className="h-full flex">
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 flex items-stretch overflow-hidden">
            <main className="flex-1 overflow-y-auto">
              <div className="pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <GalleryProvider>
                  <Tabs forceRerender={forceRerender} />

                  <GallerySection files={files} />
                </GalleryProvider>
              </div>
            </main>

            <DetailsSidebar />
          </div>
        </div>
      </div>
    </>
  );
}
