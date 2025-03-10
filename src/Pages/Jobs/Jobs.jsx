import React, { useEffect, useState } from "react";
import { api } from "../../Utils/apiService";
import { DynamicTable, Loading, WideModal } from "../../Components";
import { toast } from "react-toastify";

const Jobs = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dropdownData, setDropdownData] = useState([]);

  const fields = [
    {
      field: "companyId",
      label: "Company Name",
      type: "dropdown",
      isValidate: true,
      dropdownData: dropdownData,
      dropdownName: "company.name",
    },
    {
      field: "title",
      label: "Job Name",
      type: "text",
      isValidate: true,
    },
    {
      field: "skills",
      label: "Skills",
      type: "array",
      isValidate: true,
    },

    {
      field: "experienceLevel",
      label: "Experience Level",
      type: "text",
      isValidate: true,
    },
    {
      field: "educationType",
      label: "Education Type",
      type: "array",
      isValidate: true,
    },
    {
      field: "employeeType",
      label: "Employee Type",
      type: "text",
      isValidate: true,
    },
    {
      field: "industry",
      label: "Industry",
      type: "text",
      isValidate: true,
    },
    {
      field: "location",
      label: "Location",
      type: "array",
      isValidate: true,
    },
    {
      field: "jobType",
      label: "Job Type",
      type: "text",
      isValidate: true,
    },
    {
      field: "minSalary",
      label: "Min Salary",
      type: "number",
      isValidate: true,
    },
    {
      field: "maxSalary",
      label: "Max Salary",
      type: "number",
      isValidate: true,
    },
    {
      field: "minExperienceRequired",
      label: "Min Experience",
      type: "number",
      isValidate: true,
    },
    {
      field: "maxExperienceRequired",
      label: "Max Experience",
      type: "number",
      isValidate: true,
    },
    {
      field: "shift",
      label: "Shift",
      type: "text",
      isValidate: true,
    },
    {
      field: "benefits",
      label: "Benefits",
      type: "text",
      isValidate: true,
    },
    {
      field: "description",
      label: "Job Description",
      type: "text",
      isValidate: true,
    },
    {
      field: "sourceUrl",
      label: "Source Url",
      type: "text",
      // isValidate: true,
    },
  ];

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await api.get("jobs/api/v1/jobs");
      const response = await api.get("jobs/api/v1/company");
      setData(data.data);
      setDropdownData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (job) => {
    setSelected(job);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`jobs/api/v1/jobs/${id}`);
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
        await api.patch(`jobs/api/v1/jobs/${selected.id}`, formData);
        toast.success("Updated Successfully!");
      } else {
        await api.post("jobs/api/v1/jobs", formData);
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
      <h1 className="page_title">Jobs</h1>
      {/* <button onClick={handleCreate} className="primary_button">
        Create New Job
      </button> */}
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
        <WideModal
          fields={fields}
          initialData={selected}
          onSubmit={handleSubmit}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default Jobs;
