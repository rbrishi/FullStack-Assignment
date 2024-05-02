// Layout.js
import React, { useState } from 'react';
import './Layout.css';
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";
import ChildContainer from './ChildContainer';

/**
 * Layout component that manages multiple ChildContainer components.
 * It handles adding and updating content via API calls and state management.
 */
const Layout = () => {
  // State for storing content data for child components
  const [contents, setContents] = useState({
    child1: { content: "", id: null },
    child2: { content: "", id: null },
    child3: { content: "", id: null }
  });

  // Function to handle adding new content
  const handleAdd = async (childKey) => {
    const response = await fetch('/api/content/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: contents[childKey].content })  // Sends the current content of the child
    });
    const data = await response.json();
    if (response.ok) {
      // Update state with the new content and ID from the server
      setContents(prev => ({
        ...prev,
        [childKey]: { content: data.text, id: data._id }
      }));
    } else {
      console.error('Error adding content:', data.message); // Log error if the request failed
    }
  };

  // Function to handle updating existing content
  const handleUpdate = async (childKey, newContent) => {
    if (!contents[childKey].id) {
      console.error("No content to update");
      return;
    }
    const response = await fetch(`/api/content/update/${contents[childKey].id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: newContent })
    });
    const data = await response.json();
    if (response.ok) {
      // Update the local state to reflect the new content
      setContents(prev => ({
        ...prev,
        [childKey]: { content: newContent, id: contents[childKey].id }
      }));
    } else {
      console.error('Error updating content:', data.message); // Log error if the update fails
    }
  };

  // Render the layout with resizable panels containing ChildContainer components
  return (
    <div className="container">
      <PanelGroup direction="vertical">
        <Panel>
          <PanelGroup direction="horizontal" className='hori'>
            <Panel defaultSize={20} minSize={20} maxSize={75}>
              <ChildContainer
                number={1}
                name="child1"
                content={contents.child1.content}
                onAdd={() => handleAdd('child1')}
                onUpdate={(newContent) => handleUpdate('child1', newContent)}
              />
            </Panel>
            <PanelResizeHandle />
            <Panel defaultSize={50} minSize={20} maxSize={75}>
              <ChildContainer
                number={2}
                name="child2"
                content={contents.child2.content}
                onAdd={() => handleAdd('child2')}
                onUpdate={(newContent) => handleUpdate('child2', newContent)}
              />
            </Panel>
          </PanelGroup>
        </Panel>
        <PanelResizeHandle />
        <Panel defaultSize={40} minSize={20} maxSize={75}>
          <ChildContainer
                number={3}
                name="child3"
                content={contents.child3.content}
                onAdd={() => handleAdd('child3')}
                onUpdate={(newContent) => handleUpdate('child3', newContent)}
          />
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default Layout;
