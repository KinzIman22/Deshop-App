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
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CATEGORY_PRODUCTS = [
  {
    id: '1',
    title: '36pcs Food Storage Container Set with Bamboo Lids',
    price: 'Rs. 623',
    sold: '150K+ sold',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=300',
    tag: 'Star seller',
  },
  {
    id: '2',
    title: '1 Set, Air Fryer Accessories & Silicone Pots',
    price: 'Rs. 2,084',
    sold: '2.8K+ sold',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=300',
    tag: 'SAVINGS',
  },
  {
    id: '3',
    title: '9pcs Heat-resistant Non-stick Kitchen Utensils Set',
    price: 'Rs. 774',
    sold: '162 sold',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=300',
  },
  {
    id: '4',
    title: '12pcs Heavy-Duty Granite Cookware Set with Lids',
    price: 'Rs. 1,201',
    sold: '58K+ sold',
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=300',
  },
];

const TOP_SUB_CHIPS = [
  { id: '1', name: 'Kitchen Utensils', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=150' },
  { id: '2', name: 'Bedding', image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=150' },
  { id: '3', name: 'Event & Party', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=150' },
  { id: '4', name: 'Bath', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=150' },
];

export default function CategoryProductsScreen({ route, navigation }) {
  const categoryTitle = route?.params?.subCategory || route?.params?.categoryName || 'Home & Kitchen';
  const [searchQuery, setSearchQuery] = useState(categoryTitle);
  
  // Active states for filter interactive buttons
  const [activeSubChip, setActiveSubChip] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null);

  const handleFilterPress = (filterType) => {
    setActiveFilter(filterType);
    Alert.alert("Filter Selected", `You clicked on ${filterType} options.`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="#000000" />
        </TouchableOpacity>
        
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search"
          />
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="camera-outline" size={20} color="#4B5563" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.searchSubmitBtn}>
          <Ionicons name="search" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Horizontal Sub-Categories Circles Scroll (Clickable) */}
      <View style={styles.subChipsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 12 }}>
          {TOP_SUB_CHIPS.map((item) => {
            const isSelected = activeSubChip === item.id;
            return (
              <TouchableOpacity 
                key={item.id} 
                style={[styles.subChipItem, isSelected && styles.selectedSubChip]}
                onPress={() => {
                  setActiveSubChip(item.id);
                  setSearchQuery(item.name);
                }}
              >
                <Image source={{ uri: item.image }} style={styles.subChipImage} />
                <Text style={[styles.subChipText, isSelected && styles.selectedSubText]} numberOfLines={1}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Filter & Sort Pills Bar (Fully Clickable Row) */}
      <View style={styles.filterBarContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 12 }}>
          
          <TouchableOpacity 
            style={[styles.filterPill, activeFilter === 'Filters' && styles.activePill]}
            onPress={() => handleFilterPress('Filters')}
          >
            <Ionicons name="options-outline" size={14} color={activeFilter === 'Filters' ? '#F97316' : '#374151'} style={{ marginRight: 4 }} />
            <Text style={[styles.filterPillText, activeFilter === 'Filters' && styles.activePillText]}>Filters</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.filterPill, activeFilter === 'Sort by' && styles.activePill]}
            onPress={() => handleFilterPress('Sort by')}
          >
            <Text style={[styles.filterPillText, activeFilter === 'Sort by' && styles.activePillText]}>Sort by</Text>
            <Ionicons name="chevron-down" size={12} color={activeFilter === 'Sort by' ? '#F97316' : '#374151'} style={{ marginLeft: 4 }} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.filterPill, activeFilter === 'Category' && styles.activePill]}
            onPress={() => handleFilterPress('Category')}
          >
            <Text style={[styles.filterPillText, activeFilter === 'Category' && styles.activePillText]}>Category</Text>
            <Ionicons name="chevron-down" size={12} color={activeFilter === 'Category' ? '#F97316' : '#374151'} style={{ marginLeft: 4 }} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.filterPill, activeFilter === 'Color' && styles.activePill]}
            onPress={() => handleFilterPress('Color')}
          >
            <Text style={[styles.filterPillText, activeFilter === 'Color' && styles.activePillText]}>Color</Text>
            <Ionicons name="chevron-down" size={12} color={activeFilter === 'Color' ? '#F97316' : '#374151'} style={{ marginLeft: 4 }} />
          </TouchableOpacity>

        </ScrollView>
      </View>

      {/* Green Assurance Banner */}
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

      {/* Products Grid */}
      <FlatList
        data={CATEGORY_PRODUCTS}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.gridContainer}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.productCard}>
            <View style={styles.productImageContainer}>
              <Image source={{ uri: item.image }} style={styles.productImage} resizeMode="cover" />
              {item.tag && (
                <View style={[styles.tagBadge, item.tag === 'SAVINGS' && { backgroundColor: '#EA580C' }]}>
                  <Text style={styles.tagText}>{item.tag}</Text>
                </View>
              )}
            </View>

            <Text style={styles.productTitle} numberOfLines={2}>{item.title}</Text>

            <View style={styles.ratingRow}>
              <Ionicons name="star" size={12} color="#F59E0B" />
              <Text style={styles.ratingText}> {item.rating} </Text>
              {item.sold ? <Text style={styles.soldText}>• {item.sold}</Text> : null}
            </View>

            <View style={styles.priceRow}>
              <Text style={styles.priceText}>{item.price}</Text>
              <TouchableOpacity style={styles.cartBtn}>
                <Ionicons name="cart-outline" size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backBtn: {
    padding: 4,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 22,
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 40,
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1F2937',
  },
  iconButton: {
    padding: 4,
  },
  searchSubmitBtn: {
    width: 38,
    height: 38,
    backgroundColor: '#000000',
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subChipsContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  subChipItem: {
    alignItems: 'center',
    marginRight: 16,
    width: 70,
    padding: 4,
    borderRadius: 8,
  },
  selectedSubChip: {
    backgroundColor: '#FFF7ED',
    borderWidth: 1,
    borderColor: '#F97316',
  },
  subChipImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E5E7EB',
    marginBottom: 4,
  },
  subChipText: {
    fontSize: 10,
    color: '#374151',
    textAlign: 'center',
  },
  selectedSubText: {
    color: '#F97316',
    fontWeight: '700',
  },
  filterBarContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  activePill: {
    backgroundColor: '#FFF7ED',
    borderColor: '#F97316',
  },
  filterPillText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
  },
  activePillText: {
    color: '#F97316',
    fontWeight: '700',
  },
  infoBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#FFFBEB',
    borderBottomWidth: 1,
    borderBottomColor: '#FEF3C7',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 10,
    color: '#166534',
    fontWeight: '600',
  },
  gridContainer: {
    padding: 8,
  },
  productCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    margin: 4,
    padding: 8,
    maxWidth: '48%',
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  productImageContainer: {
    position: 'relative',
    width: '100%',
    height: 140,
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: '#F3F4F6',
    marginBottom: 6,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  tagBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: '#7C3AED',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  tagText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '700',
  },
  productTitle: {
    fontSize: 12,
    color: '#1F2937',
    height: 32,
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  ratingText: {
    fontSize: 11,
    color: '#4B5563',
    fontWeight: '600',
  },
  soldText: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  cartBtn: {
    backgroundColor: '#F97316',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
});