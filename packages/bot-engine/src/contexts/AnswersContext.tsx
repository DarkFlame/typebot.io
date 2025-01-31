import { Answer, ResultValues, VariableWithValue } from 'models'
import React, { createContext, ReactNode, useContext, useState } from 'react'

const answersContext = createContext<{
  resultValues: ResultValues
  addAnswer: (answer: Answer) => void
  updateVariables: (variables: VariableWithValue[]) => void
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
}>({})

export const AnswersContext = ({
  children,
  onNewAnswer,
  onVariablesUpdated,
}: {
  onNewAnswer: (answer: Answer) => void
  onVariablesUpdated?: (variables: VariableWithValue[]) => void
  children: ReactNode
}) => {
  const [resultValues, setResultValues] = useState<ResultValues>({
    answers: [],
    variables: [],
    createdAt: new Date().toISOString(),
  })

  const addAnswer = (answer: Answer) => {
    setResultValues((resultValues) => ({
      ...resultValues,
      answers: [...resultValues.answers, answer],
    }))
    onNewAnswer(answer)
  }

  const updateVariables = (variables: VariableWithValue[]) =>
    setResultValues((resultValues) => {
      const updatedVariables = [...resultValues.variables, ...variables]
      if (onVariablesUpdated) onVariablesUpdated(updatedVariables)
      return {
        ...resultValues,
        variables: updatedVariables,
      }
    })

  return (
    <answersContext.Provider
      value={{
        resultValues,
        addAnswer,
        updateVariables,
      }}
    >
      {children}
    </answersContext.Provider>
  )
}

export const useAnswers = () => useContext(answersContext)
