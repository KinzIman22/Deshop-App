import React, { useState, useContext } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ProductCard from '../components/ProductCard';
import { TOP_CATEGORIES, SUB_CATEGORIES, PRODUCTS } from '../api/mockData';
import { CartContext } from '../context/CartContext';
import { ThemeContext } from '../context/ThemeContext';

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTopCat, setActiveTopCat] = useState('1');
  const [activeSubCat, setActiveSubCat] = useState('s1');
  const insets = useSafeAreaInsets();

  // Cart Context se addToCart function nikala
  const { addToCart } = useContext(CartContext);

  // Access global ThemeContext
  const { isDarkMode } = useContext(ThemeContext);

  // Dynamic Theme Colors consistent with ProfileScreen & OrdersScreen
  const theme = {
    bg: isDarkMode ? '#121212' : '#FFFFFF',
    card: isDarkMode ? '#1E1E1E' : '#FFFFFF',
    searchBg: isDarkMode ? '#2A2A2A' : '#F3F4F6',
    text: isDarkMode ? '#F3F4F6' : '#1F2937',
    textSecondary: isDarkMode ? '#9CA3AF' : '#6B7280',
    border: isDarkMode ? '#2D2D2D' : '#E5E7EB',
    accent: '#F97316',
    activeTabBg: isDarkMode ? '#3B2219' : '#FFF7ED',
    tabText: isDarkMode ? '#9CA3AF' : '#4B5563',
    activeTabText: isDarkMode ? '#F97316' : '#000000',
    activeIndicator: isDarkMode ? '#F97316' : '#000000',
    searchButtonBg: isDarkMode ? '#333333' : '#000000',
    promoBg: isDarkMode ? '#2A2215' : '#FFFBEB',
    promoBorder: isDarkMode ? '#3F301B' : '#FEF3C7',
    promoText: isDarkMode ? '#FBBF24' : '#166534',
    dealCardBg: isDarkMode ? '#1E1E1E' : '#FFFFFF',
    subChipBg: isDarkMode ? '#2A2A2A' : '#F3F4F6',
    activeSubChipBg: isDarkMode ? '#3B2219' : '#E5E7EB',
    activeSubChipBorder: isDarkMode ? '#F97316' : '#000000',
  };

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
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: theme.bg }]}>
      
      {/* Top Search Header */}
      <View style={[styles.searchHeader, { backgroundColor: theme.card }]}>
        <View style={[styles.searchBar, { backgroundColor: theme.searchBg }]}>
          <TextInput 
            style={[styles.searchInput, { color: theme.text }]}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search products..."
            placeholderTextColor={theme.textSecondary}
          />
          {searchQuery.length > 0 ? (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.cameraIconBtn}>
              <Ionicons name="close-circle" size={18} color={theme.textSecondary} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.cameraIconBtn}>
              <Ionicons name="camera-outline" size={20} color={theme.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={[styles.searchIconButton, { backgroundColor: theme.searchButtonBg }]}>
          <Ionicons name="search" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Top Main Categories Bar (All, Jewelry, Kids, Women...) */}
      <View style={[styles.topCategoryContainer, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
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
                <Text style={[styles.topCatText, { color: theme.textSecondary }, isSelected && { color: theme.activeTabText, fontWeight: '700' }]}>
                  {item.name}
                </Text>
                {isSelected && <View style={[styles.activeIndicator, { backgroundColor: theme.activeIndicator }]} />}
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      >
        
        {/* Promotional Banner Box */}
        <View style={[styles.promoBox, { backgroundColor: theme.promoBg, borderColor: theme.promoBorder }]}>
          <View style={styles.promoRow}>
            <View style={styles.promoItem}>
              <Ionicons name="checkmark-circle" size={16} color="#16A34A" />
              <Text style={[styles.promoBold, { color: theme.promoText }]}> Free shipping</Text>
            </View>
            <Text style={[styles.promoSub, { color: theme.textSecondary }]}>Limited-time offer</Text>
          </View>
          <View style={[styles.promoRow, { borderTopWidth: 1, borderTopColor: theme.border, paddingTop: 8, marginTop: 8 }]}>
            <View style={styles.promoItem}>
              <Ionicons name="shield-checkmark-outline" size={16} color={theme.text} />
              <Text style={[styles.promoBold, { color: theme.text }]}> Price adjustment</Text>
            </View>
            <Text style={[styles.promoSub, { color: theme.textSecondary }]}>Within 30 days</Text>
          </View>
        </View>

        {/* Why Choose deshop Banner (Clickable to Navigate) */}
        <TouchableOpacity 
          style={styles.whyChooseBanner}
          onPress={() => navigation.navigate('WhyChoose')}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="checkmark-circle" size={18} color="#FFFFFF" />
            <Text style={styles.whyChooseText}> Why choose deshop?</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.whyChooseText}>Safe payments </Text>
            <Ionicons name="chevron-forward" size={16} color="#FFFFFF" />
          </View>
        </TouchableOpacity>

        {/* Clearance & Lightning Deals Banners */}
        <View style={styles.dealsRow}>
          <TouchableOpacity style={[styles.dealCard, { backgroundColor: theme.dealCardBg, borderColor: theme.border }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
              <Ionicons name="flash" size={14} color="#DC2626" />
              <Text style={styles.dealTitleRed}> Clearance deals </Text>
              <Ionicons name="chevron-forward" size={14} color="#DC2626" />
            </View>
            <Text style={{ fontSize: 11, color: theme.textSecondary }}>Super discounts live now</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.dealCard, { backgroundColor: theme.dealCardBg, borderColor: theme.border }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
              <Ionicons name="flash" size={14} color="#D97706" />
              <Text style={styles.dealTitleOrange}> Lightning deals </Text>
              <Ionicons name="chevron-forward" size={14} color="#D97706" />
            </View>
            <Text style={{ fontSize: 11, color: theme.textSecondary }}>Limited stocks left</Text>
          </TouchableOpacity>
        </View>

        {/* Secondary Filter Sub-Categories Bar */}
        <View style={[styles.subCategoryContainer, { backgroundColor: theme.bg }]}>
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
                  style={[
                    styles.subCatChip, 
                    { backgroundColor: theme.subChipBg },
                    isSelected && { backgroundColor: theme.activeSubChipBg, borderColor: theme.activeSubChipBorder, borderWidth: 1 }
                  ]}
                  onPress={() => setActiveSubCat(item.id)}
                >
                  <Ionicons 
                    name={item.icon} 
                    size={14} 
                    color={isSelected ? (isDarkMode ? '#F97316' : '#000000') : theme.textSecondary} 
                    style={{ marginRight: 4 }} 
                  />
                  <Text style={[styles.subCatText, { color: theme.textSecondary }, isSelected && { color: isDarkMode ? '#F97316' : '#000000', fontWeight: '700' }]}>
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
              columnWrapperStyle={styles.columnWrapper}
              renderItem={({ item }) => (
                <ProductCard 
                  item={item} 
                  onPress={() => navigation.getParent()?.navigate('ItemDetail', { product: item })} 
                  onAddToCart={() => handleAddToCart(item)}
                  cartIconColor="#F97316"
                />
              )}
            />
          ) : (
            <View style={styles.noDataContainer}>
              <Ionicons name="search-outline" size={40} color={theme.textSecondary} style={{ marginBottom: 8 }} />
              <Text style={[styles.noDataText, { color: theme.textSecondary }]}>No products found matching "{searchQuery}"</Text>
            </View>
          )}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchHeader: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 24,
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 42,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 0,
  },
  cameraIconBtn: {
    padding: 4,
  },
  searchIconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topCategoryContainer: {
    paddingBottom: 4,
    borderBottomWidth: 1,
  },
  topCatItem: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
  },
  topCatText: {
    fontSize: 15,
    fontWeight: '600',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    width: '80%',
    height: 3,
    borderRadius: 2,
  },
  promoBox: {
    margin: 12,
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
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
    fontSize: 13,
  },
  promoSub: {
    fontSize: 12,
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
    marginHorizontal: 2,
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
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
    paddingVertical: 10,
    marginBottom: 8,
  },
  subCatChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  subCatText: {
    fontSize: 13,
    fontWeight: '500',
  },
  gridContainer: {
    paddingHorizontal: 8,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  noDataContainer: {
    padding: 40,
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 14,
    textAlign: 'center',
  },
});