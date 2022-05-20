import React from "react";
import { Switch } from "@headlessui/react";
import ReRadarChart from "../components/dashboard/ReRadarChart";

import { classNames } from "../utils";

/* Comment this out */
import TreemapChart from "../components/dashboard/TreemapChart";

/* Uncomment this */
// const TreemapChart = React.lazy(() =>
//   import("../components/dashboard/TreemapChart")
// );

export default function Dashboard() {
  const [enabled, setEnabled] = React.useState(false);
  return (
    <div style={{ textAlign: "-webkit-center" }}>
      <div>
        <ReRadarChart />
      </div>

      <div>
        <Switch.Group as="div" className="flex items-center">
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className={classNames(
              enabled ? "bg-indigo-600" : "bg-gray-200",
              "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            )}
          >
            <span
              aria-hidden="true"
              className={classNames(
                enabled ? "translate-x-5" : "translate-x-0",
                "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
              )}
            />
          </Switch>
          <Switch.Label as="span" className="ml-3">
            <span className="text-sm font-medium text-gray-900">
              Show Treemap
            </span>
          </Switch.Label>
        </Switch.Group>

        {/* Comment this out */}
        <div>{enabled ? <TreemapChart /> : null}</div>

        {/* Uncomment this */}
        {/* <React.Suspense fallback={<div>loading globe...</div>}>
          {enabled ? <TreemapChart /> : null}
        </React.Suspense> */}
      </div>
    </div>
  );
}
