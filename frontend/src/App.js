import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Navbar from './layout/Navbar';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AddWorkplan from './pages/IT21302244/workoutPlan/AddWorkplan';
import EditWorkplan from './pages/IT21302244/workoutPlan/EditWorkplan';
import ViewWorkplan from './pages/IT21302244/workoutPlan/ViewWorkplan';
import WorkPlan from './pages/IT21302244/workoutPlan/WorkPlan';


function App() {
  return (
    <div className="App">
      <Router>
      <Navbar /> 

      <Routes>
        <Route exact path="/WorkoutPlan" element={<WorkPlan/>}/>
        <Route exact path="/addWorkplan" element={<AddWorkplan/>}/>
        <Route exact path="/editWorkplan/:id" element={<EditWorkplan/>}/>
        <Route exact path="/viewWorkplan/:id" element={<ViewWorkplan/>}/>
        
      </Routes>
      
      
      </Router>
     </div>
     

    
  );
}



export default App;
