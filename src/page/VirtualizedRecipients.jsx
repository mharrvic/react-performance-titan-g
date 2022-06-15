import React from "react";
import { useTable } from "react-table";
import { useVirtual } from "react-virtual";
import people from "../data/people.json";

export default function Recipients() {
  const parentRef = React.useRef();

  const rowVirtualizer = useVirtual({
    size: people.length,
    parentRef: parentRef,
  });

  const columns = React.useMemo(
    () => [
      {
        accessor: "name",
        Header: "Name",
      },
      {
        accessor: "title",
        Header: "Title",
      },
      {
        accessor: "email",
        Header: "Email",
      },
      {
        accessor: "role",
        Header: "Role",
      },
    ],
    []
  );
  const data = React.useMemo(() => people, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  const items = rowVirtualizer.virtualItems;
  const paddingTop = items.length > 0 ? items[0].start : 0;
  const paddingBottom =
    items.length > 0
      ? rowVirtualizer.totalSize - items[items.length - 1].end
      : 0;

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Users</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their name, title,
            email and role.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add user
          </button>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4  sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div
              className="shadow ring-1 ring-black ring-opacity-5 md:rounded-lg overflow-y-auto h-96"
              ref={parentRef}
            >
              <table
                className="min-w-full divide-y divide-gray-300"
                {...getTableProps()}
              >
                <thead className="bg-gray-50">
                  {headerGroups.map((headerGroup) => {
                    const {
                      key: headerGroupKey,
                      ...headerGroupProps
                    } = headerGroup.getHeaderGroupProps();
                    return (
                      <tr key={headerGroupKey} {...headerGroupProps}>
                        {headerGroup.headers.map((column) => {
                          const {
                            key: headerKey,
                            ...headerProps
                          } = column.getHeaderProps();
                          return (
                            <th
                              key={headerKey}
                              {...headerProps}
                              scope="col"
                              className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                            >
                              {column.render("Header")}
                            </th>
                          );
                        })}
                      </tr>
                    );
                  })}
                </thead>
                <tbody className="bg-white" {...getTableBodyProps()}>
                  {paddingTop > 0 && (
                    <tr>
                      <td style={{ height: `${paddingTop}px` }} />
                    </tr>
                  )}
                  {rowVirtualizer.virtualItems.map((virtualRow) => {
                    const row = rows[virtualRow.index];
                    prepareRow(row);
                    const { key: rowKey, ...rowProps } = row.getRowProps();
                    return (
                      <tr
                        key={rowKey}
                        {...rowProps}
                        className={rowKey % 2 === 0 ? undefined : "bg-gray-50"}
                      >
                        {row.cells.map((cell) => {
                          const {
                            key: cellKey,
                            ...cellProps
                          } = cell.getCellProps();
                          return (
                            <td
                              key={cellKey}
                              {...cellProps}
                              className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                  {paddingBottom > 0 && (
                    <tr>
                      <td style={{ height: `${paddingBottom}px` }} />
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
