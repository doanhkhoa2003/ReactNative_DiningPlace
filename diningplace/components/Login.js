import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

const Login = () => {
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [user, setUser] = useState({});

    const nav = useNavigation();

    return (
        <View style={{margin: 20, marginTop: 120}}>
            <Text style={styles.title}>Đăng Nhập</Text>
            <TextInput
                value={user.username}
                onChangeText={t => setUser({...user, "username": t})}
                placeholder="Tên đăng nhập"
                style={styles.input}
            />
            <TextInput
                value={user.password}
                onChangeText={t => setUser({...user, "password": t})}
                placeholder="Mật khẩu"
                secureTextEntry={secureTextEntry}
                style={styles.input}
                right={<TextInput.Icon icon={secureTextEntry ? 'eye-off' : 'eye'} onPress={() => setSecureTextEntry(!secureTextEntry)} />}
            />
            <Button mode="contained" style={styles.button}>Đăng nhập</Button>
            <Button mode="text" onPress={() => nav.navigate('Register') }>Chưa có tài khoản? Hãy đăng ký ngay!</Button>
        </View>
    );
};

const styles = StyleSheet.create({
      title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 20,
      },
      input: {
        margin: 10,
      },
      button: {
        margin: 15,
        height: 43,
      },
});

export default Login;