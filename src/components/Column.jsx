import styled from 'styled-components';
// import { Droppable } from 'react-beautiful-dnd';
import { Task } from './Task';
import { StrictModeDroppable } from './StrictModeDroppable';
import { Draggable } from 'react-beautiful-dnd';
import React from 'react';

const Container = styled.div`
  margin: 8px;
  background-color: white;
  border: 1px solid lightgrey;
  border-redius: 2px;
  width: 220px;

  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
  background-color: ${props =>
    props.isdraggingover === 'true' ? 'skyblue' : 'white'};
  flex-grow: 1;
  min-height: 100px;
`;

class InnerList extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.tasks === this.props.tasks) {
      return false;
    }
    return true;
  }

  render() {
    return this.props.tasks.map((task, index) => (
      <Task key={task.id} task={task} index={index} />
    ));
  }
}

export const Column = ({
  column,
  tasks,
  index,
  // drag only forward, not into prev column
  //   isDropDisabled,
}) => {
  return (
    <Draggable draggableId={column.id} index={index}>
      {provided => (
        <Container {...provided.draggableProps} ref={provided.innerRef}>
          <Title {...provided.dragHandleProps}>{column.title}</Title>
          <StrictModeDroppable
            droppableId={column.id}
            type="task"
            // type={column.id === 'column-3' ? 'done' : 'active'}
            //
            // drag only forward, not into prev column
            // isDropDisabled={isDropDisabled}
          >
            {(provided, snapshot) => (
              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isdraggingover={`${snapshot.isDraggingOver}`} // lowercase & 'true' or 'false' string (bool triggers a warning)
              >
                <InnerList tasks={tasks} />

                {provided.placeholder}
              </TaskList>
            )}
          </StrictModeDroppable>
        </Container>
      )}
    </Draggable>
  );
};
