import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Button,
  StyleSheet,
  ScrollView,
  Pressable,
  ToastAndroid,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Rating } from "@kolking/react-native-rating";
import { addToCart } from "../components/redux/cart";

export default function ProductDetailModal({ product, modalView }) {
  useEffect(() => {
    console.log("product", product);
  }, []);

  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      // dispatch(decrementQuantity(product?.id));
    }
  };

  const increment = () => {
    setQuantity(quantity + 1);
    // dispatch(incrementQuantity(product?.id));
  };

  const addCart = async () => {
    setTimeout(() => {
      dispatch(
        addToCart({
          id: product.id,
          title: product.title,
          quantity: quantity,
          price: product?.price,
          description: product?.description,
          category: product?.category,
          image: product?.image,
          rating: {
            rate: product?.rating?.rate,
            count: product?.rating?.count,
          },
        })
      );
    }, 100);

    ToastAndroid.show("Cart Added", ToastAndroid.LONG);
    modalView();
  };

  return (
    <ScrollView>
      <Pressable
        onPress={() => {
          modalView();
        }}
        style={{
          margin: 10,
          flexDirection: "row",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Entypo name="squared-cross" size={40} color="black" />
        <Text style={{ color: "gray", fontSize: 10 }}>Close Modal</Text>
      </Pressable>
      <View style={styles.modalContainer}>
        <View style={styles.modalImage}>
          <Image
            style={{ flex: 1, resizeMode: "contain" }}
            source={{ uri: product?.image }}
          />
        </View>

        <View style={styles.modalDetail}>
          <Text style={styles.modalTitle}>{product?.title}</Text>
          <View
            style={{
              width: "100%",
              paddingHorizontal: 20,
              flexDirection: "row",
              flex: 1,
              justifyContent: "space-between",
              alignItems: "center",
              marginVertical: 20,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Rs.{product?.price}
            </Text>
            <Rating size={20} rating={Math.round(product?.rating?.rate)} />
          </View>
          <View style={styles.description}>
            <Text style={{ fontSize: 15 }}>Description:</Text>
            <Text style={{ flex: 1, flexWrap: "wrap", fontSize: 15 }}>
              {product?.description}
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
          <Text style={{ marginRight: 20, fontSize: 16 }}>Quantity:</Text>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              gap: 20,
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={decrement}>
              <View style={styles.button}>
                <FontAwesome name="minus" size={24} color="black" />
              </View>
            </TouchableOpacity>
            <Text>{quantity}</Text>
            <TouchableOpacity onPress={increment}>
              <View style={styles.button}>
                <FontAwesome name="plus" size={24} color="black" />
              </View>
            </TouchableOpacity>
          </View>

          {/* <Button
          title="+"
          onPress={() => dispatch(incrementQuantity(item.id))}
        />
        <Button
          title="-"
          onPress={() => dispatch(decrementQuantity(item.id))}
        /> */}
        </View>
      </View>
      {/* add cart */}
      <TouchableOpacity onPress={addCart}>
        <View style={styles.cartButton}>
          <Text>Add to Cart</Text>
        </View>
      </TouchableOpacity>
      {/* cart end */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },

  modalDetail: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },

  modalTitle: {
    fontSize: 24,
    marginBottom: 16,
    flex: 1,
    justifyContent: "center",
  },

  modalImage: {
    flex: 1,
    justifyContent: "center",
    width: 300,
    height: 300,
  },

  description: {
    width: "100%",
    flexDirection: "row",
    // flexWrap: "wrap",
    flex: 1,
    gap: 5,
    padding: 5,
  },

  dSize: {
    fontSize: 20,
  },

  button: {
    padding: 5,
    paddingHorizontal: 10,
    backgroundColor: "#dddddd",
    borderRadius: 10,
  },

  cartButton: {
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: "#80d9e1",
  },
});
