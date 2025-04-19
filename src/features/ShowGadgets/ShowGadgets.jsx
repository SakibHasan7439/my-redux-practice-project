import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteGadget, fetchGadgetData, updateGadget } from "../gadgetSlice";
import Swal from "sweetalert2";

const ShowGadgets = () => {
  const { gadgets, error, isLoading } = useSelector((state) => state.gadgetR);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGadgetData());
  }, [dispatch]);

  const handleGadgetDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      background: "#ffffff",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteGadget(id));
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const handleFormUpdateSubmit = (event, id) => {
    // const form = document.getElementById(id);
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const brand = form.brand.value;
    const description = form.description.value;
    const price = form.price.value;
    const image = form.image.value;
    const gadget = { name, brand, description, price, image };
    dispatch(updateGadget({id, gadget}));
    document.getElementById(id).close(); // Close the modal after submission
  }

  error && <p>{error.message}</p>;
  isLoading && <p className="text-4xl text-center h-screen">loading...</p>;
  return (
    <div className="p-4 flex-1">
      <div className="grid grid-cols-12 gap-4">
        {gadgets.map((gadget) => (
          <div
            key={gadget?.id}
            className="col-span-4 hover:transition duration-300 hover:translate-3 shadow-2xl border rounded-md bg-white p-2"
          >
            <img
              src={gadget?.image}
              alt="gadget image"
              className="object-cover mb-2 h-[150px] w-full"
            />
            <div className="h-[130px]">
              <p>
                Price: <strong>{gadget?.price}Taka</strong>
              </p>
              <p>
                <strong>Brand:</strong> {gadget?.brand}
              </p>
              <p className="mb-2">{gadget?.description.slice(0, 60)}</p>
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleGadgetDelete(gadget?.id)}
                className="border-2 cursor-pointer rounded-md shadow-md px-2 py-1"
              >
                Delete
              </button>
              <button
                onClick={()=> document.getElementById(gadget?.id).showModal()}
                className="border-2 cursor-pointer rounded-md shadow-md px-2 py-1"
              >
                Update
              </button>
            </div>
            <dialog
              id={`${gadget?.id}`}
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="modal-box">
                <form onSubmit={(event)=>handleFormUpdateSubmit(event, gadget?.id)}>
                  <div className="my-4">
                    <label htmlFor="name" className="block mb-2">
                      name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter gadget name"
                      name="name"
                      defaultValue={gadget?.name}
                      className="w-full border rounded-md p-2"
                    />
                  </div>
                  <div className="my-4">
                    <label htmlFor="brand" className="block mb-2">
                      brand name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter gadget brand"
                      name="brand"
                      defaultValue={gadget?.brand}
                      className="w-full border rounded-md p-2"
                    />
                  </div>
                  <div className="my-4">
                    <label htmlFor="description" className="block mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      placeholder="Enter gadget description"
                      id="description"
                      defaultValue={gadget?.description}
                      cols="30"
                      rows="5"
                      className="w-full border rounded-md p-2"
                    ></textarea>
                  </div>
                  <div className="my-4">
                    <label htmlFor="price" className="block mb-2">
                      Price
                    </label>
                    <input
                      type="number"
                      defaultValue={gadget?.price}
                      placeholder="Enter gadget price"
                      name="price"
                      id="price"
                      className="w-full border rounded-md p-2"
                    />
                  </div>
                  <div className="my-4">
                    <label htmlFor="image" className="block mb-2">
                      Image URL
                    </label>
                    <input
                      type="url"
                      defaultValue={gadget?.image}
                      placeholder="Enter gadget image"
                      name="image"
                      id="image"
                      className="w-full border rounded-md p-2"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-slate-800 text-white px-4 py-2 rounded-md font-semibold cursor-pointer"
                  >
                    Update
                  </button>
                </form>
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowGadgets;
