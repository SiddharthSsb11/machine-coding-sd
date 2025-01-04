import React from "react";

const useTraverseTree = () => {
  const insertNode = (tree, folderId, item, isFolder) => {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder,
        items: [],
      });

      return tree;
    }

    let latestNode;
    latestNode = tree.items.map((obj, index) => {
      return insertNode(obj, folderId, item, isFolder);
    });
    return { ...tree, items: latestNode };
  };

  // Delete a node from the tree
  const deleteNode = (tree, folderId) => {
    // If the tree's items contain the node to be deleted
    const filteredItems = tree.items.filter((obj) => obj.id !== folderId);

    // If the current tree node contains items, recursively process them
    const updatedItems = filteredItems.map((obj) => {
      return deleteNode(obj, folderId);
    });

    // Return the updated tree with filtered items
    return { ...tree, items: updatedItems };
  };

  return { insertNode, deleteNode };
};

export default useTraverseTree;
