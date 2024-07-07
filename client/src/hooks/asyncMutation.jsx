import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useError from "./error";

const useAsyncMutation = (mutationHook) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const [mutate] = mutationHook();

  const execMutation = async (toastMessage, ...args) => {
    setLoading(true);
    let tostId = toast.loading(toastMessage || "Please wait...");

    try {
      let res = await mutate(...args);

      if (res?.data) {
        setData(res.data);

        toast.update(tostId, {
          render: res?.data?.message || "Successfull !!",
          type: "success",
          autoClose: true,
          isLoading: false,
          closeButton: true,
        });
      }

      if (res?.error) {
        // toast.error("error", {id: tostId})

        return toast.update(tostId, {
          render: res?.error?.data?.message || "Something Went Wrong !!",
          type: "error",
          autoClose: true,
          isLoading: false,
          closeButton: true,
        });
      }
    } catch (error) {
      console.log(error);

      return toast.update(tostId, {
        render: error.message || "Something Went Wrong !!",
        type: "error",
        autoClose: true,
        isLoading: false,
        closeButton: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return [execMutation, loading, data];
};

export default useAsyncMutation;
