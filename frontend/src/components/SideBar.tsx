import { Link } from "react-router-dom";
import "../App.css";

export default function Sidebar() {
    return (
        <aside className="sidebar">
            <h1>ZEUS TASK MANAGER
                <span className="icon mr-1">
                    <i className="fas fa-bolt"></i>
                </span>
            </h1>
            <div className="menu-title">Menu</div>
            <nav>
                <Link to="/tasks">
                    <span className="icon mr-1">
                        <i className="fas fa-tasks"></i>
                    </span>
                    Tasks
                </Link>

                <Link to="/dashboard">
                    <span className="icon mr-1">
                        <i className="fas fa-th"></i>
                    </span>                
                Dashboard
                </Link>

                <Link to="/calendar">
                    <span className="icon mr-1">
                        <i className="far fa-calendar-alt"></i>
                    </span>
                    Calendar
                </Link>

                <Link to="/settings">
                    <span className="icon mr-1">
                        <i className="fas fa-cog"></i>
                    </span>
                    Settings
                </Link>
            </nav>
        </aside>
    );
}