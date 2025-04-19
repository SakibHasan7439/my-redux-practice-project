import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteGadget, fetchGadgetData } from '../gadgetSlice';

const ShowGadgets = () => {
    const { gadgets, error, isLoading } = useSelector((state) =>state.gadgetR);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchGadgetData());
    }, [dispatch]);

    error && <p>{error.message}</p>
    isLoading && <p className='text-4xl text-center h-screen'>loading...</p>
    return (
        <div className='p-4 flex-1'>
            <div className='grid grid-cols-12 gap-4'>
                {
                    gadgets.map((gadget) =><div key={gadget?.id} className='col-span-4 shadow-2xl border rounded-md bg-white p-2'>
                        <img src={gadget?.image} alt="gadget image" className='object-cover mb-2 h-[150px] w-full' />
                        <div className='h-[130px]'>
                            <p>Price: <strong>{gadget?.price}Taka</strong></p>
                            <p><strong>Brand:</strong> {gadget?.brand}</p>
                            <p className='mb-2'>{gadget?.description.slice(0, 60)}</p>
                        </div>
                        <button onClick={()=>dispatch(deleteGadget(gadget?.id))} className='border-2 cursor-pointer rounded-md shadow-md px-4 py-2'>Delete</button>
                    </div>)
                }
            </div>
            
        </div>
    ); 
};

export default ShowGadgets;