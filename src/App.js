import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Home } from "./pages/Home";
import { Contact } from "./pages/Contact";
import { About } from "./pages/About";
import { NotFound } from "./pages/NotFound";
import { Category } from "./pages/Category";
import { Recipe } from "./pages/Recipe";

function App() {
    return (
        <>
            <Router basename="/react-food">
                <Header />
                <main className="container content">
                    <Switch>
                        <Route
                            exact
                            path="/"
                            // component={Home}
                        >
                            <Home />
                        </Route>
                        <Route
                            path="/about"
                            component={About}
                        />
                        <Route
                            path="/contacts"
                            component={Contact}
                        />
                        <Route
                            path="/category/:name"
                            component={Category}
                        />
                        <Route
                            path="/meals/:id"
                            component={Recipe}
                        />
                        <Route component={NotFound} />
                    </Switch>
                </main>
                <Footer />
            </Router>
        </>
    );
}

export default App;
