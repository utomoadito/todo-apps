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

    return { get }

})()

export { apiTodo }