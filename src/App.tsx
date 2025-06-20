import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import AnalyticsPage from "./components/pages/AnalyticsPage/AnalyticsPage";
import GeneratorPage from "./components/pages/GeneratorPage/GeneratorPage";
import HistoryPage from "./components/pages/HistoryPage/HistoryPage";
import Header from "./components/layout/Header/Header";

const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/generator" element={<GeneratorPage />} />
                <Route path="/history" element={<HistoryPage />} />
                <Route
                    path="/"
                    element={<Navigate to="/analytics" replace />}
                />
            </Routes>
        </Router>
    );
};

export default App;
