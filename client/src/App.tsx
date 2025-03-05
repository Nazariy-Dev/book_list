import AddBook from "./pages/AddBook/AddBook.tsx";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import Footer from "./components/Footer.tsx";
import EditBook from "./pages/EditBook/EditBook.tsx";
import Outlet from "./components/Outlet.tsx";

const routes = [
    {path: "/", component: Dashboard},
    {path: "/addBook", component: AddBook},
    {path: "/editBook", component: EditBook},
]

function App() {
    return (
        <>
            <div className="flex flex-col h-screen pt-8">
                <div className={"container mx-auto flex-1 px-2"}>
                    <Outlet routes={routes}/>
                </div>
                <Footer/>
            </div>
        </>
    )
}

export default App
