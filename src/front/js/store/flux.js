
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			pets: null,
			token: "",
			user: ""

		},
		actions: {

			isLoggedIn: () => {
				const token = localStorage.getItem("token");
				return (token && token !== "");
			},

			getUserIdFromToken: () => {
				const target_user_id = localStorage.getItem("user_id");
				if(target_user_id) return(target_user_id);
				return null;
			},

			registerNewUser: async (credentials) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "api/users", {
						method: "POST",
						headers: {
							"Content-type": "application/json"
						},
						body: JSON.stringify(credentials)
					});
					if (response.ok) {
						console.log("user sucessfully created");
						return true;
					}
				} catch (error) {
					console.error("Error registering user:", error);
					return false;
				}
			},

			handleLogin: async (credentials) => {
				const response = await fetch(process.env.BACKEND_URL + "api/login", {
					method: "POST",
					headers: {
						"Content-type": "application/json",
					},
					body: JSON.stringify(credentials),
				});
				try {
					if (response.ok) {
						const data = await response.json();
						localStorage.setItem("token", data.token);
						localStorage.setItem("user_id", data.user_id);
						setStore({ token: data.token, user: credentials.email });
						return true;
					} else {
						console.log("Unable to retrieve token");
						return false;
					}
				} catch (error) {
					console.error("Error logging in:", error);
					return false;
				}
			},

			handleLogOut: () => {
				setStore({ user: "", token: "" });
				localStorage.removeItem("token");
				localStorage.removeItem("user_id");
				return true;
			},

			getAllPets: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "api/pets", {
						method: "GET",
						headers: {
							"Authorization": "Bearer " + localStorage.getItem("token")
						}
					});
					const data = await response.json();
					setStore({ pets: data.pets });
				}
				catch (error) {
					console.log("Error fecthing Pet data:", error);
				}
			},

			getAllPetsByCurrentUser: async () => {
				const userId = getActions().getUserIdFromToken();
				try {
					const response = await fetch(process.env.BACKEND_URL + "api/pets/" + userId, {
						method: "GET",
						headers: {
							"Authorization": "Bearer " + localStorage.getItem("token")
						}
					});
					const data = await response.json();
					setStore({ pets: data.pets });
				}
				catch (error) {
					console.log("Error fetching Pet data:", error);
				}
			},
			
		}
	};
};

export default getState;
