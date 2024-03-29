import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAddTempleInfoMutation, useGetAllTempsQuery } from '../redux/tempApi';

const Home = () => {
    const [addInfo, { isSuccess, isError, error }] = useAddTempleInfoMutation()
    const { data } = useGetAllTempsQuery()
    const [formData, setFormData] = useState({
        templeName: '',
        address: '',
        contactPerson: '',
        phoneNumber: '',
        altPhoneNumber: '',
        templeDetails: '',
        tempImage: "",
        tempVideo: ""
    });
    // console.log(data, "slkdfksndfksndf");

    const [image, setImage] = useState(null);
    const [video, setvideo] = useState()

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });

        // console.log(result);

        if (!result.canceled) {
            setFormData({ ...formData, tempImage: result.assets[0].uri });
        }
    };
    const pickVideo = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        // console.log(result);

        if (!result.canceled) {
            setFormData({ ...formData, tempVideo: result.assets[0].uri });
        }
    };
    const handleSubmit = () => {
        // Perform validations
        const { phoneNumber, altPhoneNumber, email } = formData;

        // Phone number, email, and alternative phone number format validation
        const phoneRegex = /^[0-9]{10}$/; // 10-digit phone number format

        if (!phoneRegex.test(phoneNumber) || !phoneRegex.test(altPhoneNumber)) {
            Alert.alert('Validation Error', 'Please enter valid phone numbers (10 digits only).');
            return;
        }




        // Unique validation for phone number and alternative phone number
        if (phoneNumber === altPhoneNumber) {
            Alert.alert('Validation Error', 'Phone number and alternative phone number must be different.');
            return;
        }

        // Perform form submission if validations pass
        const fd = new FormData()
        fd.append("templeName", formData.templeName)
        fd.append("address", formData.address)
        fd.append("contactPerson", formData.contactPerson)
        fd.append("phoneNumber", formData.phoneNumber)
        fd.append("altPhoneNumber", formData.altPhoneNumber)
        fd.append("templeDetails", formData.templeDetails)
        fd.append("tempImage", formData.tempImage)
        fd.append("tempVideo", formData.tempVideo)
        console.log(fd);
        addInfo(fd)
        console.log("form submit Success");

    };

    // console.log(image, "skdflsdflsdklf");
    // console.log(formData);
    console.log(error);
    useEffect(() => {
        if (isSuccess) {
            Alert.alert("form Data Send Success")
            console.log("form Data Send Success");
        }
    }, [isSuccess])
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Temple Name"

                value={formData.templeName}
                onChangeText={text => setFormData({ ...formData, templeName: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Address"
                value={formData.address}
                onChangeText={text => setFormData({ ...formData, address: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Contact Person Name"
                value={formData.contactPerson}
                onChangeText={text => setFormData({ ...formData, contactPerson: text })}
            />
            <TextInput
                keyboardType='numeric'
                style={styles.input}
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChangeText={text => setFormData({ ...formData, phoneNumber: text })}

            />
            <TextInput
                style={styles.input}
                placeholder="Alternative Number"
                value={formData.altPhoneNumber}
                onChangeText={text => setFormData({ ...formData, altPhoneNumber: text })}
                keyboardType="phone-pad"
            />
            <TextInput
                style={[styles.input, styles.multilineInput]}
                placeholder="Details of the Temple"
                value={formData.templeDetails}
                onChangeText={text => setFormData({ ...formData, templeDetails: text })}
                multiline
                numberOfLines={4}
            />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button title="Pick an image from camera roll" onPress={pickImage} />
                {image && <Image source={{ uri: image }} resizeMode='cover' style={styles.image} />}
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button title="Pick an Videos from camera roll" onPress={pickVideo} />
            </View>
            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flex: 1,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    multilineInput: {
        height: 80,
    },
    image: {
        width: 200, // Adjust width as needed
        height: 200, // Adjust height as needed
        borderRadius: 10, // Optional: Adds border radius to the image
    }
});

export default Home;
