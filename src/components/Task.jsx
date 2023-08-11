import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${props =>
    props.isdragitemdisabled === 'true'
      ? 'lightgrey'
      : props.isdragging === 'true'
      ? 'lightgreen'
      : 'white'};

  display: flex;
`;

const Handle = styled.div`
  width: 20px;
  height: 20px;
  background-color: orange;
  border-radius: 4px;
  margin-right: 8px;
`;

export const Task = ({ task, index }) => {
  const isDragItemDisabled = task.id === 'task-1';
  return (
    <Draggable
      draggableId={task.id}
      index={index}
      isDragDisabled={isDragItemDisabled}
    >
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          //   {...provided.dragHandleProps}
          ref={provided.innerRef}
          isdragging={`${snapshot.isDragging}`} // lowercase & 'true' or 'false' string (bool triggers a warning)
          isdragitemdisabled={`${isDragItemDisabled}`}
        >
          <Handle {...provided.dragHandleProps} />
          {/* to drag element only by Handle component */}

          {task.content}
        </Container>
      )}
    </Draggable>
  );
};
