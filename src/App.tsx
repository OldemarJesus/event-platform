// import { Event } from "./pages/Event"
import { ApolloProvider } from "@apollo/client"
import { client } from "./lib/apollo"
import { Router } from "./Router"

function App() {

  return (
    <div>
      <ApolloProvider client={client}>
        <Router />
      </ApolloProvider>
    </div>
  )
}

export default App
