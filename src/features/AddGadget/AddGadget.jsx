import React from 'react';
import { useDispatch } from 'react-redux';
import { addGadget } from '../gadgetSlice';

const AddGadget = () => {
    const dispatch = useDispatch();
    const handleFormSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const brand = form.brand.value;
        const description = form.description.value;
        const price = form.price.value;
        const image = form.image.value;
        const id = Math.floor(Math.random() * 1000) + 1; // Generate a random id for the gadget
        const gadget = { name, brand, description, price, image, id };

        dispatch(addGadget(gadget));
        event.target.reset(); // Reset the form after submission
    }
        
    return (
        <div className='border-r-2 max-w-xl p-4 mx-auto w-full py-10'>
            <form onSubmit={handleFormSubmit}>
                <h2 className='text-3xl font-semibold text-center'>Add Gadget</h2>
                <div className='my-4'>
                    <label htmlFor="name" className='block mb-2'>name</label>
                    <input type="text" placeholder='Enter gadget name' name="name" className='w-full border rounded-md p-2' />
                </div>
                <div className='my-4'>
                    <label htmlFor="brand" className='block mb-2'>brand name</label>
                    <input type="text" placeholder='Enter gadget brand' name="brand" className='w-full border rounded-md p-2' />
                </div>
                <div className='my-4'>
                    <label htmlFor="description" className='block mb-2'>Description</label>
                    <textarea name="description"placeholder='Enter gadget description' id="description" cols="30" rows="5" className='w-full border rounded-md p-2'></textarea>
                </div>
                <div className='my-4'>
                    <label htmlFor="price" className='block mb-2'>Price</label>
                    <input type="number"placeholder='Enter gadget price' name="price" id="price" className='w-full border rounded-md p-2' />
                </div>
                <div className='my-4'>
                    <label htmlFor="image" className='block mb-2'>Image URL</label>
                    <input type="url" placeholder='Enter gadget image' name="image" id="image" className='w-full border rounded-md p-2' />
                </div>
                <button type="submit" className='bg-slate-800 text-white px-4 py-2 rounded-md font-semibold cursor-pointer'>Add Gadget</button>
            </form>
        </div>
    );
};

export default AddGadget;