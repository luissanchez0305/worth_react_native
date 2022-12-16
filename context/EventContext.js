import React from 'react'

const EventsContext = React.createContext({ events: [], getEvents: async () => {} })
export default EventsContext