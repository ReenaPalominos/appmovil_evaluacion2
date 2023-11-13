import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, View, Text, Button, Image, StyleSheet } from 'react-native';
import { FakeStore } from '../interfaces/fakestore.interface';
import { getProducts } from '../services/fakestore.service';
import Loading from '../components/Loading';
import Error from '../components/Error';

export type Orden = 'asc' | 'desc';

const Body = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState<FakeStore[]>([]);
  const [ordenDatos, setOrdenDatos] = useState<Orden>('asc');

  useEffect(() => {
    console.log('inicio');
    if (!loading) {
      console.log('cargando');
      getData();
      setOrdenDatos('asc');
    }
    console.log('fin');
  }, []);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await getProducts();
      const productsData = response.data;
      console.log(productsData);
      setProducts(productsData);
      setLoading(false);
      console.log('products:', products);
      setError(false);
    } catch (error) {
      setError(true);
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    console.log('ordenando');
    if (ordenDatos === 'asc') {
      const productosOrdenados = [...products].sort((a, b) => {
        return a.price - b.price;
      });
      setProducts(productosOrdenados);
    } else {
      const productosOrdenados = [...products].sort((a, b) => {
        return b.price - a.price;
      });
      setProducts(productosOrdenados);
    }
  }, [ordenDatos]);

  return (
    <>
    <StatusBar />
    <ScrollView style={styles.container}>
    <View>
      <Text style={styles.title}>Lista de Productos</Text>
      <View style={styles.buttonContainer}>
      {ordenDatos === 'asc' ? (
        <Button title="Descendente" onPress={() => setOrdenDatos('desc')} />
      ) : (
        <Button title="Ascendente" onPress={() => setOrdenDatos('asc')} />
      )}
    </View>
      {loading ? (
        <Loading />
      ) : error ? (
        <Error />
      ) : (
        <View>
          <View style={styles.tableHeader}>
            <Text>ID</Text>
            <Text>Nombre</Text>
            <Text>Precio</Text>
            <Text>Imagen</Text>
          </View>
          {products ? (
            products.map((product, index) => (
              <View style={styles.tableRow} key={index}>
                <Text>{product.id}</Text>
                <Text style={styles.text}>{product.title}</Text>
                <Text>{product.price}</Text>
                <Image source={{ uri: product.image }} style={styles.image} />
              </View>
            ))
          ) : (
            <Text />
          )}
        </View>
      )}
    </View>
    </ScrollView>
    </>
    );
};

const styles = StyleSheet.create({
  container: {
    padding:20,
  },
  text: {
    width: 100,
  },
  buttonContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    alignSelf: 'flex-end',
  },
  title:{
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    paddingTop: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
  image: {
    width: 50,
    height: 50,
  },
});

export default Body;
