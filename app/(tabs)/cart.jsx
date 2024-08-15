import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeCart } from "../../components/redux/cart";
import AntDesign from "@expo/vector-icons/AntDesign";

// import { updateCartQuantity } from "../../components/redux/cart";
import { Rating } from "@kolking/react-native-rating";
import { FontAwesome } from "@expo/vector-icons";

export default function cart() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const [check, setCheck] = useState(false);

  useEffect(() => {
    console.log("cartItems", cartItems[0]);
    if (cartItems.length === 0) {
      setCheck(true);
    }
  }, [cartItems, dispatch]);

  const title = (i) => {
    if (i.length >= 50) {
      return `${i.slice(0, 50)}...`;
    }
    return i;
  };

  const decrement = (item) => {
    if (item?.quantity > 1) {
      //   setQuantity(item?.quantity - 1);
      //   dispatch(decrementQuantity(item?.id));
      console.log("dispatching d");
      dispatch(addToCart({ ...item, quantity: item?.quantity - 1 }));
    }
  };

  const increment = (item) => {
    // setQuantity(item?.quantity + 1);
    // dispatch(incrementQuantity(item?.id));
    console.log("dispatching i");
    dispatch(addToCart({ ...item, quantity: item?.quantity + 1 }));
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.productItem}>
      <View style={{ margin: 4, width: 140, height: 120 }}>
        <Image
          style={{
            flex: 1,
            resizeMode: "contain",
          }}
          source={{ uri: item?.image }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "500" }}>
            {title(item?.title)}
          </Text>
          <TouchableOpacity onPress={() => dispatch(removeCart(item))}>
            <AntDesign name="delete" size={24} color="black" />
          </TouchableOpacity>
        </View>
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

        <View
          style={{
            flexDirection: "row",
            flex: 1,
            gap: 10,
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => decrement(item)}>
            <View style={styles.button}>
              <FontAwesome name="minus" size={24} color="black" />
            </View>
          </TouchableOpacity>
          <Text>{item?.quantity}</Text>
          <TouchableOpacity onPress={() => increment(item)}>
            <View style={styles.button}>
              <FontAwesome name="plus" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>

        {/* <Text>Rs. {item.price}</Text> */}
      </View>
    </View>
  );

  // <View style={styles.cartItem}>
  //   <Text>
  //     {item.title} - Quantity: {item.quantity}
  //   </Text>
  //   {/* <Button
  //     title="Remove"
  //     onPress={() => dispatch(removeFromCart(item.id))}
  //   /> */}
  // </View>

  return check ? (
    <View
      style={{
        height: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 40, fontWeight: "bold", color: "#a7abb7" }}>
        No Item Found!
      </Text>
    </View>
  ) : (
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
        <Text style={{ fontWeight: "bold", fontSize: 30 }}>Cart</Text>
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item?.id.toString()}
        renderItem={renderItem}
      />
      {/* <Button title="Go Back" onPress={() => navigation.goBack()} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  productItem: {
    flexDirection: "row",
    padding: 16,
    overflow: "hidden",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  cartItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
