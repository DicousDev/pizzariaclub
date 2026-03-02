import {DragDropProvider, useDraggable, useDroppable} from '@dnd-kit/react';
import { useState } from 'react';

export const Teste = () => {
  const {ref} = useDraggable({
    id: 'draggable',
  });
  const [isDropped, setIsDropped] = useState(false);

  return (
    <DragDropProvider
      onDragEnd={(event) => {
        console.log("END")
        if (event.canceled) return;

        const {target} = event.operation;
        setIsDropped(target?.id === 'droppable');
      }}
    >
      <Draggable />
    </DragDropProvider>
  );
}

function Draggable() {
  const {ref} = useDraggable({
    id: 'draggable',
  });

  return (
    <button ref={ref} className='bg-red-500'>
      Draggable
    </button>
  );
}

function Droppable({id, children}: {id: any, children?: any}) {
  const {ref} = useDroppable({
    id,
  });

  return (
    <div ref={ref} style={{width: 300, height: 300}} className='bg-blue-500'>
      {children}
    </div>
  );
}