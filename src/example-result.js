const result = {
  draggableId: 'task-1',
  type: 'TYPE',
  reason: 'DROP',
  source: {
    droppableId: 'column-1',
    index: 0,
  },
  destination: {
    droppableId: 'column-1',
    index: 1,
  },
};

// Draggable
const draggableSnapshot = {
  isDragging: true,
  draggingOver: 'column-1',
};

// Droppable
const droppableSnapshot = {
  isDraggingOver: true,
  draggingOverWith: 'task-1',
};

// todo Example Hooks:
// onDragStart
const start = {
  draggableId: 'task-1',
  type: 'TYPE',
  source: {
    droppableId: 'column-1',
    index: 0,
  },
};

// OnDragUpdate
const update = {
  ...start,
  destination: {
    droppableId: 'column-1',
    index: 3,
  },
};

// OnDragEnd
const result = {
  ...update,
  reason: 'DROP',
};
