import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteGadget, fetchGadgetData } from "../gadgetSlice";
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
                onClick={() => document.getElementById(gadget?.id).showModal()}
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
                <h3 className="font-bold text-lg">Hello!</h3>
                <p>{gadget?.id}</p>
                <p className="py-4">
                  Press ESC key or click the button below to close
                </p>
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
