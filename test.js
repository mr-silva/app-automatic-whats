const randomize = require('randomatic')

// ####### MESSAGE SEND WITH VARIABLES #######

// const rawMessage =
//   'Esta e uma mensagem de texto para o contato {{nome}} de {{cidade}}, no dia {{data}}.'

// let messageVariablesToUse = [...rawMessage.matchAll(/{{(.*?)}}/gm)].flatMap(variable => variable[1])

// const contactsPayload = [
//   {
//     phoneNumber: '5551984991442',
//     messageVariables: {
//       nome: 'Maicon',
//       cidade: 'Cachoeirinha',
//       data: '18/02/2023'
//     }
//   },
//   {
//     phoneNumber: '5551989377131',
//     messageVariables: {
//       nome: 'Vitoria',
//       cidade: 'Gravataí',
//       data: '18/02/2023'
//     }
//   }
// ]

// for (const payload of contactsPayload) {
//   let message = null
//   for (variable of messageVariablesToUse) {
//     if (!message) message = rawMessage

//     const messageVariableKey = Object.keys(payload.messageVariables).find(key => key === variable)

//     message = message.replace(
//       `{{${messageVariableKey}}}`,
//       payload.messageVariables[messageVariableKey]
//     )
//   }

//   console.log(message)
// }

// ###### SET INTERVAL FUNCTION #######

const items = [
  {
    data: {
      nome: 'Maicon',
      numero: '5551984991442'
    },
    taskId: 1
  },
  {
    data: {
      nome: 'Vitoria',
      numero: '5551989377131'
    },
    taskId: 1
  },
  {
    data: {
      nome: 'Vitoria',
      numero: '5551989377131'
    },
    taskId: 1
  },
  {
    data: {
      nome: 'Vitoria',
      numero: '5551989377131'
    },
    taskId: 1
  },
  {
    data: {
      nome: 'Vitoria',
      numero: '5551989377131'
    },
    taskId: 1
  },
  {
    data: {
      nome: 'Vitoria',
      numero: '5551989377131'
    },
    taskId: 1
  },
  {
    data: {
      nome: 'Vitoria',
      numero: '5551989377131'
    },
    taskId: 1
  },
  {
    data: {
      nome: 'Vitoria',
      numero: '5551989377131'
    },
    taskId: 1
  },
  {
    data: {
      nome: 'Vitoria',
      numero: '5551989377131'
    },
    taskId: 1
  },
  {
    data: {
      nome: 'Vitoria',
      numero: '5551989377131'
    },
    taskId: 1
  },
  {
    data: {
      nome: 'Vitoria',
      numero: '5551989377131'
    },
    taskId: 1
  },
  {
    data: {
      nome: 'Vitoria',
      numero: '5551989377131'
    },
    taskId: 1
  },
  {
    data: {
      nome: 'Vitoria',
      numero: '5551989377131'
    },
    taskId: 1
  },
  {
    data: {
      nome: 'Vitoria',
      numero: '5551989377131'
    },
    taskId: 1
  },
  {
    data: {
      nome: 'Vitoria',
      numero: '5551989377131'
    },
    taskId: 1
  },
  {
    data: {
      nome: 'Vitoria',
      numero: '5551989377131'
    },
    taskId: 1
  },
  {
    data: {
      nome: 'Vitoria',
      numero: '5551989377131'
    },
    taskId: 1
  },
  {
    data: {
      nome: 'Vitoria',
      numero: '5551989377131'
    },
    taskId: 1
  },
  {
    data: {
      nome: 'Vitoria',
      numero: '5551989377131'
    },
    taskId: 1
  },
  {
    data: {
      nome: 'Vitoria',
      numero: '5551989377131'
    },
    taskId: 1
  },
  {
    data: {
      nome: 'Vitoria',
      numero: '5551989377131'
    },
    taskId: 1
  },
  {
    data: {
      nome: 'Vitoria',
      numero: '5551989377131'
    },
    taskId: 1
  },
  {
    data: {
      nome: 'Vitoria',
      numero: '5551989377131'
    },
    taskId: 1
  },
  {
    data: {
      nome: 'Vitoria',
      numero: '5551989377131'
    },
    taskId: 1
  },
  {
    data: {
      nome: 'Vitoria',
      numero: '5551989377131'
    },
    taskId: 1
  },
  {
    data: {
      nome: 'Vitoria',
      numero: '5551989377131'
    },
    taskId: 1
  }
]

const processItem = (item, interval) => {
  console.log(item, `processed in ${interval / 1000} seconds.`)
}

const randomIntFromInterval = (min, max) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

let previousInterval = 0
items.forEach((item, i) => {
  const randonTime = randomIntFromInterval(10, 30)

  console.log(randonTime)

  const interval = (randonTime + previousInterval) * 1000

  previousInterval = interval / 1000

  console.log(interval)

  item['taskId'] = i + 1

  setTimeout(() => processItem(item, interval), interval)
})

// ## STRING PARSE
// const rawData =
//   '{nome: Welinton, numero: 555192767016, email: welinton@gmail.com, valor: 30.23, data: 2022-10-19T00:06:28.000}'

// console.log(JSON.parse('{"nome": "Welinton"}'))
