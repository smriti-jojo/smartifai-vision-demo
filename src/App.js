import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Visualization from './pages/visualization';
import Newgraph from './component/Newgraph';
import PieChart from './component/Latestgraph';
import StackedBarChart from './component/barChart/StackedBarChart';
//  import Graph1 from './component/Graph1';


function App() {
  return (
    <div className="App">
    {/* <BrowserRouter>
    <Routes>
      <Route path='/' element={<Visualization/>}/>
      <Route path='/newgraph' element={<Newgraph/>}/>
      <Route path='/latest' element={<PieChart/>}/>
      <Route path='/barChart' element={<StackedBarChart/>}/>
      
      
       {/* <Route path='/graph1' element={<Graph1/>}/> */}
    {/* </Routes> */}
    {/* </BrowserRouter>  */}
    {/* <StackedBarChart /> */}
      <div className='legendArea'></div>
    
     <BrowserRouter>
    <Routes>
      <Route path='/' element={<Visualization/>}/>
      <Route path='/newgraph' element={<Newgraph/>}/>
      <Route path='/latest' element={<PieChart/>}/>
      <Route path='/barChart' element={<StackedBarChart/>}/>
      
      
     {/* <Route path='/graph1' element={<Graph1/>}/> */}
    </Routes> 
     </BrowserRouter>  
     </div>
  );
}

export default App;
