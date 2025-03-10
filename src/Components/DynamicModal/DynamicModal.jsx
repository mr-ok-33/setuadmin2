import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import axios from "axios";
import { api } from "../../Utils/apiService";
import "./DynamicModal.css";

const DynamicModal = ({ fields, initialData, onSubmit, onClose }) => {
  const [formData, setFormData] = useState(
    initialData ||
      fields.reduce((acc, field) => ({ ...acc, [field.field]: "" }), {})
  );
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"],
      ],
    },
    formats: [
      "header",
      "bold",
      "italic",
      "underline",
      "strike",
      "list",
      "bullet",
      "link",
      "image",
    ],
  });

  useEffect(() => {
    if (quill && formData.description) {
      quill.clipboard.dangerouslyPasteHTML(formData.description);
    }
  }, [quill]);

  useEffect(() => {
    if (quill) {
      const handler = () => {
        const html = quill.root.innerHTML;
        setFormData((prevData) => ({ ...prevData, description: html }));
      };
      quill.on("text-change", handler);
      return () => quill.off("text-change", handler);
    }
  }, [quill]);

  const handleChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
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

      await axios.put(uploadURL, file, {
        headers: {
          "Content-Type": fileType,
        },
      });

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
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{initialData ? "Edit Item" : "Create Item"}</h2>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field.field} className="form-field">
              <label>{field.label}</label>
              {field.type === "image" ? (
                <>
                  {formData[field.field] && (
                    <img
                      src={formData[field.field]}
                      alt="Brand"
                      style={{
                        width: "100px",
                        height: "100px",
                        marginBottom: "50px",
                      }}
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={isLoading}
                  />
                  {isLoading && <p>Uploading image...</p>}
                </>
              ) : field.type === "dropdown" ? (
                <select
                  value={formData[field.field]}
                  onChange={(e) => handleChange(e, field.field)}
                  required={field.isValidate}
                >
                  <option value="">Select {field.label}</option>
                  {field.dropdownData.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              ) : field.type === "quill" ? (
                <div
                  style={{
                    width: "100%",
                    height: "200px",
                    marginBottom: "50px",
                  }}
                >
                  <div ref={quillRef} />
                </div>
              ) : (
                <input
                  type={field.type}
                  value={formData[field.field]}
                  onChange={(e) => handleChange(e, field.field)}
                  required={field.isValidate}
                />
              )}
            </div>
          ))}
          <div className="modal-actions">
            <button type="submit" className="submit-btn" disabled={isLoading}>
              {initialData ? "Update" : "Create"}
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DynamicModal;
