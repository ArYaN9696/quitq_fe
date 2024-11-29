import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createSubcategory } from "../../store/categorySlice";
import { ToastContainer, toast } from "react-toastify";

const AddSubcategory = ({ categoryId }) => {
  const [subcategoryName, setSubcategoryName] = useState("");
  const dispatch = useDispatch();

  const handleSubcategoryChange = (e) => {
    setSubcategoryName(e.target.value);
  };

  const handleCreateSubcategory = () => {
    if (subcategoryName) {
      dispatch(createSubcategory({ categoryId, subcategoryName }));
      toast.success("Subcategory created successfully!");
    } else {
      toast.error("Please enter a subcategory name.");
    }
  };

  return (
    <div className="card p-4 shadow-sm">
      <ToastContainer />
      <h3 className="mb-4">Create a Subcategory</h3>
      <div className="mb-3">
        <input
          type="text"
          value={subcategoryName}
          onChange={handleSubcategoryChange}
          placeholder="Subcategory Name"
          className="form-control"
        />
      </div>
      <button
        onClick={handleCreateSubcategory}
        className="btn btn-primary w-100"
        disabled={!subcategoryName}
      >
        Create Subcategory
      </button>
    </div>
  );
};

export default AddSubcategory;
