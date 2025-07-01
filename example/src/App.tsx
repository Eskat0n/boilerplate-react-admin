import React from "react";
import { Route } from "react-router-dom";
import Dashboard from "@material-ui/icons/Dashboard";
import AccountBox from "@material-ui/icons/AccountBox";
import { Application } from "@codeparts/boilerplate-react-admin";
import { DashboardPage } from "./pages/DashboardPage";
import { FormsDemoPage } from "./pages/FormsDemoPage";
import { TableDemoPage } from "./pages/TableDemoPage";

const structure = [
    {
        id: "nav-dashboard",
        path: "/",
        title: "Dashboard",
        icon: <Dashboard />
    },
    {
        path: "/demo",
        title: "Demo",
        icon: <AccountBox />,
        children: [
            { path: "/forms", title: "Forms" },
            { path: "/table", title: "Responsive table" },
        ]
    }
];

const globalSearch = {
    dataSource: async (term: string) =>
        fetch(`https://api.github.com/search/issues?q=${encodeURIComponent(term)}`)
            .then(response => response.json())
            .then(result => result.items.map((item: any) => ({
                url: item.url,
                image: item.user.avatar_url,
                title: item.title
            })))
};

const App = () => {
    return (
        <Application
            id="example"
            name="Boilerplate Example"
            metadata={{
                production: false,
                environment: "development",
                version: "1.0.0",
            }}
            toolbarSearch={globalSearch}
            sidebarNav={{structure, search: true}}
        >
            <Route path="/" element={<DashboardPage />} />
            <Route path="/demo">
                <Route path="/forms" element={<FormsDemoPage />} />
                <Route path="/table" element={<TableDemoPage />} />
            </Route>
        </Application>
    );
};

export default App;
