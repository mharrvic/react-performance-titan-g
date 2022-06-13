import React from "react";
import classnames from "classnames";

import { ScaleIcon } from "@heroicons/react/outline";

const card = {
  name: "Account balance",
  href: "#",
  icon: ScaleIcon,
  amount: "$30,659.45",
};

const Card = React.memo(({ addBalance, setBalance, balance }) => {
  const [isClicked, setClicked] = React.useState(true);
  // Apply useMemo here to make the onClick snappy
  const computedBalance = addBalance(balance);
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <ScaleIcon
              className={classnames("h-6 w-6 cursor-pointer", {
                "text-gray-600": isClicked,
                "text-red-600": !isClicked,
              })}
              onClick={() => setClicked(!isClicked)}
              aria-hidden="true"
            />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                Account balance
              </dt>
              <dd>
                <div className="text-lg font-medium text-gray-900">
                  {addBalance(balance)}
                </div>
              </dd>
              <p className="text-sm text-gray-400">
                last update {new Date().toLocaleTimeString()}
              </p>
            </dl>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-3">
        <div className="text-sm">
          <button
            onClick={() => setBalance(balance + 1)}
            className="font-medium text-cyan-700 hover:text-cyan-900"
          >
            Add Balance
          </button>
        </div>
      </div>
    </div>
  );
});

export default function OverviewDashboard() {
  const [time, setTime] = React.useState(new Date());
  const [balance, setBalance] = React.useState(1);

  React.useEffect(() => {
    const timer = setTimeout(() => setTime(new Date()), 1000);
    return () => clearTimeout(timer);
  });

  const addBalance = (n) => {
    if (n <= 1) {
      return 1;
    }

    return addBalance(n - 1) + addBalance(n - 2);
  };
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-lg leading-6 font-medium text-gray-900">
        Overview
        <span className="text-sm text-gray-400">
          {" "}
          {time.toLocaleTimeString()}
        </span>
      </h2>
      <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Card
          balance={balance}
          // Apply useCallback here to avoid re-rendering the component
          addBalance={addBalance}
          setBalance={setBalance}
        />
      </div>
    </div>
  );
}
