import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Pressable,
  Alert,
  Modal,
  ActivityIndicator,
  Image,
} from "react-native";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { FIREBASE_DB, FIREBASE_STORAGE } from "@/services/firebase/FirebaseConfig";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Header from "@/components/Header";

type MenuItem = {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  description?: string;
};

export default function MenuManagement() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const menuCollectionRef = collection(FIREBASE_DB, "menuItems");

  // Fetch menu items from Firestore
  const fetchMenuItems = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(menuCollectionRef);
      const items = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as MenuItem)
      );
      setMenuItems(items);
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  // Image Picker
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission Denied", "We need access to your photos to upload.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      // Upload image to Firebase Storage
      const uri = result.assets[0].uri;
      const filename = uri.split("/").pop();
      const storageRef = ref(FIREBASE_STORAGE, `menuImages/${filename}`);
      setUploading(true);
      try {
        const img = await fetch(uri);
        const bytes = await img.blob();
        await uploadBytes(storageRef, bytes);
        const downloadURL = await getDownloadURL(storageRef);
        setImageUrl(downloadURL);
      } catch (error) {
        Alert.alert("Upload Error", error instanceof Error ? error.message : "Failed to upload");
      } finally {
        setUploading(false);
      }
    }
  };

  // Add or Edit menu item
  const handleSave = async () => {
    if (!name || !price || !imageUrl) {
      Alert.alert("Validation", "Please fill in Name, Price, and pick an Image");
      return;
    }

    try {
      if (editingItem) {
        const docRef = doc(FIREBASE_DB, "menuItems", editingItem.id);
        await updateDoc(docRef, { name, price, imageUrl, description });
        Alert.alert("Success", "Menu item updated!");
      } else {
        await addDoc(menuCollectionRef, { name, price, imageUrl, description });
        Alert.alert("Success", "Menu item added!");
      }
      setModalVisible(false);
      resetForm();
      fetchMenuItems();
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  };

  // Delete menu item
  const handleDelete = async (id: string) => {
    Alert.alert("Confirm Delete", "Are you sure you want to delete this item?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: async () => {
          await deleteDoc(doc(FIREBASE_DB, "menuItems", id));
          fetchMenuItems();
        },
        style: "destructive",
      },
    ]);
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setImageUrl("");
    setDescription("");
    setEditingItem(null);
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setName(item.name);
    setPrice(item.price);
    setImageUrl(item.imageUrl);
    setDescription(item.description || "");
    setModalVisible(true);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FB8500" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header></Header>
      <Text style={styles.title}>Menu Management</Text>

      <Pressable style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+ Add Menu Item</Text>
      </Pressable>

      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image
              source={{ uri: item.imageUrl }}
              style={{ width: "100%", height: 100, borderRadius: 8, marginBottom: 5 }}
            />
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>R{item.price}</Text>
            <View style={styles.itemButtons}>
              <Pressable style={styles.editBtn} onPress={() => handleEdit(item)}>
                <Text style={styles.btnText}>Edit</Text>
              </Pressable>
              <Pressable style={styles.deleteBtn} onPress={() => handleDelete(item.id)}>
                <Text style={styles.btnText}>Delete</Text>
              </Pressable>
            </View>
          </View>
        )}
      />

      {/* Modal for Add/Edit */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{editingItem ? "Edit Item" : "Add Item"}</Text>

            <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
            <TextInput
              style={styles.input}
              placeholder="Price"
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
            />
            <Pressable style={styles.imagePickerBtn} onPress={pickImage}>
              <Text style={styles.imagePickerBtnText}>
                {uploading ? "Uploading..." : imageUrl ? "Change Image" : "Pick Image"}
              </Text>
            </Pressable>
            {imageUrl ? <Image source={{ uri: imageUrl }} style={{ width: "100%", height: 100, marginTop: 5 }} /> : null}

            <TextInput
              style={styles.input}
              placeholder="Description (optional)"
              value={description}
              onChangeText={setDescription}
            />

            <Pressable style={styles.saveBtn} onPress={handleSave}>
              <Text style={styles.saveBtnText}>Save</Text>
            </Pressable>
            <Pressable
              style={styles.cancelBtn}
              onPress={() => {
                resetForm();
                setModalVisible(false);
              }}
            >
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  title: { fontSize: 28, fontWeight: "bold", margin: 20 },
  addButton: {
    backgroundColor: "#FB8500",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    margin:30,
  },
  addButtonText: { color: "#fff", fontWeight: "bold" },
  itemContainer: {
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    marginBottom: 10,
  },
  itemName: { fontSize: 18, fontWeight: "bold" },
  itemPrice: { fontSize: 16, fontStyle: "italic", marginBottom: 10 },
  itemButtons: { flexDirection: "row", justifyContent: "space-between" },
  editBtn: {
    backgroundColor: "#00BFFF",
    padding: 8,
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
  },
  deleteBtn: {
    backgroundColor: "#FF4500",
    padding: 8,
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "bold" },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
  },
  modalTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  imagePickerBtn: {
    backgroundColor: "#FB8500",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 5,
  },
  imagePickerBtnText: { color: "#fff", fontWeight: "bold" },
  saveBtn: {
    backgroundColor: "#FB8500",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  saveBtnText: { color: "#fff", fontWeight: "bold" },
  cancelBtn: {
    backgroundColor: "#aaa",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  cancelBtnText: { color: "#fff", fontWeight: "bold" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
});
