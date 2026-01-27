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
import Header from "@/components/Header";

const API_BASE_URL = "http://192.168.1.112:5000/items"; 
type MenuItem = {
  id: string;
  name: string;
  price: string;
  image_url: string;
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

  // Fetch items from backend
  const fetchMenuItems = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_BASE_URL);
      const data = await res.json();
      setMenuItems(data);
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "Failed to fetch items"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  // Save new item or update existing
  const handleSave = async () => {
    if (!name || !price || !imageUrl) {
      Alert.alert("Validation", "Please fill in Name, Price, and Image URL");
      return;
    }

    try {
      const method = editingItem ? "PUT" : "POST";
      const url = editingItem
        ? `${API_BASE_URL}/${editingItem.id}`
        : API_BASE_URL;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          price,
          description,
          image_url: imageUrl,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to save item");
      }

      setModalVisible(false);
      resetForm();
      fetchMenuItems();
      Alert.alert("Success", editingItem ? "Item updated" : "Item added");
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "Failed to save item"
      );
    }
  };

  // Delete item
  const handleDelete = async (id: string) => {
    Alert.alert("Confirm Delete", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            const res = await fetch(`${API_BASE_URL}/${id}`, {
              method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to delete item");
            fetchMenuItems();
          } catch (error) {
            Alert.alert(
              "Error",
              error instanceof Error ? error.message : "Failed to delete"
            );
          }
        },
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
    setImageUrl(item.image_url);
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
      <Header />
      <Text style={styles.title}>Menu Management</Text>

      <Pressable style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+ Add Menu Item</Text>
      </Pressable>

      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            {item.image_url ? (
              <Image
                source={{ uri: item.image_url }}
                style={{ width: "100%", height: 100, borderRadius: 8, marginBottom: 5 }}
              />
            ) : null}
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
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {editingItem ? "Edit Item" : "Add Item"}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Price"
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
            />
            <TextInput
              style={styles.input}
              placeholder="Image URL"
              value={imageUrl}
              onChangeText={setImageUrl}
            />
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
    margin: 30,
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
