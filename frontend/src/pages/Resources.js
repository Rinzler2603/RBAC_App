import React, { useState, useEffect } from 'react';

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [userRole, setUserRole] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [currentResourceId, setCurrentResourceId] = useState(null); // Track resource being edited

  const fetchResources = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/resources', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch resources');
      }

      const data = await response.json();
      setResources(data);

      // Fetch the user role from the token
      const token = localStorage.getItem('token');
      const user = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
      setUserRole(user.role);
    } catch (error) {
      console.error(error.message);
    }
  };

  const addResource = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!title || !content) {
      setError('Both title and content are required');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/resources', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add resource');
      }

      const newResource = await response.json();
      setResources([...resources, newResource]);
      setTitle('');
      setContent('');
      setSuccess('Resource added successfully!');
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteResource = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/resources/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete resource');
      }

      setResources(resources.filter((resource) => resource._id !== id));
      setSuccess('Resource deleted successfully!');
    } catch (error) {
      setError(error.message);
    }
  };

  const enableEditMode = (resource) => {
    setEditMode(true);
    setCurrentResourceId(resource._id);
    setTitle(resource.title);
    setContent(resource.content);
  };

  const updateResource = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!title || !content) {
      setError('Both title and content are required');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/resources/${currentResourceId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update resource');
      }

      const updatedResource = await response.json();

      setResources(
        resources.map((resource) =>
          resource._id === updatedResource._id ? updatedResource : resource
        )
      );

      setEditMode(false);
      setTitle('');
      setContent('');
      setSuccess('Resource updated successfully!');
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  return (
    <div>
      <h1>Your Resources</h1>

      {editMode ? (
        <form onSubmit={updateResource}>
          <input
            type="text"
            placeholder="Resource Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Resource Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button type="submit">Update Resource</button>
          <button type="button" onClick={() => setEditMode(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <form onSubmit={addResource}>
          <input
            type="text"
            placeholder="Resource Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Resource Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button type="submit">Add Resource</button>
        </form>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <ul>
        {resources.map((resource) => (
          <li key={resource._id}>
            <strong>{resource.title}</strong>: {resource.content}
            <button onClick={() => enableEditMode(resource)}>Edit</button>
            {userRole === 'admin' && (
              <button onClick={() => deleteResource(resource._id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Resources;
