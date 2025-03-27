import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Home, BarChart2, DollarSign, ChevronLeft, ChevronRight } from "lucide-react";
import "./Sidebar.css";

function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <nav className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
            <button className="toggle-btn" onClick={() => setIsCollapsed(!isCollapsed)}>
                {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
            </button>

            <ul>
                <li>
                    <Link to="/">
                        <Home />
                        {!isCollapsed && <span>Home</span>}
                    </Link>
                </li>
                <li>
                    <Link to="/expenses">
                        <DollarSign />
                        {!isCollapsed && <span>Expenses</span>}
                    </Link>
                </li>
                <li>
                    <Link to="/analytics">
                        <BarChart2 />
                        {!isCollapsed && <span>Analytics</span>}
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Sidebar;
