let currentUser = null;

/* REGISTER */
async function register(username, password){
    const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    return await res.json();
}

/* LOGIN */
async function login(username, password){
    const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if(data.success){
        currentUser = username;
        localStorage.setItem("user", username);
    }

    return data;
}

/* LOGOUT */
function logout(){
    currentUser = null;
    localStorage.removeItem("user");
}

/* CHECK SESSION */
function checkAuth(){
    currentUser = localStorage.getItem("user");
    return currentUser;
}
