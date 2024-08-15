import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import InputModal from "./InputModal";
import Widget from "../widget/Widget";
import useStore from "../../store/store";

const Category = () => {
  const {categoryList, widgets, search, setSearch, filteredList, toggle, setToggle, handleSearch, deleteCategory} = useStore();

  const openModal = () => {
    setToggle(!toggle);
  };

  const handleCategoryDelete = (id) => {
    deleteCategory(id);
  };

  useEffect(() => {
    handleSearch();
  }, [search]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-end mb-5">
        <div className="flex mr-5 ">
          <input
            placeholder="Search"
            className="rounded-lg border border-gray-400 pl-3 text-[15px] font-bold"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          onClick={openModal}
          className="flex bg-gray-300 p-3 mr-0 rounded-lg text-[15px] duration-150 hover:bg-slate-700 hover:text-white hover:transition-all"
        >
          Add Category
          <span className="m-auto pl-3 text-[15px]">
            <FaPlus />
          </span>
        </button>
      </div>

      {filteredList.length > 0 ? (
        <div className="space-y-4">
          {filteredList.map((value) => (
            <div
              key={value.id}
              className="bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center border border-gray-200"
            >
              <div className="flex flex-col w-full items-start md:items-center">
                <h2 className="text-xl text-center m-auto  sm:text-center font-semibold flex-1">
                  {value.category}
                </h2>
                <button
                  onClick={() => handleCategoryDelete(value.id)}
                  className="text-white bg-red-500 p-3 hover:bg-red-800 transition-colors duration-150 mt-2 md:mt-3 mx-auto rounded-lg flex items-center"
                  aria-label={`Delete ${value.category}`}
                >
                  Delete category <IoTrashOutline size={24} className="ml-3" />
                </button>
              </div>

              <div className="mt-4 w-full">
                <Widget
                  category={value.category}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-4 text-gray-600 font-medium text-lg">
          No Categories Available
        </div>
      )}

      {toggle && (
        <InputModal />
      )}
    </div>
  );
};

export default Category;
