import React, { ReactNode } from "react";
import { Droppable,
  DroppableProps,
  DroppableProvided,
  DroppableProvidedProps,
  Draggable,
  DraggableProps } from "react-beautiful-dnd";

type DropProps = Omit<DroppableProps, 'children'> & { children: ReactNode }

/** 对Droppable进一步封装 */
export const Drop = ({children, ...props}: DropProps) => {
  return <Droppable {...props}>
    {
      (provided => {
        if (React.isValidElement(children)) {
          return React.cloneElement(children, {
            provided,
            ...provided.droppableProps,
            // @ts-ignore
            ref: provided.innerRef,
          })
        }
        return <div />
      })
    }
  </Droppable>
}

type DropChildProps =
  Partial<{provided: DroppableProvided} & DroppableProvidedProps> 
  & React.HTMLAttributes<HTMLDivElement>

/** 对DropChild进一步封装 */
export const DropChild = React.forwardRef<HTMLDivElement, DropChildProps>(
  ({children, ...props}, ref) => <div ref={ref} {...props}>
    {children}
    {props.provided?.placeholder}
  </div>
)

type DragProps = Omit<DraggableProps, 'children'> & { children: ReactNode }

/** 对Draggable进一步封装 */
export const Drag = ({children, ...props}: DragProps) => {
  return <Draggable {...props}>
    {
      (provided => {
        if (React.isValidElement(children)) {
          return React.cloneElement(children, {
            ...provided.draggableProps,
            ...provided.dragHandleProps,
            // @ts-ignore
            ref: provided.innerRef,
          })
        }
        return <div />
      })
    }
  </Draggable>
}
