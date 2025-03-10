import React, { useEffect, useState } from "react";
import { api } from "../../Utils/apiService";
import { DynamicModal, DynamicTable, Loading } from "../../Components";
import { toast } from "react-toastify";

const DrugCategory = () => {
  const [data, setData] = useState([]);
  const [dropdownData, setDropdownData] = useState([]);
  const [dropdownData2, setDropdownData2] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  const fields = [
    {
      field: "drugId",
      label: "Drug Name",
      type: "dropdown",
      isValidate: true,
      dropdownData: dropdownData,
      dropdownName: "drugName",
    },
    {
      field: "categoryId",
      label: "Category Name",
      type: "dropdown",
      isValidate: true,
      dropdownData: dropdownData2,
      dropdownName: "categoryName",
    },
    {
      field: "description",
      label: "Description",
      type: "quill",
      isValidate: true,
    },
  ];
  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await api.get("/drug/api/v1/drug-category");
      const response = await api.get("/drug/api/v1/drug");
      const response2 = await api.get("/drug/api/v1/category");

      console.log("drug category data<<<", data);
      setData(data);
      setDropdownData(response);
      setDropdownData2(response2);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (brand) => {
    setSelected(brand);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/drug/api/v1/drug-category/${id}`);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = () => {
    setSelected(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelected(null);
  };

  const handleSubmit = async (formData) => {
    try {
      if (selected) {
        await api.patch(`/drug/api/v1/drug-category/${selected.id}`, formData);
        toast.success("Updated Successfully!");
      } else {
        await api.post("/drug/api/v1/drug-category", formData);
        toast.success("Added Successfully!");
      }
      fetchData();
      handleModalClose();
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong!");
    }
  };

  return (
    <div>
      <h1 className="page_title">Drugs</h1>
      <button onClick={handleCreate} className="primary_button">
        Create New Drug Category
      </button>
      {loading ? (
        <Loading />
      ) : (
        <DynamicTable
          data={data}
          fields={fields}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
      {isModalOpen && (
        <DynamicModal
          fields={fields}
          initialData={selected}
          onSubmit={handleSubmit}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default DrugCategory;
