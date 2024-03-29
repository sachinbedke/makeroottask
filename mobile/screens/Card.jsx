import React from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { useGetAllTempsQuery } from '../redux/tempApi';

const Card = () => {
    const { data } = useGetAllTempsQuery();
    console.log(data);
    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemHeading}>{item.templeName}</Text>
            <Text style={styles.itemText}>Address: {item.address}</Text>
            <Text style={styles.itemText}>Contact Person: {item.contactPerson}</Text>
            <Text style={styles.itemText}>Phone Number: {item.phoneNumber}</Text>
            <Text style={styles.itemText}>Alt Phone Number: {item.altPhoneNumber}</Text>
            <Text style={styles.itemText}>Temple Details: {item.templeDetails}</Text>
            <Text style={styles.itemText}>Created At: {item.createdAt}</Text>
            <Image source={item.tempImage} style={styles.image} />
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Temple List</Text>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item._id.toString()}
            />
        </View>
    );
};

export default Card;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f0f0f0',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    itemContainer: {
        backgroundColor: '#ffffff',
        padding: 12,
        marginBottom: 8,
        borderRadius: 8,
    },
    itemHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    itemText: {
        fontSize: 16,
        marginBottom: 4,
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'cover', // or 'contain' for different image resizing behavior
    }
});
