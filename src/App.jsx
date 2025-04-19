import './App.css'
import AddGadget from './features/addGadget/addGadget';
import ShowGadgets from './features/ShowGadgets/ShowGadgets';

function App() {
  return (
    <div className='flex items-center justify-between gap-4 max-w-7xl w-full mx-auto'>
      <AddGadget />
      <ShowGadgets />
    </div>
  )
}

export default App;
