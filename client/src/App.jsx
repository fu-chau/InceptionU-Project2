import Register from './components/Register';
import Login from './components/Login';
import { useAuth } from './context/AuthContext';

function App() {
  const { user, logout } = useAuth();

  return (
    <div>
      {user ? (
        <div>
          <h2>Welcome, {user.username}</h2>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <>
          <Login />
          <Register />
        </>
      )}
    </div>
  );
}

export default App;