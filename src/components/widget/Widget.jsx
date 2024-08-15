import React, { useEffect, useRef, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import  useStore from "../../store/store";


const Widget = ({ category }) => {
  const { widgets, addWidget, deleteWidget } = useStore();
  const [toggle, setToggle] = useState(false);
  const [name, setName] = useState("");
  const [categoryName, setCategoryName] = useState(category);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const inputRef = useRef(null);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const renderWidgetByCategory = (category) => {
    return widgets
      .filter((widget) => widget.widgetCategory === category)
      .map((widget) => (
        <div
          key={widget.id}
          className="p-4 bg-gray-100 rounded-lg shadow-md flex flex-col justify-between"
        >
          <h3 className="text-lg font-semibold flex items-center overflow-hidden">
            <span className="line-clamp-2">{widget.widgetName}</span>
            <span
              onClick={() => handledeleteWidget(widget.id)}
              className="ml-auto pl-3 cursor-pointer"
            >
              <FaTrash />
            </span>
          </h3>
          <p className="text-gray-600 mt-2 line-clamp-2">
            {widget.widgetDescription}
          </p>
        </div>
      ));
  };

  const addNewWidget = (e) => {
    e.preventDefault();
    if (
      name.trim() === "" ||
      categoryName.trim() === "" ||
      description.trim() === ""
    ) {
      setError("Empty field. Complete all the fields to submit");
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
      return;
    }

    try {
      const newWidget = {
        id: widgets[widgets.length - 1].id + 1,
        widgetName: name,
        widgetCategory: categoryName,
        widgetDescription: description,
      };
      addWidget(newWidget);
      setToggle(!toggle);
    } catch (error) {
      setError(error);
    }
  };

  const handledeleteWidget = (id) => {
    deleteWidget(id);
  }

  useEffect(() => {
    if (toggle) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  }, [toggle]);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6 mx-5 mt-7">
        {renderWidgetByCategory(category)}
        <div className="flex justify-center mb-4">
          <button
            onClick={handleToggle}
            className="flex items-center w-[100%] text-center justify-center h-[50px] m-auto align-middle bg-blue-500 p-2 rounded-lg text-white hover:bg-blue-600 transition-all duration-150"
          >
            <FaPlus className="mr-2" />
            Add Widget
          </button>
        </div>
      </div>

      {toggle ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-end">
          <div className="w-[60%] md:w-[50%] lg:w-[40%]  h-[100%] bg-white mr-0 ml-auto">
            <div className="flex justify-start m-5 text-[25px]">
              <button
                onClick={() => setToggle(!toggle)}
                className="text-gray-500 hover:text-gray-700"
              >
                <IoCloseSharp />
              </button>
            </div>
            <form onSubmit={addNewWidget}>
              <h3 className="text-xl font-bold text-center mt-4">Add Widget</h3>
              <div className="flex flex-col gap-5">
                <input
                  placeholder="Widget Name"
                  ref={inputRef}
                  onChange={(e) => setName(e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 mx-3 mt-[100px] font-bold text-[15px]"
                />
                <input
                  placeholder="Category Name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 m-3 text-[15px] font-bold"
                />
                <input
                  placeholder="Widget Description"
                  onChange={(e) => setDescription(e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 m-3 text-[15px] font-bold"
                />
                {showError ? (
                  <p className="text-red-600 text-center text-[15px]">{error}</p>
                ) : (
                  ""
                )}
                <button
                  type="submit"
                  className="bg-green-500 text-white rounded-lg p-2 m-3 hover:bg-green-700 text-[15px]"
                >
                  Save Widget
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Widget;

