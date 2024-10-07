import Router from "~/router";
import { Header } from "./components/Header";
import { SnackbarProvider } from "./contexts/snackbarContext";

function App() {
  return (
    <SnackbarProvider>
      <Header>
        <h1>Caju Front Teste</h1>
      </Header>
      <Router />
    </SnackbarProvider>
  );
}

export default App;
