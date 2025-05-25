import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from './App';
import store from './Store';
import "./components/common/Global/Global.css";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={ store }>
        <App />
    </Provider>
);