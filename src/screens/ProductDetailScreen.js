import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Share,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';

import { PRODUCT_DETAIL_DATA } from '../data/productDetailData';
import { CartContext } from '../context/CartContext';
import { ThemeContext } from '../context/ThemeContext';

const { width } = Dimensions.get('window');

// Color Palette Definitions
const lightTheme = {
  bg: '#F3F4F6',
  surface: '#FFF',
  textPrimary: '#1F2937',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  textDark: '#111827',
  border: '#E5E7EB',
  inputBorder: '#D1D5DB',
  carouselBg: '#E5E7EB',
  overlayBtnBg: 'rgba(255, 255, 255, 0.9)',
  overlayBtnIcon: '#000',
  paginationBg: 'rgba(0,0,0,0.6)',
  paginationText: '#FFF',
  saleBannerBg: '#FFF7ED',
  saleBannerBorder: '#FFEDD5',
  modalOverlay: 'rgba(0,0,0,0.5)',
  counterBg: '#F3F4F6',
  imagePickerBg: '#FFF7ED',
  recCardBg: '#FFFFFF',
};

const darkTheme = {
  bg: '#121212',
  surface: '#1E1E1E',
  textPrimary: '#F9FAFB',
  textSecondary: '#9CA3AF',
  textMuted: '#6B7280',
  textDark: '#F3F4F6',
  border: '#2D2D2D',
  inputBorder: '#4B5563',
  carouselBg: '#2A2A2A',
  overlayBtnBg: 'rgba(31, 41, 55, 0.9)',
  overlayBtnIcon: '#F9FAFB',
  paginationBg: 'rgba(0,0,0,0.75)',
  paginationText: '#F9FAFB',
  saleBannerBg: '#3B2219',
  saleBannerBorder: '#431407',
  modalOverlay: 'rgba(0,0,0,0.7)',
  counterBg: '#374151',
  imagePickerBg: '#3B2219',
  recCardBg: '#FFFFFF',
};

export default function ProductDetailScreen({ navigation, route }) {
  const insets = useSafeAreaInsets();
  
  // Access global ThemeContext consistent with ProfileScreen & other app screens
  const { isDarkMode } = useContext(ThemeContext);
  const theme = isDarkMode ? darkTheme : lightTheme;

  const productItem = route?.params?.product || PRODUCT_DETAIL_DATA;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cartCount, setCartCount] = useState(0);

  // Cart Context
  const { addToCart } = useContext(CartContext);

  // Variant Bottom Sheet Modal States (Temu Style)
  const [isVariantModalVisible, setIsVariantModalVisible] = useState(false);

  // Review Modal States
  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
  const [userRating, setUserRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [reviewImage, setReviewImage] = useState(null);
  
  // Base initial mock reviews
  const [reviewsList, setReviewsList] = useState([
    {
      id: '1',
      name: 'Kinzul I.',
      rating: 5,
      date: 'Aug 2026',
      comment: 'Amazing product quality, exactly as shown in pictures!',
      image: null,
    }
  ]);

  useEffect(() => {
    setActiveImageIndex(0);
    setSelectedColor(productItem.colors ? productItem.colors[0].id : null);
    setQuantity(1);
  }, [productItem]);

  const imagesList = productItem.images || [productItem.image];

  const handleScroll = (event) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / width);
    if (slide !== activeImageIndex) {
      setActiveImageIndex(slide);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this product: ${productItem.title}`,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const selectedColorObj = productItem.colors?.find(c => c.id === selectedColor) || productItem.colors?.[0];

  const handleAddToCart = () => {
    const colorName = selectedColorObj?.name || 'Standard';
    addToCart(productItem, colorName, quantity);
    setCartCount(prev => prev + quantity);
    setIsVariantModalVisible(false);
    Alert.alert("Success", `${quantity} item(s) added to your cart!`);
  };

  // Pick Image from Gallery for Review
  const pickReviewImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setReviewImage(result.assets[0].uri);
    }
  };

  // Submit Review Handler
  const handleDoneReview = () => {
    if (!reviewText.trim()) {
      Alert.alert("Error", "Please write something in your review.");
      return;
    }

    const newReview = {
      id: Date.now().toString(),
      name: 'You',
      rating: userRating,
      date: 'Just now',
      comment: reviewText,
      image: reviewImage,
    };

    setReviewsList([newReview, ...reviewsList]);
    setReviewText('');
    setReviewImage(null);
    setUserRating(5);
    setIsReviewModalVisible(false);
    Alert.alert("Thank You!", "Your review has been added successfully.");
  };

  // Dynamically compute average rating and total reviews count
  const baseTotalReviewsCount = Number(PRODUCT_DETAIL_DATA.reviewsSummary?.totalReviews || 450);
  const totalReviewsCount = baseTotalReviewsCount + reviewsList.length;

  const computedAverageRating = (() => {
    const baseRatingSum = Number(PRODUCT_DETAIL_DATA.reviewsSummary?.rating || 4.8) * baseTotalReviewsCount;
    const userReviewsSum = reviewsList.reduce((acc, rev) => acc + rev.rating, 0);
    return ((baseRatingSum + userReviewsSum) / totalReviewsCount).toFixed(1);
  })();

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: theme.bg }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 90 }}>
        
        {/* Image Carousel & Top Header Container */}
        <View style={[styles.carouselContainer, { backgroundColor: theme.carouselBg }]}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            {imagesList.map((img, index) => (
              <Image key={index} source={{ uri: img }} style={styles.carouselImage} resizeMode="cover" />
            ))}
          </ScrollView>

          {/* Top Header Icons */}
          <View style={styles.topHeaderOverlay}>
            <TouchableOpacity 
              onPress={() => navigation.goBack()} 
              style={[styles.circleBtn, { backgroundColor: theme.overlayBtnBg }]}
            >
              <Ionicons name="chevron-back" size={22} color={theme.overlayBtnIcon} />
            </TouchableOpacity>
            <View style={styles.rightHeaderBtns}>
              <TouchableOpacity 
                style={[styles.circleBtn, { marginRight: 8, backgroundColor: theme.overlayBtnBg }]}
                onPress={() => navigation.navigate('CategoryProducts')}
              >
                <Ionicons name="search-outline" size={20} color={theme.overlayBtnIcon} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.circleBtn, { backgroundColor: theme.overlayBtnBg }]} 
                onPress={handleShare}
              >
                <Ionicons name="share-outline" size={20} color={theme.overlayBtnIcon} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.paginationBadge, { backgroundColor: theme.paginationBg }]}>
            <Text style={[styles.paginationText, { color: theme.paginationText }]}>
              {activeImageIndex + 1}/{imagesList.length}
            </Text>
          </View>
        </View>

        {/* Perks & Tags Bar */}
        <View style={[styles.perksBar, { backgroundColor: theme.surface, borderBottomColor: theme.border }]}>
          <View style={styles.savingsTag}>
            <Text style={styles.savingsText}>SAVINGS</Text>
          </View>
          <Text style={[styles.perkItem, { color: theme.textPrimary }]}>✔ Free shipping</Text>
          <Text style={[styles.perkItem, { color: theme.textPrimary }]}>✔ Rs.280 Credit for delay</Text>
        </View>

        {/* Title & Stats */}
        <View style={[styles.sectionContainer, { backgroundColor: theme.surface }]}>
          <View style={styles.expressBadgeRow}>
            <View style={styles.expressBadge}>
              <Text style={styles.expressBadgeText}>2+ BUSINESS DAYS TO PK</Text>
            </View>
          </View>
          <Text style={[styles.productTitle, { color: theme.textPrimary }]}>{productItem.title}</Text>
          <View style={styles.ratingRow}>
            <Text style={[styles.ratingNum, { color: theme.textDark }]}>{computedAverageRating}</Text>
            <Ionicons name="star" size={12} color="#F59E0B" style={{ marginLeft: 2 }} />
            <Text style={[styles.soldNum, { color: theme.textSecondary }]}> • {productItem.sold || "1k+ sold"}</Text>
          </View>

          {/* Pricing Row */}
          <View style={styles.priceSection}>
            <Text style={[styles.originalPrice, { color: theme.textMuted }]}>{productItem.originalPrice || "Rs.3,500"}</Text>
            <Text style={styles.currentPrice}>{productItem.price || productItem.currentPrice || "Rs.1,999"}</Text>
            <Text style={[styles.promoNote, { color: theme.textSecondary }]}>{productItem.promoText || "Extra 10% off"}</Text>
          </View>

          <View style={styles.discountRow}>
            <View style={styles.discountBox}>
              <Text style={styles.discountText}>{productItem.discount || "43% OFF"}</Text>
            </View>
          </View>
        </View>

        {/* Big Sale Countdown Banner */}
        <View style={[styles.saleBanner, { backgroundColor: theme.saleBannerBg, borderColor: theme.saleBannerBorder }]}>
          <View style={styles.saleHeaderRow}>
            <Text style={styles.saleTitle}>Big sale</Text>
            <View style={styles.timerRow}>
              <Ionicons name="time-outline" size={14} color="#EA580C" />
              <Text style={styles.timerText}>Ends in {PRODUCT_DETAIL_DATA.saleEndsIn}</Text>
            </View>
          </View>
        </View>

        {/* Reviews Section */}
        <View style={[styles.sectionContainer, { backgroundColor: theme.surface }]}>
          <TouchableOpacity 
            style={styles.reviewsHeaderRow}
            onPress={() => setIsReviewModalVisible(true)}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[styles.ratingNum, { color: theme.textDark }]}>{computedAverageRating}</Text>
              <View style={{ flexDirection: 'row', marginLeft: 6 }}>
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <Ionicons key={i} name="star" size={14} color="#F59E0B" />
                ))}
              </View>
              <Text style={[styles.reviewCountText, { color: theme.textSecondary }]}> ({totalReviewsCount})</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 12, color: '#EA580C', fontWeight: 'bold', marginRight: 4 }}>Write Review</Text>
              <Ionicons name="chevron-forward" size={18} color="#EA580C" />
            </View>
          </TouchableOpacity>
          <Text style={[styles.verifiedText, { color: theme.textSecondary }]}>All reviews are from verified purchases</Text>

          {/* Render Reviews List */}
          <View style={{ marginTop: 10 }}>
            {reviewsList.map((rev) => (
              <View key={rev.id} style={[styles.userReviewCard, { borderTopColor: theme.border }]}>
                <View style={styles.reviewHeader}>
                  <Text style={[styles.reviewerName, { color: theme.textPrimary }]}>{rev.name}</Text>
                  <Text style={[styles.reviewDate, { color: theme.textMuted }]}>{rev.date}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginVertical: 4 }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Ionicons 
                      key={star} 
                      name={star <= rev.rating ? "star" : "star-outline"} 
                      size={12} 
                      color="#F59E0B" 
                    />
                  ))}
                </View>
                <Text style={[styles.reviewComment, { color: theme.textSecondary }]}>{rev.comment}</Text>
                {rev.image && (
                  <Image source={{ uri: rev.image }} style={styles.reviewAttachedImg} />
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Recommended Header */}
        <View style={[styles.recommendedHeader, { backgroundColor: theme.surface }]}>
          <Text style={[styles.recommendedTitle, { color: theme.textPrimary }]}>Recommended for you</Text>
        </View>

        <View style={styles.recommendedGrid}>
          {PRODUCT_DETAIL_DATA.recommendedProducts.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={[styles.recCard, { backgroundColor: theme.recCardBg }]}
              onPress={() => {
                navigation.push('ItemDetail', { product: item });
              }}
            >
              <Image source={{ uri: item.image }} style={[styles.recImg, { backgroundColor: theme.carouselBg }]} />
              <Text style={[styles.recTitle, { color: '#1F2937' }]} numberOfLines={2}>{item.title}</Text>
              <Text style={styles.recPrice}>{item.price}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Temu-Style Variant / Add to Cart Modal */}
      <Modal
        visible={isVariantModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsVariantModalVisible(false)}
      >
        <View style={[styles.modalOverlay, { backgroundColor: theme.modalOverlay }]}>
          <View style={[styles.variantModalContent, { backgroundColor: theme.surface }]}>
            
            {/* Top Close Row with Product Thumbnail & Price */}
            <View style={[styles.variantTopRow, { borderBottomColor: theme.border }]}>
              <Image 
                source={{ uri: selectedColorObj?.image || imagesList[0] }} 
                style={[styles.variantThumbImg, { backgroundColor: theme.carouselBg }]} 
              />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={[styles.variantPriceText, { color: theme.textDark }]}>{productItem.price || "Rs.575"}</Text>
                <Text style={[styles.variantEstText, { color: theme.textSecondary }]}>Est. Rs.267 after applying promos</Text>
              </View>
              <TouchableOpacity onPress={() => setIsVariantModalVisible(false)} style={styles.closeBtnIcon}>
                <Ionicons name="close" size={20} color={theme.textPrimary} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 350, marginTop: 10 }}>
              {/* Color Selection Header */}
              {productItem.colors && (
                <View style={{ marginTop: 10 }}>
                  <Text style={[styles.optionLabel, { color: theme.textPrimary }]}>
                    Color: <Text style={{ fontWeight: 'bold' }}>{selectedColorObj?.name || "KC Golden"}</Text>
                  </Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 8 }}>
                    {productItem.colors.map((col) => {
                      const isSelected = selectedColor === col.id;
                      return (
                        <TouchableOpacity
                          key={col.id}
                          style={[
                            styles.colorCardModal, 
                            { borderColor: theme.inputBorder },
                            isSelected && styles.selectedColorCardModal
                          ]}
                          onPress={() => setSelectedColor(col.id)}
                        >
                          <Image source={{ uri: col.image }} style={styles.colorCardImgModal} />
                          <Text style={[styles.colorCardTextModal, { color: theme.textSecondary }]} numberOfLines={1}>{col.name}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                </View>
              )}

              {/* Service & Delivery Info */}
              <View style={{ marginTop: 16 }}>
                <View style={[styles.serviceBoxModal, { backgroundColor: isDarkMode ? '#064E3B' : '#F0FDF4' }]}>
                  <Ionicons name="checkmark-circle" size={14} color={isDarkMode ? '#34D399' : '#166534'} style={{ marginRight: 4 }} />
                  <Text style={[styles.serviceTextModal, { color: isDarkMode ? '#A7F3D0' : '#166534' }]}>Arrives in PK in as little as 2 business days</Text>
                </View>
                <View style={[styles.serviceBoxModal, { marginTop: 6, backgroundColor: isDarkMode ? '#064E3B' : '#F0FDF4' }]}>
                  <Ionicons name="checkmark-circle" size={14} color={isDarkMode ? '#34D399' : '#166534'} style={{ marginRight: 4 }} />
                  <Text style={[styles.serviceTextModal, { color: isDarkMode ? '#A7F3D0' : '#166534' }]}>FREE SHIPPING</Text>
                </View>
              </View>

              {/* Quantity Counter Row */}
              <View style={styles.qtyRowModal}>
                <Text style={[styles.optionLabel, { color: theme.textPrimary }]}>Qty</Text>
                <View style={[styles.counterContainer, { borderColor: theme.inputBorder }]}>
                  <TouchableOpacity
                    onPress={() => setQuantity(Math.max(1, quantity - 1))}
                    style={[styles.counterBtn, { backgroundColor: theme.counterBg }]}
                  >
                    <Ionicons name="remove" size={16} color={theme.textPrimary} />
                  </TouchableOpacity>
                  <Text style={[styles.qtyText, { color: theme.textPrimary }]}>{quantity}</Text>
                  <TouchableOpacity
                    onPress={() => setQuantity(quantity + 1)}
                    style={[styles.counterBtn, { backgroundColor: theme.counterBg }]}
                  >
                    <Ionicons name="add" size={16} color={theme.textPrimary} />
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={[styles.soldNoteModal, { color: theme.textMuted }]}>Added 🔥 74K+ sold</Text>
            </ScrollView>

            {/* Bottom Action Bar inside Modal */}
            <View style={[styles.modalBottomActionRow, { borderTopColor: theme.border }]}>
              <TouchableOpacity style={styles.orangeActionBtn} onPress={handleAddToCart}>
                <View style={{ alignItems: 'center', marginHorizontal: 12 }}>
                  <Text style={styles.orangeBtnMainText}>Add {quantity} to Cart</Text>
                  <Text style={styles.orangeBtnSubText}>{selectedColorObj?.name || "KC Golden"}</Text>
                </View>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>

      {/* Write Review Modal */}
      <Modal
        visible={isReviewModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsReviewModalVisible(false)}
      >
        <View style={[styles.modalOverlay, { backgroundColor: theme.modalOverlay }]}>
          <View style={[styles.modalContent, { backgroundColor: theme.surface }]}>
            <View style={[styles.modalHeader, { borderBottomColor: theme.border }]}>
              <Text style={[styles.modalTitle, { color: theme.textPrimary }]}>Write a Review</Text>
              <TouchableOpacity onPress={() => setIsReviewModalVisible(false)}>
                <Ionicons name="close" size={24} color={theme.textPrimary} />
              </TouchableOpacity>
            </View>

            <Text style={[styles.modalSubLabel, { color: theme.textPrimary }]}>Select Rating</Text>
            <View style={styles.starRow}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => setUserRating(star)}>
                  <Ionicons 
                    name={star <= userRating ? "star" : "star-outline"} 
                    size={30} 
                    color="#F59E0B" 
                    style={{ marginHorizontal: 4 }}
                  />
                </TouchableOpacity>
              ))}
            </View>

            <Text style={[styles.modalSubLabel, { color: theme.textPrimary }]}>Your Review</Text>
            <TextInput
              style={[
                styles.textInputArea, 
                { borderColor: theme.inputBorder, color: theme.textPrimary, backgroundColor: theme.bg }
              ]}
              placeholder="What did you like or dislike?"
              placeholderTextColor={theme.textMuted}
              multiline
              numberOfLines={4}
              value={reviewText}
              onChangeText={setReviewText}
            />

            <Text style={[styles.modalSubLabel, { color: theme.textPrimary }]}>Add Photo (Optional)</Text>
            <TouchableOpacity style={[styles.imagePickerBtn, { backgroundColor: theme.imagePickerBg }]} onPress={pickReviewImage}>
              <Ionicons name="camera-outline" size={20} color="#EA580C" />
              <Text style={styles.imagePickerText}>
                {reviewImage ? "Change Image" : "Upload from Gallery"}
              </Text>
            </TouchableOpacity>

            {reviewImage && (
              <View style={styles.previewContainer}>
                <Image source={{ uri: reviewImage }} style={styles.previewImg} />
                <TouchableOpacity onPress={() => setReviewImage(null)} style={styles.removeImgBtn}>
                  <Ionicons name="close-circle" size={20} color="#EF4444" />
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity style={styles.doneBtn} onPress={handleDoneReview}>
              <Text style={styles.doneBtnText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Sticky Bottom Action Bar with Cart Navigation */}
      <View style={[styles.bottomBar, { backgroundColor: theme.surface, borderTopColor: theme.border, paddingBottom: Math.max(insets.bottom, 10) }]}>
        <TouchableOpacity 
          style={styles.cartIconWrapper} 
          onPress={() => navigation.navigate('Cart')}
        >
          <Ionicons name="cart-outline" size={24} color={theme.textPrimary} />
          {cartCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeTxt}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.selectOptionBtn} onPress={() => setIsVariantModalVisible(true)}>
          <Text style={styles.selectOptionBtnText}>Select Option / Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topHeaderOverlay: {
    position: 'absolute',
    top: 12,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    zIndex: 10,
  },
  circleBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    elevation: 3,
  },
  rightHeaderBtns: {
    flexDirection: 'row',
  },
  carouselContainer: {
    width: width,
    height: 360,
    position: 'relative',
  },
  carouselImage: {
    width: width,
    height: 360,
  },
  paginationBadge: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  paginationText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  perksBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  savingsTag: {
    backgroundColor: '#991B1B',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 8,
  },
  savingsText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  perkItem: {
    fontSize: 11,
    marginRight: 10,
  },
  sectionContainer: {
    padding: 12,
    marginTop: 8,
  },
  expressBadgeRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  expressBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  expressBadgeText: {
    color: '#166534',
    fontSize: 10,
    fontWeight: 'bold',
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  ratingNum: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  soldNum: {
    fontSize: 12,
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 8,
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    fontSize: 12,
    marginRight: 6,
  },
  currentPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EA580C',
    marginRight: 6,
  },
  promoNote: {
    fontSize: 11,
  },
  discountRow: {
    marginTop: 6,
  },
  discountBox: {
    backgroundColor: '#FFEDD5',
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountText: {
    color: '#C2410C',
    fontSize: 10,
    fontWeight: 'bold',
  },
  saleBanner: {
    padding: 12,
    marginTop: 8,
    borderWidth: 1,
  },
  saleHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  saleTitle: {
    fontWeight: 'bold',
    color: '#C2410C',
    fontSize: 14,
  },
  timerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 12,
    color: '#C2410C',
    marginLeft: 4,
    fontWeight: '600',
  },
  optionLabel: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  reviewsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewCountText: {
    fontSize: 13,
  },
  verifiedText: {
    fontSize: 11,
    marginTop: 4,
  },
  userReviewCard: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reviewerName: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  reviewDate: {
    fontSize: 11,
  },
  reviewComment: {
    fontSize: 12,
    marginTop: 2,
  },
  reviewAttachedImg: {
    width: 60,
    height: 60,
    borderRadius: 4,
    marginTop: 6,
  },
  recommendedHeader: {
    padding: 12,
    marginTop: 8,
  },
  recommendedTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  recommendedGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
    justifyContent: 'space-between',
  },
  recCard: {
    width: '48%',
    padding: 8,
    borderRadius: 6,
    marginBottom: 8,
  },
  recImg: {
    width: '100%',
    height: 140,
    borderRadius: 4,
  },
  recTitle: {
    fontSize: 12,
    marginTop: 6,
    height: 32,
  },
  recPrice: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#EA580C',
    marginTop: 4,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    borderTopWidth: 1,
  },
  cartIconWrapper: {
    position: 'relative',
    marginRight: 16,
    padding: 4,
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#EA580C',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeTxt: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: 'bold',
  },
  selectOptionBtn: {
    flex: 1,
    backgroundColor: '#EA580C',
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
  },
  selectOptionBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  variantModalContent: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    maxHeight: '85%',
  },
  variantTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingBottom: 12,
  },
  variantThumbImg: {
    width: 60,
    height: 60,
    borderRadius: 6,
  },
  variantPriceText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  variantEstText: {
    fontSize: 11,
    marginTop: 2,
  },
  closeBtnIcon: {
    padding: 4,
  },
  colorCardModal: {
    width: 70,
    height: 75,
    borderRadius: 6,
    borderWidth: 1,
    marginRight: 8,
    alignItems: 'center',
    padding: 4,
  },
  selectedColorCardModal: {
    borderColor: '#EA580C',
    borderWidth: 2,
  },
  colorCardImgModal: {
    width: '100%',
    height: 48,
    borderRadius: 4,
  },
  colorCardTextModal: {
    fontSize: 10,
    marginTop: 2,
  },
  serviceBoxModal: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 6,
  },
  serviceTextModal: {
    fontSize: 12,
    fontWeight: '500',
  },
  qtyRowModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 6,
  },
  counterBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  qtyText: {
    paddingHorizontal: 16,
    fontSize: 14,
    fontWeight: 'bold',
  },
  soldNoteModal: {
    fontSize: 12,
    marginTop: 10,
    marginBottom: 10,
  },
  modalBottomActionRow: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
  },
  orangeActionBtn: {
    backgroundColor: '#EA580C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 24,
  },
  orangeBtnMainText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  orangeBtnSubText: {
    color: '#FFF',
    fontSize: 10,
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingBottom: 12,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalSubLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  starRow: {
    flexDirection: 'row',
  },
  textInputArea: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    textAlignVertical: 'top',
    height: 100,
    fontSize: 14,
  },
  imagePickerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EA580C',
    borderRadius: 8,
    padding: 12,
  },
  imagePickerText: {
    marginLeft: 6,
    color: '#EA580C',
    fontWeight: 'bold',
    fontSize: 13,
  },
  previewContainer: {
    marginTop: 10,
    alignSelf: 'flex-start',
    position: 'relative',
  },
  previewImg: {
    width: 70,
    height: 70,
    borderRadius: 6,
  },
  removeImgBtn: {
    position: 'absolute',
    top: -6,
    right: -6,
  },
  doneBtn: {
    backgroundColor: '#EA580C',
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  doneBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
});