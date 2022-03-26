import axios from 'axios'

const URL = "http://localhost:8081/payment/"

export const getPayments = async () => {
    const res = await axios.get(URL)
    const payments = res.data
    return payments
}

export const postPayment = async (data) => {
    const res = await axios.post(URL, data)
    return res
}

export const updatePayment = async (idPayment, data) => {
    const res = await axios.put(URL + idPayment, data)
    return res
}

export const deletePayment = async (idPayment,) => {
    const res = await axios.delete(URL  + idPayment)
    return res
}