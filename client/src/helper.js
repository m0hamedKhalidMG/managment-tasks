import axios from 'axios'
const savedToken = localStorage.getItem("token");
let headers = {};

if (savedToken) {
    try {
        const parsedToken = JSON.parse(savedToken);
        console.log(parsedToken.token);
        headers = {
            Authorization: `Bearer ${parsedToken.token}`,
            "Content-Type": "application/json", // For example, if you are sending JSON data
        };
    } catch (error) {
        console.error("Error parsing JSON from localStorage:", error);
    }
}

export async function getServerData(url, callback){
    const data = await (await axios.get(url,{ headers }))?.data;
    return callback ? callback(data) : data;
}


export async function postServerData(url, result, callback){
    const data = await (await axios.post(url, result,{ headers }))?.data;
    return callback ? callback(data) : data;
}



export async function puttask(url,result,callback){
    const data=await(await axios.put(url,result,{ headers }))?.data;
    return callback ? callback(data) : data;

}
export async function deletetask(url, callback){
    const data = await (await axios.delete(url,{ headers }))?.data;
    return callback ? callback(data) : data;
}


export async function login(url,result,callback){
    const data=await(await axios.post(url,result,{ headers }))?.data;
    if(data)
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

    return callback ? callback(data) : data;

}
export async function logout(url,callback){
    const data=await(await axios.get(url,{ headers }))?.data;
    return callback ? callback(data) : data;

}
export async function SignUp(url,result,callback){
    const data=await(await axios.post(url,result))?.data;
    return callback ? callback(data) : data;

}