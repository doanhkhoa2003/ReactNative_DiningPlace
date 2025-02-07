import { useEffect, useState } from "react";
import APIs, { endpoints } from "../configs/APIs";
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, Chip, List, Searchbar, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
    const [categories, setCategories] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cateId, setCateId] = useState(null);

    const nav = useNavigation();
    const loadCates = async () => {
        let res = await APIs.get(endpoints['categories']);
        //console.info(res.data);
        setCategories(res.data);
    }

    const loadFoods = async () => {
        setLoading(true);
        try {
            //let url = `${endpoints['courses']}?page=${page}`;
            let url = endpoints['courses'];
            if (cateId)
                url = `${url}?category_id=${cateId}`;

            let res = await APIs.get(url);
            //console.info(res.data);
            setFoods(res.data.results); //co phan trang thi . them cai
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadCates();
    }, [])

    useEffect(() => {
        loadFoods();
    }, [cateId, searchText])

    return (

        <View style={styles.container}>

            {/* <TextInput
                style={styles.text}
                placeholder="Tên món ăn hoặc cửa hàng"
                value={searchText}
                onChangeText={searchText => setSearchText(searchText)}
                left={<TextInput.Icon icon="magnify" />}
            /> */}
            <Searchbar
                placeholder="Tên món ăn hoặc cửa hàng"
                onChangeText={searchText => setSearchText(searchText)}
                value={searchText}
                style={styles.text}
            />
            <Text style={styles.title}>DANH MỤC MÓN ĂN</Text>
            {/*Tao button*/}
            <TouchableOpacity style={styles.button} onPress={() => setIsOpen(!isOpen)}>
                <Text style={styles.buttonText}>{isOpen ? "Ẩn danh mục" : "Hiện danh mục"}</Text>
            </TouchableOpacity>
            {/*An button chuyen state */}
            {isOpen && (
                <View>
                    <TouchableOpacity onPress={() => setCateId(null)}><Chip icon="label">Tất cả</Chip></TouchableOpacity>
                    <FlatList
                        data={categories}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <View>
                                <TouchableOpacity onPress={() => setCateId(item.id)}><Chip icon="label" key={item.id}>{item.name}</Chip></TouchableOpacity>
                            </View>
                        )}
                    />
                </View>
            )}
            {loading && <ActivityIndicator />}

            <ScrollView style={{ margin: 5 }}>
                {foods.map(c => <List.Item
                    key={c.id}
                    title={c.subject}
                    description={c.created_date}
                    left={() => <TouchableOpacity onPress={() => nav.navigate('FoodDetail')}><Image style={styles.box} source={{ uri: c.image }} /></TouchableOpacity>}
                />)}
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: "bold",
        margin: 10,
    }, container: {
        marginTop: 20,
    }, text: {
        fontSize: 15,
        margin: 15,
    }, button: {
        backgroundColor: "#007BFF",
        padding: 10,
        borderRadius: 5,
    }, buttonText: {
        color: "#fff",
        fontSize: 16,
    }, box: {
        width: 80,
        height: 80,
        borderRadius: 10,
    }
});

export default Home;