import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import GroupChat from "../components/Groups";
import Header from "../components/Header";

export default function Main() {
    return (
        <>
            <Header />

            <div>
                <GroupChat />
            </div>
            <Footer />  

        </>
    )
}