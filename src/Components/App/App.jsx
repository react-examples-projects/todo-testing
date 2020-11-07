import "../../Styles/App.css";
import context from "../Pagination/Context/contextPagination";
import ProviderPagination from "../Pagination/Provider/ProviderPagination";
function App() {
  const app = (state) => {
    return <p>{state.totalPages}</p>;
  };

  return (
    <div className="App">
      <ProviderPagination>
        <context.Consumer>{app}</context.Consumer>
      </ProviderPagination>
    </div>
  );
}

export default App;
