import React, { useState, useRef, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import useStore from "../../store/store";

const InputModal = () => {
  const { categoryList, addCategory, setToggle, toggle } = useStore();
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const handleCategoryAdd = () => {
    if (category.trim() === "") {
      setError("Category Name required");
      return;
    }

    try {
      addCategory(category)
      setToggle(!toggle);
      setError("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(toggle) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0)
    }
  }, [toggle])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="w-[80%] h-[300px] bg-white m-auto rounded-2xl">
        <div className="flex justify-end m-5 text-[25px]">
          <button onClick={() => setToggle(!toggle)}>
            <IoCloseSharp />
          </button>
        </div>
        <div className="flex flex-col">
          <h2 className="text-center font-bold text-[20px]">
            Add New Category
          </h2>
          <div className="flex justify-center mt-10 h-[40px]">
            <input
              type="text"
              ref={inputRef}
              placeholder="Enter Category Name"
              value={category}
              onChange={handleChange}
              className="border rounded border-gray-400 pl-6 py-auto font-bold"
            />
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <button
            className="mt-5 h-[40px] border rounded-md w-[100px] m-auto bg-green-500 text-white"
            onClick={handleCategoryAdd}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputModal;
