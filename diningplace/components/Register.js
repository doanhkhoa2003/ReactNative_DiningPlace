import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, RadioButton, TextInput } from "react-native-paper";



const Register = () => {
    const [user, setUser] = useState({});
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('user');
    const nav = useNavigation();
    const register = async () => {

    }
    return (
        <View style={{ margin: 20, marginTop: 5 }}>
            <Text style={styles.title}>Đăng ký tài khoản</Text>
            <TextInput
                placeholder="Nhập tên"
                value={firstName}
                onChangeText={(firstName) => setFirstName(firstName)}
                style={styles.input}
            />
            <TextInput
                placeholder="Nhập họ"
                value={lastName}
                onChangeText={(lastName) => setLastName(lastName)}
                style={styles.input}
            />

            <TextInput
                value={user.username}
                onChangeText={t => setUser({ ...user, "username": t })}
                placeholder="Tên đăng nhập"
                style={styles.input}
            />
            <TextInput
                value={user.password}
                onChangeText={t => setUser({ ...user, "password": t })}
                placeholder="Mật khẩu"
                style={styles.input}
            />
            <TextInput
                placeholder="Xác nhận mật khẩu"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                style={styles.input}
            />
            <Text style={{fontSize: 15}}>Chọn vai trò:</Text>
            <RadioButton.Group onValueChange={value => setRole(value)} value={role}>
                <View style={styles.radioItem}>
                    <RadioButton value="user" />
                    <Text>User</Text>
                </View>
                <View style={styles.radioItem}>
                    <RadioButton value="seller" />
                    <Text>Seller</Text>
                </View>
            </RadioButton.Group>
            <Button mode="contained" onPress={register} style={styles.button}>Xác nhận</Button>
        </View>
    );
}


const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
    },
    input: {
        margin: 5,
    },
    button: {
        margin: 10,
        height: 43,
    }, 
    radioItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
});

export default Register;