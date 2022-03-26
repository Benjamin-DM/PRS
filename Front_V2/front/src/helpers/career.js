import axios from 'axios'

const URL = "http://localhost:9091/repository/career";

export const getCareers = async () => {
    const res = await axios.get(URL);
    const careers = res.data
    return careers
}

export const postCareer = async (data) => {
    const res = await axios.post(URL, data)
    return res
}

export const deleteCareer = async (idCareer) => {
    const res = await axios.delete(URL + "/" + idCareer)
    return res
}

export const updateCareer = async (idCareer, data) => {
    const res = await axios.put(URL + "/" + idCareer, data)
    return res
}