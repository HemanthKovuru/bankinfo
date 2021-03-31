import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import "./scss/App.scss";

import ListPage from "./pages/ListPage";
import SingleListPage from "./pages/SingleListPage";
import Favourite from "./pages/Favourite";

const App = () => {
  const [item, setItem] = useState();
  return (
    <Switch>
      <Route exact path='/' component={() => <ListPage setItem={setItem} />} />
      <Route
        exact
        path='/favourites'
        component={() => <Favourite setItem={setItem} />}
      />
      <Route
        exact
        path='/banks/:id'
        component={() => <SingleListPage item={item} />}
      />
    </Switch>
  );
};

export default App;
