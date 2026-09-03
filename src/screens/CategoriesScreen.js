import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  Image,
  ScrollView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Data ko alag file se import kar liya
import { LEFT_CATEGORIES, SUB_CATEGORIES_DATA } from '../data/categoriesData';

export default function CategoriesScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLeftCat, setActiveLeftCat] = useState('1');

  const currentSubCategories = SUB_CATEGORIES_DATA[activeLeftCat] || SUB_CATEGORIES_DATA['1'];

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Search Header */}
      <View style={styles.searchHeader}>
        <View style={styles.searchBar}>
          <TextInput 
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="baby toothbrush"
            placeholderTextColor="#9CA3AF"
          />
          <TouchableOpacity style={styles.cameraIconBtn}>
            <Ionicons name="camera-outline" size={20} color="#4B5563" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.searchIconButton}>
          <Ionicons name="search" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Promotional Banner Info Bar */}
      <View style={styles.infoBar}>
        <View style={styles.infoItem}>
          <Ionicons name="checkmark" size={14} color="#16A34A" />
          <Text style={styles.infoText}> Free shipping</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="checkmark" size={14} color="#16A34A" />
          <Text style={styles.infoText}> Price adjustment within 30 days</Text>
        </View>
        <Ionicons name="chevron-forward" size={14} color="#6B7280" />
      </View>

      {/* Main Body Split Layout */}
      <View style={styles.bodyContainer}>
        {/* Left Vertical Categories Menu */}
        <View style={styles.leftContainer}>
          <FlatList
            data={LEFT_CATEGORIES}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              const isSelected = activeLeftCat === item.id;
              return (
                <TouchableOpacity 
                  style={[styles.leftItem, isSelected && styles.activeLeftItem]}
                  onPress={() => setActiveLeftCat(item.id)}
                >
                  {isSelected && <View style={styles.activeLeftIndicator} />}
                  <Text style={[styles.leftItemText, isSelected && styles.activeLeftItemText]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        {/* Right Sub-Categories Grid */}
        <View style={styles.rightContainer}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 12 }}>
            <View style={styles.gridRow}>
              
              {/* View All Card */}
              <TouchableOpacity 
                style={styles.subCategoryCard}
                onPress={() => navigation.navigate('CategoryProducts', { categoryId: activeLeftCat })}
              >
                <View style={styles.viewAllCircle}>
                  <Ionicons name="grid" size={24} color="#4B5563" />
                </View>
                <Text style={styles.subCatText}>View All</Text>
              </TouchableOpacity>

              {/* Mapped Subcategories */}
              {currentSubCategories.map((sub) => (
                <TouchableOpacity 
                  key={sub.id} 
                  style={styles.subCategoryCard}
                  onPress={() => navigation.navigate('CategoryProducts', { subCategory: sub.name })}
                >
                  <View style={styles.imageContainer}>
                    <Image source={{ uri: sub.image }} style={styles.subCatImage} />
                    {sub.isHot && (
                      <View style={styles.hotBadge}>
                        <Text style={styles.hotText}>HOT</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.subCatText} numberOfLines={2}>{sub.name}</Text>
                </TouchableOpacity>
              ))}

            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  searchHeader: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 24,
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 40,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1F2937',
  },
  cameraIconBtn: {
    padding: 4,
  },
  searchIconButton: {
    width: 40,
    height: 40,
    backgroundColor: '#000000',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FFFBEB',
    borderBottomWidth: 1,
    borderBottomColor: '#FEF3C7',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 11,
    color: '#166534',
    fontWeight: '600',
  },
  bodyContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  leftContainer: {
    width: '32%',
    backgroundColor: '#F9FAFB',
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
  },
  leftItem: {
    paddingVertical: 14,
    paddingHorizontal: 10,
    justifyContent: 'center',
    position: 'relative',
  },
  activeLeftItem: {
    backgroundColor: '#FFFFFF',
  },
  activeLeftIndicator: {
    position: 'absolute',
    left: 0,
    top: 10,
    bottom: 10,
    width: 4,
    backgroundColor: '#F97316',
    borderRadius: 2,
  },
  leftItemText: {
    fontSize: 13,
    color: '#4B5563',
    fontWeight: '500',
  },
  activeLeftItemText: {
    color: '#000000',
    fontWeight: '700',
  },
  rightContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  gridRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  subCategoryCard: {
    width: '31%',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 6,
  },
  subCatImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F3F4F6',
  },
  hotBadge: {
    position: 'absolute',
    top: -2,
    right: -4,
    backgroundColor: '#F97316',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 6,
  },
  hotText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '700',
  },
  subCatText: {
    fontSize: 11,
    color: '#374151',
    textAlign: 'center',
    fontWeight: '500',
  },
});