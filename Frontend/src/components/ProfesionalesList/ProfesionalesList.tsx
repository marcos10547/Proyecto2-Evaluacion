"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, Image } from "react-native"
import type { Profesional } from "../../models/Profesional"
import { Star } from "lucide-react-native"

interface ProfesionalesListProps {
  onProfesionalPress: (id: number) => void
}

const ProfesionalesList: React.FC<ProfesionalesListProps> = ({ onProfesionalPress }) => {
  const [profesionales, setProfesionales] = useState<Profesional[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProfesionales()
  }, [])

  const fetchProfesionales = async () => {
    try {
      const response = await fetch("http://192.168.104.77:300/profesionales")
      if (!response.ok) {
        throw new Error(`Error ${response.status}`)
      }
      const data = await response.json()
      setProfesionales(data)
    } catch (error) {
      setError("Error al cargar los profesionales")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const renderProfesional = ({ item }: { item: Profesional }) => (
    <TouchableOpacity style={styles.card} onPress={() => onProfesionalPress(item.id)}>
      <Image source={{ uri: "/placeholder.svg?height=150&width=150" }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.profesionalName}>{item.nombre}</Text>
        <View style={styles.ratingContainer}>
          <Star size={16} color="#FFB800" fill="#FFB800" />
          <Text style={styles.rating}>4.8</Text>
          <Text style={styles.reviews}>(120 reviews)</Text>
        </View>
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>Habilidades: {item.habilidades?.length || 0}</Text>
          <Text style={styles.statsText}>Videos: {item.videos?.length || 0}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0066CC" />
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={profesionales}
      renderItem={renderProfesional}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContainer}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
    />
  )
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 8,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardImage: {
    width: "100%",
    height: 150,
    backgroundColor: "#F5F5F5",
  },
  cardContent: {
    padding: 12,
  },
  profesionalName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  rating: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000000",
    marginLeft: 4,
  },
  reviews: {
    fontSize: 12,
    color: "#666666",
    marginLeft: 4,
  },
  statsContainer: {
    flexDirection: "column",
    gap: 4,
  },
  statsText: {
    fontSize: 12,
    color: "#666666",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 16,
    textAlign: "center",
  },
})

export default ProfesionalesList

