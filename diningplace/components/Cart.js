import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Card, Text, Button, IconButton } from 'react-native-paper';

const CartScreen = ({ navigation }) => {

  // Giả lập dữ liệu giỏ hàng
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      name: 'BurgerBurger',
      price: 100000,
      quantity: 2,
      image: 'https://images.squarespace-cdn.com/content/v1/53883795e4b016c956b8d243/1551438228969-H0FPV1FO3W5B0QL328AS/chup-anh-thuc-an-1.jpg',
    },
    {
      id: '2',
      name: 'Bánh mì',
      price: 200000,
      quantity: 1,
      image: 'https://beptueu.vn/hinhanh/tintuc/top-15-hinh-anh-mon-an-ngon-viet-nam-khien-ban-khong-the-roi-mat-1.jpg',
    },
  ]);

  // Tăng số lượng sản phẩm
  const handleIncrease = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Giảm số lượng sản phẩm (số lượng không được giảm dưới 1)
  const handleDecrease = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const handleRemove = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Tính tổng tiền giỏ hàng
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity, 0
  );

  // Xử lý thanh toán (ở đây chỉ hiển thị thông báo và điều hướng ví dụ)
  const handleCheckout = () => {
    Alert.alert(
      'Thanh toán',
      `Tổng số tiền: ${totalPrice} đ`,
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Checkout'),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {cartItems.length === 0 ? (
          <Text style={styles.emptyText}>Giỏ hàng trống!</Text>
        ) : (
          cartItems.map((item) => (
            <Card key={item.id} style={styles.card}>
              <Card.Title
                title={item.name}
                subtitle={`Giá: ${item.price} đ`}
              />
              <Card.Cover source={{ uri: item.image }} style={styles.cardImage} />
              <Card.Content>
                <View style={styles.row}>
                  <Text>Số lượng: {item.quantity}</Text>
                  <View style={styles.quantityButtons}>
                    <IconButton
                      icon="minus"
                      size={20}
                      onPress={() => handleDecrease(item.id)}
                    />
                    <IconButton
                      icon="plus"
                      size={20}
                      onPress={() => handleIncrease(item.id)}
                    />
                  </View>
                </View>
              </Card.Content>
              <Card.Actions>
                <Button onPress={() => handleRemove(item.id)}>Xóa</Button>
              </Card.Actions>
            </Card>
          ))
        )}
      </ScrollView>
      {cartItems.length > 0 && (
        <View style={styles.checkoutContainer}>
          <Text style={styles.totalText}>Tổng tiền: {totalPrice} đ</Text>
          <Button mode="contained" onPress={handleCheckout}>
            Thanh toán
          </Button>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f2f2f2',
  },
  card: {
    marginBottom: 10,
  },
  cardImage: {
    height: 150,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
  },
  checkoutContainer: {
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default CartScreen;
