import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { alertError, alertSuccess, extractErrorMessage } from "../utilities/feedback";


export const fetchArticles = createAsyncThunk('articles/fetchArticles', async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/articles`)
  return res.data
})

export const fetchArticleById = createAsyncThunk('articles/fetchArticlebyId', async (id)=>{
const res = await axios.get(`${import.meta.env.VITE_API_URL}/articles/${id}`)
return res.data

})

export const requestCreatingArticle = createAsyncThunk(
  'articles/requestCreatingArticle',
  async ({ formData, navigate }, { rejectWithValue }) => {
    try {
      const token = localStorage.getArticle("token")
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/articles`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token
          }
        }
      )
      navigate('/')
      return res.data
    } catch (error) {
      const errorMessage = extractErrorMessage(error)
      return rejectWithValue(errorMessage)
    }
  })

export const requestUpdatingArticle = createAsyncThunk(
  'articles/requestUpdatingArticle',
  async ({ id, data, navigate }, { rejectWithValue }) => {
    try {
      const token = localStorage.getArticle("token")
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/articles/${id}`,
        data,
        {
          headers: {
            Authorization: token
          }
        }
      )
      navigate(`/articles/${id}`)
      return res.data
    } catch (error) {
      const errorMessage = extractErrorMessage(error)
      return rejectWithValue(errorMessage)
    }
  })

export const requestDeletingArticle = createAsyncThunk(
  'articles/requestDeletingArticle',
  async ({ id, closeModal }, { rejectWithValue }) => {
    try {
      const token = localStorage.getArticle("token")
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/articles/${id}`,
        {
          headers: {
            Authorization: token
          }
        }
      )
      closeModal()
      return res.data
    } catch (error) {
      const errorMessage = extractErrorMessage(error)
      return rejectWithValue(errorMessage)
    }
  })

export const articleSlice = createSlice({
  name: 'articles',
  initialState: {
    list: [],
    isLoading: false,
    error: null,
    selected: null
  },
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.isLoading = false
        state.list = action.payload
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })

      .addCase(requestCreatingArticle.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(requestCreatingArticle.fulfilled, (state, action) => {
        state.isLoading = false
        state.list.push(action.payload.article)
        alertSuccess(action.payload.message)
      })
      .addCase(requestCreatingArticle.rejected, (state, action) => {
        state.isLoading = false
        const errorMessage = action.payload
        alertError(errorMessage)
        state.error = errorMessage
      })

      .addCase(fetchArticleById.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchArticleById.fulfilled, (state, action) => {
        state.isLoading = false
        state.selected = action.payload
      })
      .addCase(fetchArticleById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })

      .addCase(requestUpdatingArticle.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(requestUpdatingArticle.fulfilled, (state, action) => {
        state.isLoading = false
        state.list = state.list.map(element => element._id === action.payload.article._id ? action.payload.article : element)
        alertSuccess(action.payload.message)
      })
      .addCase(requestUpdatingArticle.rejected, (state, action) => {
        state.isLoading = false
        const errorMessage = action.payload
        alertError(errorMessage)
        state.error = errorMessage
      })

      .addCase(requestDeletingArticle.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(requestDeletingArticle.fulfilled, (state, action) => {
        state.isLoading = false
        state.list = state.list.filter(element => element._id !== action.payload.article._id)
        alertSuccess(action.payload.message)
      })
      .addCase(requestDeletingArticle.rejected, (state, action) => {
        state.isLoading = false
        const errorMessage = action.payload
        alertError(errorMessage)
        state.error = errorMessage
      })
  }
})


export default articleSlice.reducer