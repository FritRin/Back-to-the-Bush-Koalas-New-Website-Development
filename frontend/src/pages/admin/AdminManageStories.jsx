import { useState } from "react";

import ManageMainBox from "../../components/admin/ManageMainBox";
import ManageSecondaryBox from "../../components/admin/ManageSecondaryBox";
import StoryList from "../../components/admin/StoryList";
import StoryCreate from "../../components/admin/StoryCreate";
import StoryUpdate from "../../components/admin/StoryUpdate";
import StoryDelete from "../../components/admin/StoryDelete";


function AdminManageStories() {
  const [selectedStory, setSelectedStory] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingStory, setEditingStory] = useState(null);
  const [deletingStory, setDeletingStory] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleStorySaved = () => {
    setRefreshKey((prev) => prev + 1); // Triggers StoryList to re-fetch
    setShowCreateModal(false);
};

  return (
    <div className="admin-manage-stories">

      <h1>Manage Homepage Stories</h1>

      <ManageMainBox
        selectedStory={selectedStory}
      />

      <ManageSecondaryBox
        selectedStory={selectedStory}
      />

      <StoryList
        refreshKey={refreshKey}
        onCreateStory={() => setShowCreateModal(true)}
        onEditStory={(story) => setEditingStory(story)}
        onDeleteStory={(story) => setDeletingStory(story)}
      />

      {showCreateModal && (
        <StoryCreate
          onClose={() => setShowCreateModal(false)}
          
        />
      )}

      {editingStory && (
        <StoryUpdate
          storyId={editingStory.story_id}
          onClose={() => setEditingStory(null)}
        />
      )}

      {deletingStory && (
        <StoryDelete
          story={deletingStory}
          onClose={() => setDeletingStory(null)}
        />
      )}

    </div>
  );
}

export default AdminManageStories;