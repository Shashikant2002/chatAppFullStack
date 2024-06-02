import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../../config";
import axios from "axios";

export const fetchMe = createAsyncThunk(
  "user/fetchMe",
  async ({}, { rejectWithValue }) => {
    try {
      const url = `${baseUrl}/api/v1/me`;
      const res = await axios.get(url, { withCredentials: true });

      return res.data;
    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const url = `${baseUrl}/api/v1/login`;
      const res = await axios.post(
        url,
        { email, password },
        { withCredentials: true }
      );

      return res.data;
    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

export const logoutMe = createAsyncThunk(
  "user/logoutMe",
  async ({}, { rejectWithValue }) => {
    try {
      const url = `${baseUrl}/api/v1/logout`;
      const res = await axios.get(url, { withCredentials: true });

      return res.data;
    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ name, email, avatar, password, cPassword }, { rejectWithValue }) => {
    try {
      let formData = new FormData();

      formData.append("avatar", avatar);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("cPassword", cPassword);

      const url = `${baseUrl}/api/v1/register`;
      const res = await axios.post(url, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data;
    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);
