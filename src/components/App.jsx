import { DragDropContext } from 'react-beautiful-dnd';
import { initialData } from 'initial-data';
import { Column } from './Column';
import React, { useState } from 'react';
import { styled } from 'styled-components';
import { StrictModeDroppable } from './StrictModeDroppable';

const Container = styled.div`
  display: flex;
`;

class InnerList extends React.PureComponent {
  // shouldComponentUpdate(nextProps) {
  //   if (
  //     nextProps.column === this.props.column &&
  //     nextProps.taskMap === this.props.taskMap &&
  //     nextProps.index === this.props.index
  //   ) {
  //     return false;
  //   }
  //   return true;
  // }

  render() {
    const { column, taskMap, index } = this.props;
    const tasks = column.taskIds.map(taskId => taskMap[taskId]);
    return (
      <Column
        column={column}
        tasks={tasks}
        index={index}
        // drag only forward, not into prev column
        // isDropDisabled={isDropDisabled}
      />
    );
  }
}

export const App = () => {
  // const state = initialData;
  const [state, setState] = useState(initialData);

  // drag only forward, not into prev column
  // const [homeIndex, setHomeIndex] = useState(null);

  const onDragStart = start => {
    // document.body.style.color = 'orange';
    // document.body.style.transition = 'background-color 0.2s ease';
    //
    // drag only forward, not into prev column
    // const homeIndex = state.columnOrder.indexOf(start.source.droppableId);
    // setHomeIndex(homeIndex);
  };

  const onDragEnd = result => {
    // document.body.style.color = 'inherit';
    // document.body.style.backgroundColor = 'inherit';

    // drag only forward, not into prev column
    // setHomeIndex(null);

    // TODO render our column
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'column') {
      const newColumnOrder = Array.from(state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...state,
        columnOrder: newColumnOrder,
      };

      setState(newState);
      return;
    }

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };

      setState(newState);
      return;
    }

    // Moving from one list to another

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setState(newState);
    return;
  };

  const onDragUpdate = update => {
    // const { destination } = update;
    // const opacity = destination
    //   ? destination.index / Object.keys(state.tasks).length
    //   : 0;
    // document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
  };

  return (
    <DragDropContext
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      <StrictModeDroppable
        droppableId="all-columns"
        direction="horizontal"
        type="column"
      >
        {provided => (
          <Container {...provided.droppableProps} ref={provided.innerRef}>
            {state.columnOrder.map((columnId, index) => {
              const column = state.columns[columnId];
              //!  const tasks = column.taskIds.map(taskId => state.tasks[taskId]);

              // drag only forward, not into prev column
              // const isDropDisabled = index < homeIndex;

              return (
                <InnerList
                  key={column.id}
                  column={column}
                  taskMap={state.tasks}
                  index={index}
                  // drag only forward, not into prev column
                  // isDropDisabled={isDropDisabled}
                />
              );
            })}
            {provided.placeholder}
          </Container>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  );
};

// -----------------------------------------

// -----------------------------------------

// -----------------------------------------

// -----------------------------------------

// -----------------------------------------

// -----------------------------------------

// import { StartLayout } from 'components/StartLayout/StartLayout';
// import { AuthPage } from 'pages/AuthPage/AuthPage';
// import { Home } from 'pages/Home/Home';
// import { Route, Routes } from 'react-router-dom';
// import { RegisterForm } from './RegisterForm';
// import { LoginForm } from './LoginForm';

// <Routes>
//   <Route path="/" element={<StartLayout />}>
//     <Route index element={<Home />} />
//     <Route path="/auth/:id" element={<AuthPage />}>
//       <Route path="register" element={<RegisterForm />} />
//       <Route path="login" element={<LoginForm />} />
//     </Route>
//   </Route>
// </Routes>
