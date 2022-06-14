import { FilterIcon, SearchIcon } from "@heroicons/react/solid";
import classnames from "classnames";
import React from "react";
import directory from "../../data/directory.json";

function ListItem({
  person,
  index,
  setHighlightedIndex,
  highlightedIndex,
  onMouseOver,
}) {
  const isHighlightedIndex = index === highlightedIndex;

  return (
    <li key={person.id} onMouseOver={() => setHighlightedIndex(index)}>
      <div
        className={classnames(
          "relative px-6 py-5 flex items-center space-x-3  focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500",
          {
            "bg-gray-50": isHighlightedIndex,
          }
        )}
      >
        <div className="flex-shrink-0">
          <img
            className="h-10 w-10 rounded-full"
            src={person.imageUrl}
            alt=""
          />
        </div>
        <div className="flex-1 min-w-0">
          <a href="#" className="focus:outline-none">
            {/* Extend touch target to entire panel */}
            <span className="absolute inset-0" aria-hidden="true" />
            <p className="text-sm font-medium text-gray-900">{person.name}</p>
            <p className="text-sm text-gray-500 truncate">{person.role}</p>
          </a>
        </div>
      </div>
    </li>
  );
}

ListItem = React.memo(ListItem);

// ListItem = React.memo(ListItem, (prevProps, nextProps) => {
//   // If any of these changed, we should re-render
//   if (prevProps.person !== nextProps.person) return false;
//   if (prevProps.index !== nextProps.index) return false;

//   // We should only re-render if this list item:
//   // 1. was highlighted before and now it's not
//   // 2. was not highlighted before and now it is
//   if (prevProps.highlightedIndex !== nextProps.highlightedIndex) {
//     const wasPrevHighlighted = prevProps.highlightedIndex === prevProps.index;
//     const isNowHighlighted = nextProps.highlightedIndex === nextProps.index;
//     return wasPrevHighlighted === isNowHighlighted;
//   }
//   return true;
// });

const DirectoryList = React.memo(() => {
  const [highlightedIndex, setHighlightedIndex] = React.useState(0);
  return (
    <aside className="hidden xl:order-first xl:flex xl:flex-col flex-shrink-0 w-96 border-r border-gray-200">
      <div className="px-6 pt-6 pb-4">
        <h2 className="text-lg font-medium text-gray-900">Directory</h2>
        <p className="mt-1 text-sm text-gray-600">
          Search directory of 3,018 employees
        </p>
        <form className="mt-6 flex space-x-4" action="#">
          <div className="flex-1 min-w-0">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                type="search"
                name="search"
                id="search"
                className="focus:ring-pink-500 focus:border-pink-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="Search"
              />
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex justify-center px-3.5 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          >
            <FilterIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            <span className="sr-only">Search</span>
          </button>
        </form>
      </div>
      {/* Directory list */}
      <nav className="flex-1 min-h-0 overflow-y-auto" aria-label="Directory">
        <ul role="list" className="relative z-0 divide-y divide-gray-200">
          {directory.map((person, index) => (
            <ListItem
              key={index}
              index={index}
              person={person}
              setHighlightedIndex={setHighlightedIndex}
              highlightedIndex={highlightedIndex}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
});

export default DirectoryList;
