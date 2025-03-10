import React, { useEffect, useState } from "react";
import { api } from "../../Utils/apiService";
import { DynamicModal, DynamicTable, Loading } from "../../Components";
import { toast } from "react-toastify";

const Company = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  const fields = [
    {
      field: "name",
      label: "Company Name",
      type: "text",
      isValidate: true,
    },
    {
      field: "email",
      label: "Company Email",
      type: "text",
      isValidate: true,
    },
    {
      field: "contactNumber",
      label: "Company contactNumber",
      type: "text",
      isValidate: true,
    },
  ];

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await api.get("jobs/api/v1/company");

      setData(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (company) => {
    setSelected(company);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`jobs/api/v1/company/${id}`);
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
        await api.patch(`jobs/api/v1/company/${selected.id}`, formData);
        toast.success("Updated Successfully!");
      } else {
        await api.post("jobs/api/v1/company", formData);
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
      <h1 className="page_title">Companies</h1>
      <button onClick={handleCreate} className="primary_button">
        Create New Company
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

export default Company;
