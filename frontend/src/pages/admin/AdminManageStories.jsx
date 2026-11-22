import { useState } from "react";

import ManageMainBox from "../../components/admin/ManageMainBox";
import ManageSecondaryBox from "../../components/admin/ManageSecondaryBox";
import StoryList from "../../components/admin/StoryList";
import StoryCreate from "../../components/admin/StoryCreate";
import StoryUpdate from "../../components/admin/StoryUpdate";
import StoryDelete from "../../components/admin/StoryDelete";

function AdminManageStories() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingStory, setEditingStory] = useState(null);
  const [deletingStory, setDeletingStory] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleStorySaved = () => {
    console.log("Story Saved");

    setRefreshKey((prev) => prev + 1);

    setShowCreateModal(false);
  };

  return (
    <div className="adminDashboard">
      <div className="adminDashboardTop">
        <h1 className="adminManageHeading">
          Manage Homepage Stories
        </h1>
      </div>
      <ManageMainBox
        refreshKey={refreshKey}
      />

      <ManageSecondaryBox
        refreshKey={refreshKey}
      />

      <StoryList
        refreshKey={refreshKey}
        onCreateStory={() => setShowCreateModal(true)}
        onEditStory={(story) =>
          setEditingStory(story)
        }
        onDeleteStory={(story) =>
          setDeletingStory(story)
        }
      />

      {showCreateModal && (
        <StoryCreate
          onClose={() =>
            setShowCreateModal(false)
          }
          onSuccess={handleStorySaved}
        />
      )}

      {editingStory && (
        <StoryUpdate
          storyId={editingStory.story_id}
          onClose={() =>
            setEditingStory(null)
          }
        />
      )}

      {deletingStory && (
        <StoryDelete
          story={deletingStory}
          onClose={() =>
            setDeletingStory(null)
          }
        />
      )}
    </div>
  );
}

export default AdminManageStories;