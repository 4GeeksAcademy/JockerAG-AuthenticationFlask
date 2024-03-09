const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			isLogin: false,
			user:{},
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
					throw error; 
					
				}
			},
			logout: ()  => {
				setStore({isLogin: false});
				localStorage.removeItem('access_token')
			},

			userInfo: async () =>{
				const url = process.env.BACKEND_URL + '/api/perfil'
				const options = {
					method: 'GET',
					headers: {
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					}
				}
				const response = await fetch(url,options);
				if(!response.ok) {
					console.log('error: ', response.status, response.statusText);
					return
				}
				const data = await response.json();
				console.log(data);
				actions.setMessage(data.message)
			},
			

			login : async (data) => {
				const options = {
					method: 'POST',
					headers: {
						'Content-type': 'application/json',
						
					},
					body: JSON.stringify(data)
				}
				const response = await getActions().APICall(process.env.BACKEND_URL + '/api/login/', options);
				console.log(response.results);
				console.log(response);
				if(response.access_token != undefined) {
					getActions().signedIn(response.results);
					localStorage.setItem('access_token', response.access_token)
				} else console.error("Algo no va bien")
			},

			signup : async (data) => {
				const url = process.env.BACKEND_URL + '/api/register/'
				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				} 
				return await getActions().APICall(url, options)
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

			signedIn: (data) => {
				setStore({isLogin: true, user: data});
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
