import axios from 'axios';
import { FakeStore } from '../interfaces/fakestore.interface';

export const getProducts = () => {
    return axios.get<FakeStore[]>(`https://fakestoreapi.com/products`);
}
