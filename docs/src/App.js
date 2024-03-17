import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

function App() {
  return (
    <div className="App">
      <SwaggerUI url={`${process.env.PUBLIC_URL}/swagger.yaml`} />
    </div>
  );
}

export default App;