import React from "react";

const TabButton = ({ label, activeTab, tabName, onClick }) => {
  return (
    <button
      onClick={() => onClick(tabName)}
      className={`py-2 px-4 ${
        activeTab === tabName
          ? "border-b-2 border-blue-500 text-blue-500"
          : "text-gray-500 hover:text-blue-500"
      }`}
    >
      {label}
    </button>
  );
};

export default TabButton;
