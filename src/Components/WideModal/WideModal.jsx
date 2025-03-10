import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { api } from "../../Utils/apiService";
import "./WideModal.css";
import ChipInput from "../ChipInput/ChipInput";

const WideModal = ({ fields, initialData, onSubmit, onClose }) => {
  const [formData, setFormData] = useState(
    initialData ||
      fields.reduce(
        (acc, field) => ({
          ...acc,
          [field.field]: field.type === "array" ? [] : "",
        }),
        {}
      )
  );
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const handleQuillChange = (value) => {
    setFormData((prevData) => ({ ...prevData, description: value }));
  };

  const handleChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleArrayChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsLoading(true);
    setImageFile(file);

    try {
      const fileName = file.name;
      const fileType = file.type;
      const response = await api.get(
        `/jobs/api/v1/get-upload-url?fileName=${fileName}&fileType=${fileType}`
      );
      const { uploadURL, downloadURL } = response;

      await axios.put(uploadURL, file, { headers: { "Content-Type": fileType } });
      setFormData((prevData) => ({ ...prevData, imageUrl: downloadURL }));
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="jobs-modal-overlay">
      <div className="jobs-modal-content">
        <div className="modal-header">
          <h2>{initialData ? "Edit Job" : "Create Job"}</h2>
          <button className="close-btn" onClick={onClose}><FaTimes /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-columns">
            {fields.map((field) => (
              <div key={field.field} className="form-field">
                <label>{field.label}</label>
                {field.type === "image" ? (
                  <>
                    {formData[field.field] && <img src={formData[field.field]} alt="Brand" style={{ width: "100px", height: "100px", marginBottom: "50px" }} />}
                    <input type="file" accept="image/*" onChange={handleFileChange} disabled={isLoading} />
                    {isLoading && <p>Uploading image...</p>}
                  </>
                ) : field.type === "dropdown" ? (
                  <select value={formData[field.field]} onChange={(e) => handleChange(e, field.field)} required={field.isValidate}>
                    <option value="">Select {field.label}</option>
                    {field.dropdownData.map((item) => (
                      <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                  </select>
                ) : field.type === "quill" ? (
                  <ReactQuill value={formData.description} onChange={handleQuillChange} />
                ) : field.type === "array" ? (
                  <ChipInput label={field.label} value={formData[field.field]} onChange={(value) => handleArrayChange(field.field, value)} />
                ) : (
                  <input type={field.type} value={formData[field.field]} onChange={(e) => handleChange(e, field.field)} required={field.isValidate} />
                )}
              </div>
            ))}
          </div>
          <div className="modal-actions">
            <button type="submit" className="submit-btn" disabled={isLoading}>{initialData ? "Update" : "Create"}</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WideModal;
