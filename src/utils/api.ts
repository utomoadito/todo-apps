import axios, { AxiosResponse } from 'axios'

const apiTodo = (() => {
    const processRequest = (request: Promise<any>) => {
		return new Promise((resolve, reject) => {
			request.then((response: AxiosResponse) => {
                resolve(response.data)
            }).catch(error => {
                reject(error.response)
            })
		})
	}

	const http = axios.create({
		baseURL: process.env.VUE_APP_FAKE_API
	})

    const get = (endpoint: string) => {
		return processRequest(
			http.get(endpoint)
		)
	}

	const post = (endpoint: string, payload: any) => {
		return processRequest(
			http.post(endpoint, payload)
		)
	}

	const put = (endpoint: string, payload: any) => {
		return processRequest(
			http.put(endpoint, payload)
		)
	}

	const del = (endpoint: string) => {
		return processRequest(
			http.delete(endpoint)
		)
	}

    return { get, post, put, del }

})()

export { apiTodo }