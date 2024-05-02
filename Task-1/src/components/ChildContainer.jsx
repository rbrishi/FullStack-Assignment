// src/components/ChildContainer.js
import React, { useState } from "react";

/**
 * ChildContainer component for displaying and editing content.
 * 
 * @param {Object} props The component props.
 * @param {string} props.name A class name for custom styling of the component.
 * @param {number} props.number A unique identifier or number for the container.
 * @param {string} props.content Initial content for the textarea.
 * @param {Function} props.onAdd Function to execute when the Add button is clicked.
 * @param {Function} props.onUpdate Function to execute when the Update button is clicked with the current content.
 */
const ChildContainer = ({ name, number, content, onAdd, onUpdate }) => {
  // State to handle the editable content in the textarea
  const [editContent, setEditContent] = useState(content);

  return (
    <div className={`child ${name}`}>
      <h1>Container {number}</h1> {/* Display the container number */}
      <h2>Hello React</h2> {/* Static heading */}
      {/* Textarea for content editing, with value linked to component's state */}
      <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} />
      <button onClick={onAdd}>Add</button> {/* Button to trigger the onAdd event */}
      <button onClick={() => onUpdate(editContent)}>Update</button> {/* Button to trigger the onUpdate event with current content */}
    </div>
  );
};

export default ChildContainer;
