"use client"
import React from "react"

import { useState, useEffect } from "react"
import { View, Text, TextInput, Button, FlatList, Alert, StyleSheet } from "react-native"

interface Profesional {
  id: number
  nombre: string
  // Añade otros campos según tu entidad Profesional
}

const GestionProfesionales = () => {
  const [profesionales, setProfesionales] = useState<Profesional[]>([])
  const [nombre, setNombre] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)

  const fetchProfesionales = async () => {
    try {
      const response = await fetch("http://192.168.104.77:300/profesionales")
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setProfesionales(data)
    } catch (error) {
      console.error("Error al obtener profesionales:", error)
      Alert.alert("Error", "No se pudieron cargar los profesionales")
    }
  }

  useEffect(() => {
    fetchProfesionales()
  }, [])

  const handleCrear = async () => {
    try {
      const response = await fetch("http://192.168.104.77:300/profesionales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre }),
      })
      if (!response.ok) {
        const errorData = await response.json()
        const errorMessage = errorData.message || "No se pudo crear el profesional"
        throw new Error(errorMessage)
      }
      setNombre("")
      fetchProfesionales()
      Alert.alert("Éxito", "Profesional creado correctamente")
    } catch (error) {
      console.error("Error al crear profesional:", error)
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      Alert.alert("Error", `Ocurrió un error al crear el profesional: ${errorMessage}`)
    }
  }

  const handleActualizar = async () => {
    if (editingId === null) return
    try {
      const response = await fetch(`http://192.168.104.77:300/profesionales/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre }),
      })
      if (!response.ok) {
        const errorData = await response.json()
        const errorMessage = errorData.message || "No se pudo actualizar el profesional"
        throw new Error(errorMessage)
      }
      setNombre("")
      setEditingId(null)
      fetchProfesionales()
      Alert.alert("Éxito", "Profesional actualizado correctamente")
    } catch (error) {
      console.error("Error al actualizar profesional:", error)
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      Alert.alert("Error", `Ocurrió un error al actualizar el profesional: ${errorMessage}`)
    }
  }

  const handleEliminar = async (id: number) => {
    try {
      const response = await fetch(`http://192.168.104.77:300/profesionales/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) {
        const errorData = await response.json()
        const errorMessage = errorData.message || "No se pudo eliminar el profesional"
        throw new Error(errorMessage)
      }
      fetchProfesionales()
      Alert.alert("Éxito", "Profesional eliminado correctamente")
    } catch (error) {
      console.error("Error al eliminar profesional:", error)
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      Alert.alert("Error", `Ocurrió un error al eliminar el profesional: ${errorMessage}`)
    }
  }

  const renderItem = ({ item }: { item: Profesional }) => (
    <View style={styles.item}>
      <Text>{item.nombre}</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Editar"
          onPress={() => {
            setNombre(item.nombre)
            setEditingId(item.id)
          }}
        />
        <Button title="Eliminar" onPress={() => handleEliminar(item.id)} color="red" />
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Nombre del profesional" value={nombre} onChangeText={setNombre} />
      <Button
        title={editingId ? "Actualizar Profesional" : "Crear Profesional"}
        onPress={editingId ? handleActualizar : handleCrear}
      />
      {editingId && (
        <Button
          title="Cancelar Edición"
          onPress={() => {
            setNombre("")
            setEditingId(null)
          }}
          color="gray"
        />
      )}
      <FlatList data={profesionales} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  buttonContainer: {
    flexDirection: "row",
  },
})

export default GestionProfesionales

