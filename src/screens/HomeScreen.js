import React, { useState, useContext } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  ScrollView,
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ProductCard from '../components/ProductCard';
import { TOP_CATEGORIES, SUB_CATEGORIES, PRODUCTS } from '../api/mockData';
import { CartContext } from '../context/CartContext';

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTopCat, setActiveTopCat] = useState('1');
  const [activeSubCat, setActiveSubCat] = useState('s1');

  // Cart Context se addToCart function nikala
  const { addToCart } = useContext(CartContext);

  // Filter products based on top category, sub-category, and search input
  const filteredProducts = PRODUCTS.filter(item => {
    const matchesTopCat = activeTopCat === '1' || item.topId === activeTopCat;
    const matchesSubCat = activeSubCat === 's1' || item.subId === activeSubCat;
    const matchesSearch = searchQuery.trim() === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTopCat && matchesSubCat && matchesSearch;
  });

  // Cart mein item add karne ka handler function
  const handleAddToCart = (item) => {
    const colorName = item.colors ? item.colors[0].name : 'Standard';
    addToCart(item, colorName, 1);
    Alert.alert("Success", "1 item added to your cart!");
  };

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Top Search Header */}
      <View style={styles.searchHeader}>
        <View style={styles.searchBar}>
          <TextInput 
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search products..."
            placeholderTextColor="#9CA3AF"
          />
          {searchQuery.length > 0 ? (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.cameraIconBtn}>
              <Ionicons name="close-circle" size={18} color="#9CA3AF" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.cameraIconBtn}>
              <Ionicons name="camera-outline" size={20} color="#4B5563" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={styles.searchIconButton}>
          <Ionicons name="search" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Top Main Categories Bar (All, Jewelry, Kids, Women...) */}
      <View style={styles.topCategoryContainer}>
        <FlatList
          data={TOP_CATEGORIES}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 12 }}
          renderItem={({ item }) => {
            const isSelected = activeTopCat === item.id;
            return (
              <TouchableOpacity 
                style={styles.topCatItem}
                onPress={() => setActiveTopCat(item.id)}
              >
                <Text style={[styles.topCatText, isSelected && styles.activeTopCatText]}>
                  {item.name}
                </Text>
                {isSelected && <View style={styles.activeIndicator} />}
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        
        {/* Promotional Banner Box */}
        <View style={styles.promoBox}>
          <View style={styles.promoRow}>
            <View style={styles.promoItem}>
              <Ionicons name="checkmark-circle" size={16} color="#16A34A" />
              <Text style={styles.promoBold}> Free shipping</Text>
            </View>
            <Text style={styles.promoSub}>Limited-time offer</Text>
          </View>
          <View style={[styles.promoRow, { borderTopWidth: 1, borderTopColor: '#F3F4F6', paddingTop: 8, marginTop: 8 }]}>
            <View style={styles.promoItem}>
              <Ionicons name="shield-checkmark-outline" size={16} color="#000" />
              <Text style={styles.promoBold}> Price adjustment</Text>
            </View>
            <Text style={styles.promoSub}>Within 30 days</Text>
          </View>
        </View>

        {/* Why Choose Temu Banner */}
        <View style={styles.whyChooseBanner}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="checkmark-circle" size={18} color="#FFFFFF" />
            <Text style={styles.whyChooseText}> Why choose deshop?</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.whyChooseText}>Safe payments </Text>
            <Ionicons name="chevron-forward" size={16} color="#FFFFFF" />
          </View>
        </View>

        {/* Clearance & Lightning Deals Banners */}
        <View style={styles.dealsRow}>
          <TouchableOpacity style={styles.dealCard}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
              <Ionicons name="flash" size={14} color="#DC2626" />
              <Text style={styles.dealTitleRed}> Clearance deals </Text>
              <Ionicons name="chevron-forward" size={14} color="#DC2626" />
            </View>
            <Text style={{ fontSize: 11, color: '#6B7280' }}>Super discounts live now</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.dealCard}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
              <Ionicons name="flash" size={14} color="#D97706" />
              <Text style={styles.dealTitleOrange}> Lightning deals </Text>
              <Ionicons name="chevron-forward" size={14} color="#D97706" />
            </View>
            <Text style={{ fontSize: 11, color: '#6B7280' }}>Limited stocks left</Text>
          </TouchableOpacity>
        </View>

        {/* Secondary Filter Sub-Categories Bar */}
        <View style={styles.subCategoryContainer}>
          <FlatList
            data={SUB_CATEGORIES}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingHorizontal: 12 }}
            renderItem={({ item }) => {
              const isSelected = activeSubCat === item.id;
              return (
                <TouchableOpacity 
                  style={[styles.subCatChip, isSelected && styles.activeSubChip]}
                  onPress={() => setActiveSubCat(item.id)}
                >
                  <Ionicons 
                    name={item.icon} 
                    size={14} 
                    color={isSelected ? '#000000' : '#4B5563'} 
                    style={{ marginRight: 4 }} 
                  />
                  <Text style={[styles.subCatText, isSelected && styles.activeSubText]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        {/* 2-Column Product Grid */}
        <View style={styles.gridContainer}>
          {filteredProducts.length > 0 ? (
            <FlatList
              data={filteredProducts}
              keyExtractor={(item) => item.id}
              numColumns={2}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <ProductCard 
                  item={item} 
                  onPress={() => navigation.getParent()?.navigate('ItemDetail', { product: item })} 
                  onAddToCart={() => handleAddToCart(item)}
                />
              )}
            />
          ) : (
            <View style={styles.noDataContainer}>
              <Ionicons name="search-outline" size={40} color="#9CA3AF" style={{ marginBottom: 8 }} />
              <Text style={styles.noDataText}>No products found matching "{searchQuery}"</Text>
            </View>
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  searchHeader: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
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
  topCategoryContainer: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  topCatItem: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
  },
  topCatText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4B5563',
  },
  activeTopCatText: {
    color: '#000000',
    fontWeight: '700',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    width: '80%',
    height: 3,
    backgroundColor: '#000000',
    borderRadius: 2,
  },
  promoBox: {
    backgroundColor: '#FFFBEB',
    margin: 12,
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#FEF3C7',
  },
  promoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  promoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  promoBold: {
    fontWeight: '700',
    color: '#166534',
    fontSize: 13,
  },
  promoSub: {
    fontSize: 12,
    color: '#6B7280',
  },
  whyChooseBanner: {
    backgroundColor: '#16A34A',
    marginHorizontal: 12,
    marginBottom: 12,
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  whyChooseText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  dealsRow: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  dealCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 2,
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  dealTitleRed: {
    fontWeight: '700',
    color: '#DC2626',
    fontSize: 13,
  },
  dealTitleOrange: {
    fontWeight: '700',
    color: '#D97706',
    fontSize: 13,
  },
  subCategoryContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    marginBottom: 8,
  },
  subCatChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  activeSubChip: {
    backgroundColor: '#E5E7EB',
    borderWidth: 1,
    borderColor: '#000000',
  },
  subCatText: {
    fontSize: 13,
    color: '#4B5563',
    fontWeight: '500',
  },
  activeSubText: {
    color: '#000000',
    fontWeight: '700',
  },
  gridContainer: {
    paddingHorizontal: 8,
  },
  noDataContainer: {
    padding: 40,
    alignItems: 'center',
  },
  noDataText: {
    color: '#6B7280',
    fontSize: 14,
    textAlign: 'center',
  },
});