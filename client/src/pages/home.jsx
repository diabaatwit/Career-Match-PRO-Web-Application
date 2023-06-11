import React, { useState } from "react";
import SearchJob from "../components/searchJob";


function Home() {
  return (
    !!localStorage.getItem('userToken') ?
      <div>
        <SearchJob />
      </div> :
      <div>
        
      </div>
  );
}

export default Home;