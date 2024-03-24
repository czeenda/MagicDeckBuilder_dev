import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import SortableList from './SortableList';

const SortableListApp = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <SortableList />
    </DndProvider>
  );
};

export default SortableListApp;
