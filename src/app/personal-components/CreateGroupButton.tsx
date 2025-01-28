import React, { useState } from 'react';

const CreateGroupButton: React.FC<{ userId: string }> = ({ userId }) => {
  const [groupName, setGroupName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const createGroup = async () => {
    try {
      const response = await fetch('/api/groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: userId, name: groupName }), // Using username as per API logic
      });
      if (response.ok) {
        const group = await response.json();
        console.log('Group created:', group);
        setError(null);
      } else {
        const errorData = await response.json();
        console.error('Failed to create group:', errorData.error);
        setError(errorData.error);
      }
    } catch (error) {
      console.error('Error creating group:', error);
      setError('Error creating group');
    }
  };

  return (
    <div>
      <label htmlFor="groupName">Group Name:</label>
      <input
        id="groupName"
        type="text"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        placeholder="Enter group name"
      />
      <button onClick={createGroup}>Create Group</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default CreateGroupButton;
