import './App.css';
import Layout from "./components/common/Layout";
import UserPage from "./components/userPage/UserPage";

function App() {
    return (
        <div className="App">
            <Layout>
                <UserPage />
            </Layout>
        </div>
    );
}

export default App;
