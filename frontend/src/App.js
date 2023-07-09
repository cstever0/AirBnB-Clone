// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotShow from "./components/SpotShow";
import SpotDetails from "./components/SpotDetails";
import CreateSpotForm from "./components/CreateSpotForm";
import ManageSpotPage from "./components/ManageSpotPage";
import ManageBookingsPage from "./components/ManageBookingsPage";
import SearchFilter from "./components/SearchFilter";
import AboutMeFooter from "./components/AboutMeFooter";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [query, setQuery] = useState("")

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} setQuery={setQuery} />
      {isLoaded && (
        <Switch>
          <Route exact path="/spots/new">
            <CreateSpotForm />
          </Route>
          <Route exact path="/spots/manage">
            <SearchFilter query={query} setQuery={setQuery} />
            <ManageSpotPage query={query} />
          </Route>
          <Route path="/spots/:spotId">
            <SpotDetails />
          </Route>
          <Route path="/bookings/manage">
            <ManageBookingsPage />
          </Route>
          <Route exact path="/" >
            <SearchFilter query={query} setQuery={setQuery} />
            <SpotShow query={query} />
          </Route>
        </Switch>
      )}
      <AboutMeFooter />
    </>
  );
};

export default App;
