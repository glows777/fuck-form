import React from "react"

type Schema = {
  namespace: string,
  items: Array<{
    name: string,
    type: string,
  }>
}

const schemas: Schema[] = [
  {
    namespace: 'user',
    items: [
      {
        name: 'name',
        type: 'input',
      },
      {
        name: 'age',
        type: 'input',
      }
    ]
  },
  {
    namespace: 'user2',
    items: [
      {
        name: 'name',
        type: 'input',
      },
      {
        name: 'age',
        type: 'input',
      }
    ]
  }
]

const fuckForm = (schemas: Schema[]) => {
  return schemas.reduce<React.ReactElement>((o, cur) => {
    const namespace = cur.namespace
    const tmp: Record<string, React.ReactElement<any, any>> = {}
    cur.items.forEach(item => {
      tmp[`${namespace}-${item.name}`] = React.createElement(item.type, {
        name: `${namespace}-${item.name}`,
        key: `${namespace}-${item.name}`,
        value: ''
      })
    })
    const prevO = React.cloneElement(o)
    const prevChildren = prevO.props.children || []
    const newO = React.createElement('div', { key: namespace } ,...prevChildren, ...Object.values(tmp))
    return newO
  }, React.createElement('div'))
}

const Form = fuckForm(schemas)

function App() {

  return (
    <>
      <div>
        {Form}
      </div>
    </>
  )
}

export default App
