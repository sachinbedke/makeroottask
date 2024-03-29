import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const tempApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/temp", credentials: "include" }),
    tagTypes: ["temp"],
    endpoints: (builder) => {
        return {
            getAllTemps: builder.query({
                query: () => {
                    return {
                        url: "/",
                        method: "GET"
                    }
                },
                transformResponse: data => data.result,
                providesTags: ["temp"]
            }),
            AddTempleInfo: builder.mutation({
                query: tempdata => {
                    console.log(tempdata);
                    return {
                        url: "/add",
                        method: "POST",
                        body: tempdata
                    }
                },
                invalidatesTags: ["temp"]
            }),

        }
    }
})

export const { useAddTempleInfoMutation, useGetAllTempsQuery } = tempApi
