import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  Button,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Rating } from "@kolking/react-native-rating";
import ProductDetailModal from "../../components/ProductDetailModal.js";
import { useDispatch, useSelector } from "react-redux";
import {
  setProducts,
  incrementQuantity,
  decrementQuantity,
} from "../../components/redux/productStore.js";

export default function home() {
  const products = useSelector((state) => state.product.products);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    extract();
  }, []);

  const extract = async () => {
    // setLoading(true);
    await fetch("https://fakestoreapi.com/products")
      .then(async (res) => {
        // console.log(res.json().);
        const data = await res.json();
        // console.log(loading);
        // console.log(data.map((i) => ({ ...i, quantity: 0 })));
        dispatch(setProducts(data.map((i) => ({ ...i, quantity: 1 }))));
      })
      .then((r) => {
        setLoading(false);
        // console.log(loading);
        // console.log("product", products);
      })
      .catch((e) => {
        console.log("e", e);
      });
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const title = (i) => {
    if (i.length >= 50) {
      return `${i.slice(0, 50)}...`;
    }
    return i;
  };

  const Item = ({ item }) => (
    <TouchableOpacity onPress={() => openModal(item)}>
      <View style={styles.productItem}>
        <View style={{ margin: 4, width: 120, height: 120 }}>
          <Image
            style={{
              flex: 1,
              resizeMode: "contain",
              width: undefined,
              height: undefined,
            }}
            source={{ uri: item?.image }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 15, fontWeight: "500" }}>
            {title(item?.title)}
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",

              gap: 10,
            }}
          >
            <Rating size={20} rating={Math.round(item?.rating?.rate)} />
            <Text style={{ color: "gray" }}>( {item?.rating?.count} )</Text>
          </View>

          <View style={{ flex: 1, gap: 4 }}>
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>
              Rs. {item?.price}
            </Text>
            <Text style={{ color: "gray" }}>Category: {item?.category}</Text>
          </View>

          {/* <Text>Rs. {item.price}</Text> */}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "#80d9e1",
          padding: 16,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 40,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 30 }}>Shopping</Text>
      </View>
      {loading ? (
        <View
          style={{
            flex: 1,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item?.id?.toString()}
          renderItem={Item}
          refreshing
        />
      )}

      {selectedProduct && (
        <Modal
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <ProductDetailModal
            product={selectedProduct}
            modalView={() => setModalVisible(false)}
          />
          {/* <Button title="close" onPress={() => setModalVisible(false)} /> */}
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    backgroundColor: "white",
  },
  productItem: {
    flexDirection: "row",
    padding: 16,
    overflow: "hidden",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    alignItems: "center",
  },
});
