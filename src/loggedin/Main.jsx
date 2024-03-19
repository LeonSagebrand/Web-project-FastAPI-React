import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import GroupChat from "../components/Groups";
import Header from "../components/Header";
import Dashboard from "../components/Dashboard";

export default function Main() {
    return (
        <>
            <Header />
            <div>
                <Dashboard/>
            </div>
            <div>
                <GroupChat />
            </div>
            <Footer />  

        </>
    )
}