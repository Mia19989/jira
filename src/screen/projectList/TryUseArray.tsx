import React from "react";
import { useArray } from "../../utils";

export interface Person {
  name: string;
   age: number;
}

export const TsReactTest = () => {
  const persons: Person[] = [
    {
      name: "jack",
      age: 25
    },
    {
      name: "ma",
      age: 22
    },
  ]

  const {value, clear, removeIndex, add} = useArray(persons)

  return (
    <>
      <div>
        <button onClick={() => add({name: "hcc", age: 21})}>add</button>
        <button onClick={() => removeIndex(0)}>remove 0</button>
        <button onClick={() => clear()}>clear</button>
        {
          value.map((person: Person, index: number) => {
            return (
              <div key={index}>
                {`${index} ${person.name} ${person.age}`}
              </div>
            )
          })
        }
      </div>
    </>
  )
}