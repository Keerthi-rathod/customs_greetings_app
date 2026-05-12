import { useState } from "react";
import { styles } from "./styles/styles";
import { LoginScreen } from "./components/LoginScreen";
import { HomeScreen } from "./components/HomeScreen";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <div style={styles.root}>
      {user
        ? <HomeScreen user={user} onLogout={() => setUser(null)} />
        : <LoginScreen onLogin={setUser} />
      }
    </div>
  );
}
