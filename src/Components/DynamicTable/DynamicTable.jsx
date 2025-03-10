import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import "./DynamicTable.css";

const getNestedProperty = (obj, path) => {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
};

const DynamicTable = ({ data, fields, onEdit, onDelete }) => {
  const [expandedRows, setExpandedRows] = useState({});

  const toggleExpand = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const truncateHTML = (html, maxLength = 100) => {
    if (html.length <= maxLength) return html;
    return html.substring(0, maxLength) + "...";
  };

  return (
    <div className="table-container">
      <table className="dynamic-table">
        <thead>
          <tr>
            {fields.map((field) => (
              <th key={field.field}>{field.label}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {fields.map((field) => (
                <td key={field.field} className="truncate">
                  {field.type === "image" ? (
                    <img
                      src={item[field.field]}
                      alt={item.name}
                      style={{ width: "50px", height: "50px" }}
                    />
                  ) : field.type === "quill" ? (
                    <div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: expandedRows[item.id]
                            ? item[field.field]
                            : truncateHTML(item[field.field]),
                        }}
                      />
                      {item[field.field].length > 100 && (
                        <button
                          className="view-more-btn"
                          onClick={() => toggleExpand(item.id)}
                        >
                          {expandedRows[item.id] ? "View Less" : "View More"}
                        </button>
                      )}
                    </div>
                  ) :
                  
                  // field.type === "dropdown" ? (
                  //   getNestedProperty(item, field.dropdownName)
                  // ) : field.type === "array" ? (
                  //   item[field.field].join(", ")
                  //  )
                  // : (
                  //  item[field.field]
                  // )}
                  field.type === "array" && Array.isArray(item[field.field]) ? (
                    item[field.field].join(", ")
                    ) : field.type === "array" ? (
                     "Invalid or non-array value"
                   ) : (
                     item[field.field] || "N/A"
                 )}
                  
                </td>
              ))}
              <td className="actions">
                <button className="edit-btn" onClick={() => onEdit(item)}>
                  <FaEdit />
                </button>
                {/* <button
                  className="delete-btn"
                  onClick={() => onDelete(item.id)}
                >
                  <FaTrash />
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
