const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			isLogin: false,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			APICall: async (url, options) => {
				try {
					const response = await fetch(url,options);
					if (!response.ok) {
						console.log('Error: ' + response.status, response.statusText);
						return response.status;
					}
					return await response.json();
				} catch (error){
					console.error('Error in fetch:', error);
					return null
				}
			},

			Login : async (data) => {
				const options = {
					method: 'POST',
					headers: {
						'Content-type': 'application/json',
					},
					body: JSON.stringify(data)
				}
				const response = await getActions().APICall(process.env.BACKEND_URL + '/api/login/', options);
				if(response.access_token != undefined) {
					getActions().signedIn()
					localStorage.setItem('access_token', response.access_token)
				} else console.error("Algo no va bien")
			},

			signup : async (data) => {
				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				} 
				return await getActions().APICall(process.env.BACKEND_URL + '/api/signup/', options)
			},
			
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},

			signedIn: () => {
				setStore({isLogin: true})
			},

			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
