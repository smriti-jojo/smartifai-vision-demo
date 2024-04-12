import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Visualization from './pages/visualization';
import Newgraph from './component/Newgraph';
import PieChart from './component/Latestgraph';
import StackedBarChart from './component/barChart/StackedBarChart';
import SocialVisualization from './pages/socialVisualization';
import NewVisualization from './pages/NewVisualization';
//  import Graph1 from './component/Graph1';


function App() {
  return (
    <div className="App">
      <div className='legendArea'></div>
    
     <BrowserRouter>
    <Routes>
      {/* <Route path='/' element={<Visualization/>}/> */}
      
      {/* <Route path='/' element={<SocialVisualization/>}/> */}
      <Route path='/' element={<NewVisualization/>}/>
    
    </Routes> 
     </BrowserRouter>  
     </div>
  );
}

export default App;
