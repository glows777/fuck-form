import React from "react"

type Schema = {
  namespace: string,
  items: Array<{
    name: string,
    type: string,
    attributes?: Record<string, any>,
  }>
}

const schemas: Schema[] = [
  {
    namespace: 'user',
    items: [
      {
        name: 'name',
        type: 'input',
        attributes: {
          onChange: () => {
            console.log('onchange')
          }
        }
      },
      {
        name: 'age',
        type: 'input',
        attributes: {
          onChange: () => {
            console.log('onchange')
          }
        }
      }
    ]
  },
  {
    namespace: 'user2',
    items: [
      {
        name: 'name',
        type: 'input',
        attributes: {
          onChange: () => {
            console.log('onchange')
          }
        }
      },
      {
        name: 'age',
        type: 'input',
        attributes: {
          onChange: () => {
            console.log('onchange')
          }
        }
      }
    ]
  }
]

const useFuckForm = (schemas: Schema[]) => {
  const [form, setForm] = React.useState<any>(() => {
    const tmp: Record<string, any> = {}
    schemas.forEach(schema => {
      schema.items.forEach(item => {
        tmp[`${schema.namespace}-${item.name}`] = ''
      })
    })
    return tmp
  })
  const fuckForm = schemas.reduce<React.ReactElement>((o, cur) => {
    const namespace = cur.namespace
    const tmp: Record<string, React.ReactElement<any, any>> = {}
    cur.items.forEach(item => {
      tmp[`${namespace}-${item.name}`] = React.createElement(item.type, {
        name: `${namespace}-${item.name}`,
        key: `${namespace}-${item.name}`,
        value: form[`${namespace}-${item.name}`],
        ...item.attributes,
      })
    })
    const prevO = React.cloneElement(o)
    const prevChildren = prevO.props.children || []
    const newO = React.createElement('div', { key: namespace }, ...prevChildren, ...Object.values(tmp))
    return newO
  }, React.createElement('div'))

  return {
    form: {
      form,
      setForm,
    },
    fuckForm
  }
}

function App() {
  const {
    form,
    fuckForm,
  } = useFuckForm(schemas)

  return (
    <>
      <div>
        <button onClick={() => {
          form.setForm(prev => {
            return {
              ...prev,
              ['user-name']: 'user-name',
            }
          })
        }}>click me</button>
        {fuckForm}
      </div>
    </>
  )
}

export default App
