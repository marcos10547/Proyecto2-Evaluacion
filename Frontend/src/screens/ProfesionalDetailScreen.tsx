"use client"

import type React from "react"
import { useEffect, useState } from "react"
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native"
import type { RouteProp } from "@react-navigation/native"
import type { RootStackParamList } from "../navigation/RootStack"
import type { Profesional } from "../models/Profesional"
import { Heart, Star, ChevronLeft } from "lucide-react-native"

const { width } = Dimensions.get("window")

type ProfesionalDetailScreenProps = {
  route: RouteProp<RootStackParamList, "ProfesionalDetail">
  navigation: any
}

const ProfesionalDetailScreen: React.FC<ProfesionalDetailScreenProps> = ({ route, navigation }) => {
  const { id } = route.params
  const [profesional, setProfesional] = useState<Profesional | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProfesional()
  }, [])

  const fetchProfesional = async () => {
    try {
      const response = await fetch(`http://192.168.104.77:300/profesionales/${id}`)
      if (!response.ok) {
        throw new Error(`Error ${response.status}`)
      }
      const data = await response.json()
      setProfesional(data)
    } catch (error) {
      setError("Error al cargar el detalle del profesional")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0066CC" />
      </View>
    )
  }

  if (error || !profesional) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error || "No se encontró el profesional"}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header con imagen */}
        <View style={styles.header}>
          <Image source={{ uri: "/placeholder.svg?height=400&width=400" }} style={styles.headerImage} />
          <View style={styles.headerOverlay}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <ChevronLeft size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.heartButton}>
              <Heart size={24} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Contenido */}
        <View style={styles.content}>
          <View style={styles.titleSection}>
            <Text style={styles.name}>{profesional.nombre}</Text>
            <View style={styles.ratingContainer}>
              <Star size={20} color="#FFB800" fill="#FFB800" />
              <Text style={styles.rating}>4.8</Text>
              <Text style={styles.reviews}>(120 reviews)</Text>
            </View>
          </View>

          {/* Habilidades */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Habilidades</Text>
            <View style={styles.skillsGrid}>
              {profesional.habilidades?.map((habilidad) => (
                <View key={habilidad.id} style={styles.skillChip}>
                  <Text style={styles.skillText}>{habilidad.nombre}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Videos */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Videos</Text>
            <View style={styles.videosContainer}>
              {profesional.videos?.map((video) => (
                <View key={video.id} style={styles.videoCard}>
                  <Image source={{ uri: "/placeholder.svg?height=200&width=200" }} style={styles.videoThumbnail} />
                  <Text style={styles.videoTitle}>{video.titulo}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Botones de acción */}
      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.messageButton}>
          <Text style={styles.messageButtonText}>Enviar mensaje</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactButton}>
          <Text style={styles.contactButtonText}>Contactar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    position: "relative",
    width: "100%",
    height: width * 0.8,
  },
  headerImage: {
    width: "100%",
    height: "100%",
  },
  headerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  backButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 8,
  },
  heartButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 8,
  },
  content: {
    padding: 16,
  },
  titleSection: {
    marginBottom: 24,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    marginLeft: 4,
  },
  reviews: {
    fontSize: 14,
    color: "#666666",
    marginLeft: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 16,
  },
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  skillChip: {
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  skillText: {
    fontSize: 14,
    color: "#000000",
  },
  videosContainer: {
    gap: 16,
  },
  videoCard: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    overflow: "hidden",
  },
  videoThumbnail: {
    width: "100%",
    height: 200,
  },
  videoTitle: {
    padding: 12,
    fontSize: 16,
    fontWeight: "500",
    color: "#000000",
  },
  bottomActions: {
    flexDirection: "row",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#F2F2F2",
    gap: 12,
  },
  messageButton: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  messageButtonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "600",
  },
  contactButton: {
    flex: 1,
    backgroundColor: "#0066CC",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  contactButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
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

export default ProfesionalDetailScreen

