import { useEffect } from "react";
import { toast } from "react-toastify";

const useError = (errors = []) => {
  useEffect(() => {
    errors?.forEach(({ isError, error, fallBack }) => {
      if (isError) {
        if (fallBack) {
          fallBack();
        } else {
          toast.error(error?.data?.message || "Some Thing Went Wrong !!");
        }
      }
    });
  }, [errors]);

};

export default useError;
