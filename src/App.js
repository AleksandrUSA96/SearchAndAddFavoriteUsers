import './App.css';
import Layout from "./components/common/Layout";
import UsersGroupList from "./components/userPage/UsersGroupList";

function App() {
    return (
        <div className="App">
            <Layout>
                <UsersGroupList />
            </Layout>
        </div>
    );
}

export default App;
