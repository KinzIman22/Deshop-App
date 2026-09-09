import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView 
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export default function WhyChooseScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('security'); // 'security' or 'guarantee'
  const { colors, isDarkMode } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      
      {/* Top Header */}
      <View style={[styles.header, { backgroundColor: colors.headerBg || colors.cardBg, borderBottomColor: colors.borderColor }]}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={[styles.backBtn, { backgroundColor: isDarkMode ? '#2A2A2A' : '#F1F5F9' }]}
        >
          <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Why choose us</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
        
        {/* Top Shield Icon & Intro */}
        <View style={styles.topBannerSection}>
          <View style={[styles.shieldIconBg, { backgroundColor: isDarkMode ? '#064E3B' : '#DCFCE7' }]}>
            <Ionicons name="shield-checkmark" size={32} color="#16A34A" />
          </View>
          
          <View style={[styles.infoCard, { backgroundColor: colors.cardBg || colors.inputBg, borderColor: colors.borderColor }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
              <MaterialCommunityIcons name="tag-percent" size={20} color="#16A34A" />
              <Text style={[styles.cardTitle, { color: colors.textPrimary }]}> How are we able to offer lower prices?</Text>
            </View>
            <Text style={[styles.cardText, { color: colors.textSecondary }]}>
              We connect customers directly with cost-efficient producers, allowing for competitively priced goods.
            </Text>
          </View>

          <View style={[styles.infoCard, { backgroundColor: colors.cardBg || colors.inputBg, borderColor: colors.borderColor }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
              <FontAwesome5 name="box-open" size={16} color="#16A34A" />
              <Text style={[styles.cardTitle, { color: colors.textPrimary }]}> Offering a wide range of products</Text>
            </View>
            <Text style={[styles.cardText, { color: colors.textSecondary }]}>
              We have access to a sophisticated network of sellers. Many of these sellers are world-class manufacturers.
            </Text>
          </View>
        </View>

        {/* Custom Tab Switcher */}
        <View style={[styles.tabContainer, { backgroundColor: isDarkMode ? '#2A2A2A' : '#E2E8F0' }]}>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'security' && styles.activeTabSecurity]} 
            onPress={() => setActiveTab('security')}
          >
            <Text style={[styles.tabText, { color: colors.textSecondary }, activeTab === 'security' && styles.activeTabText]}>
              Security & Privacy
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'guarantee' && styles.activeTabGuarantee]} 
            onPress={() => setActiveTab('guarantee')}
          >
            <Text style={[styles.tabText, { color: colors.textSecondary }, activeTab === 'guarantee' && styles.activeTabText]}>
              Order Guarantee
            </Text>
          </TouchableOpacity>
        </View>

        {/* --- TAB 1: SECURITY & PRIVACY CONTENT --- */}
        {activeTab === 'security' ? (
          <View style={[styles.contentSection, { backgroundColor: colors.cardBg || colors.inputBg, borderColor: colors.borderColor }]}>
            <Text style={[styles.sectionHeading, { color: colors.textPrimary }]}>Security & Privacy</Text>

            {/* Point 1 */}
            <View style={styles.pointBlock}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <View style={styles.numberBadge}><Text style={styles.numberText}>1</Text></View>
                <Text style={[styles.pointTitle, { color: colors.textPrimary }]}>Pay confidently with our secure methods</Text>
              </View>
              
              <View style={styles.subCheckRow}>
                <Ionicons name="checkmark" size={16} color="#16A34A" style={{ marginRight: 6 }} />
                <Text style={[styles.subCheckText, { color: colors.textSecondary }]}>Card information is secure and uncompromised</Text>
              </View>
              <View style={styles.subCheckRow}>
                <Ionicons name="checkmark" size={16} color="#16A34A" style={{ marginRight: 6 }} />
                <Text style={[styles.subCheckText, { color: colors.textSecondary }]}>We follow standard security protocols when handling card data</Text>
              </View>
              <View style={styles.subCheckRow}>
                <Ionicons name="checkmark" size={16} color="#16A34A" style={{ marginRight: 6 }} />
                <Text style={[styles.subCheckText, { color: colors.textSecondary }]}>All data is fully encrypted</Text>
              </View>
              <View style={styles.subCheckRow}>
                <Ionicons name="checkmark" size={16} color="#16A34A" style={{ marginRight: 6 }} />
                <Text style={[styles.subCheckText, { color: colors.textSecondary }]}>We never sell your card or personal information</Text>
              </View>

              {/* Security Standards Badges */}
              <View style={styles.imageStyleGrid}>
                <View style={styles.imageLikeBox}><Text style={styles.badgeTextPCI}>PCI DSS</Text></View>
                <View style={styles.imageLikeBox}><Text style={styles.badgeTextVisa}>VISA</Text></View>
                <View style={styles.imageLikeBox}>
                  <View style={styles.mcCircles}>
                    <View style={[styles.circle, {backgroundColor:'#EB001B', width:11, height:11, borderRadius:5.5}]}/>
                    <View style={[styles.circle, {backgroundColor:'#F79E1B', width:11, height:11, borderRadius:5.5, marginLeft:-6}]}/>
                  </View>
                  <Text style={[styles.badgeTextSmall, {color: colors.textSecondary, marginLeft:3}]}>ID Check</Text>
                </View>
                <View style={styles.imageLikeBox}><Text style={styles.badgeTextAmex}>AMEX</Text></View>
                <View style={styles.imageLikeBox}><Text style={styles.badgeTextJCB}>JCB</Text></View>
                <View style={styles.imageLikeBox}><Text style={styles.badgeTextAPWG}>APWG</Text></View>
              </View>

              {/* Other Payment Methods Section Heading */}
              <Text style={styles.subSectionTitle}>We also provide other payment methods for you.</Text>

              {/* Payment Methods Grid */}
              <View style={styles.imageStyleGrid}>
                <View style={styles.imageLikePayBox}>
                  <Text style={{fontSize: 13, fontWeight: '900', color: '#E11D48'}}>Jazz<Text style={{color: '#EAB308'}}>Cash</Text></Text>
                </View>
                <View style={styles.imageLikePayBox}>
                  <View style={{flexDirection:'row', alignItems:'center'}}>
                    <View style={{width: 7, height: 7, borderRadius: 3.5, backgroundColor: '#10B981', marginRight: 3}}/>
                    <Text style={{fontSize: 12, fontWeight: '800', color: '#047857'}}>easypaisa</Text>
                  </View>
                </View>
                <View style={styles.imageLikePayBox}>
                  <Text style={[styles.badgeTextVisa, {fontSize: 16}]}>VISA</Text>
                </View>
                <View style={styles.imageLikePayBox}>
                  <View style={styles.mcCircles}>
                    <View style={[styles.circle, {backgroundColor:'#EB001B', width:14, height:14, borderRadius:7}]}/>
                    <View style={[styles.circle, {backgroundColor:'#F79E1B', width:14, height:14, borderRadius:7, marginLeft:-9}]}/>
                  </View>
                </View>
                <View style={styles.imageLikePayBox}>
                  <Text style={{fontSize: 9, fontWeight: '900', color: '#006FCF', textAlign:'center'}}>AMERICAN EXPRESS</Text>
                </View>
                <View style={styles.imageLikePayBox}>
                  <Text style={{fontSize: 11, fontWeight: '800', color: '#FF6000'}}>DISCOVER</Text>
                </View>
                <View style={styles.imageLikePayBox}>
                  <View style={styles.mcCircles}>
                    <View style={[styles.circle, {backgroundColor:'#0099FF', width:14, height:14, borderRadius:7}]}/>
                    <View style={[styles.circle, {backgroundColor:'#EB001B', width:14, height:14, borderRadius:7, marginLeft:-9}]}/>
                  </View>
                </View>
                <View style={styles.imageLikePayBox}>
                  <Text style={{fontSize: 9, fontWeight: '700', color: '#0079BE', textAlign:'center'}}>DINERS CLUB</Text>
                </View>
                <View style={styles.imageLikePayBox}>
                  <Text style={{fontSize: 11, fontWeight: '900', color: '#002B49'}}>UnionPay</Text>
                </View>
                <View style={styles.imageLikePayBox}>
                  <Ionicons name="logo-apple" size={17} color={colors.textPrimary} style={{marginRight: 2}} />
                  <Text style={{fontSize: 13, fontWeight: '700', color: colors.textPrimary}}>Pay</Text>
                </View>
                <View style={styles.imageLikePayBox}>
                  <Ionicons name="logo-google" size={15} color="#4285F4" style={{marginRight: 2}} />
                  <Text style={{fontSize: 13, fontWeight: '700', color: colors.textPrimary}}>Pay</Text>
                </View>
              </View>

            </View>

          </View>
        ) : (
          /* --- TAB 2: ORDER GUARANTEE CONTENT --- */
          <View style={[styles.contentSection, { backgroundColor: colors.cardBg || colors.inputBg, borderColor: colors.borderColor }]}>
            <Text style={[styles.sectionHeading, { color: colors.textPrimary }]}>Order Guarantee</Text>

            {/* Guarantee Point 1 */}
            <View style={styles.pointBlock}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                <View style={styles.numberBadge}><Text style={styles.numberText}>1</Text></View>
                <Text style={[styles.pointTitle, { color: colors.textPrimary }]}>Free shipping on all orders</Text>
              </View>
              <Text style={[styles.pointDesc, { color: colors.textSecondary }]}>
                We offer this deal thanks to the strong and efficient fulfillment network we have developed. We work with reliable courier partners.
              </Text>
            </View>

            {/* Guarantee Point 2 */}
            <View style={styles.pointBlock}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                <View style={styles.numberBadge}><Text style={styles.numberText}>2</Text></View>
                <Text style={[styles.pointTitle, { color: colors.textPrimary }]}>Delivery guarantee</Text>
              </View>
              <Text style={[styles.pointDesc, { color: colors.textSecondary }]}>
                Reliable logistics service providers around the world ensure your package reaches you safely and on time.
              </Text>
              <View style={styles.subCheckRow}><Ionicons name="checkmark" size={16} color="#16A34A" style={{ marginRight: 6 }}/><Text style={[styles.subCheckText, { color: colors.textSecondary }]}>Credit for delay</Text></View>
              <View style={styles.subCheckRow}><Ionicons name="checkmark" size={16} color="#16A34A" style={{ marginRight: 6 }}/><Text style={[styles.subCheckText, { color: colors.textSecondary }]}>Return if item damaged</Text></View>
              <View style={styles.subCheckRow}><Ionicons name="checkmark" size={16} color="#16A34A" style={{ marginRight: 6 }}/><Text style={[styles.subCheckText, { color: colors.textSecondary }]}>15-day no update refund</Text></View>
              <View style={styles.subCheckRow}><Ionicons name="checkmark" size={16} color="#16A34A" style={{ marginRight: 6 }}/><Text style={[styles.subCheckText, { color: colors.textSecondary }]}>30-day no delivery refund</Text></View>
            </View>

            {/* Guarantee Point 3 */}
            <View style={styles.pointBlock}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                <View style={styles.numberBadge}><Text style={styles.numberText}>3</Text></View>
                <Text style={[styles.pointTitle, { color: colors.textPrimary }]}>Free returns up to 90 days</Text>
              </View>
              <Text style={[styles.pointDesc, { color: colors.textSecondary }]}>
                Return shipping is free on your first return for EVERY order as long as the return window has not closed.
              </Text>
            </View>

          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: { fontSize: 16, fontWeight: '700' },
  topBannerSection: { alignItems: 'center', marginBottom: 20 },
  shieldIconBg: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoCard: {
    borderRadius: 12,
    padding: 14,
    width: '100%',
    marginBottom: 12,
    borderWidth: 1,
  },
  cardTitle: { fontSize: 14, fontWeight: '700' },
  cardText: { fontSize: 14, marginTop: 4, lineHeight: 20 },
  
  // Tabs styling
  tabContainer: {
    flexDirection: 'row',
    borderRadius: 10,
    padding: 3,
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTabSecurity: {
    backgroundColor: '#16A34A',
  },
  activeTabGuarantee: {
    backgroundColor: '#16A34A',
  },
  tabText: { fontSize: 14, fontWeight: '600' },
  activeTabText: { color: '#FFFFFF' },

  // Content styling
  contentSection: { borderRadius: 12, padding: 16, borderWidth: 1 },
  sectionHeading: { fontSize: 18, fontWeight: '700', marginBottom: 16 },
  subSectionTitle: { fontSize: 13, fontWeight: '700', color: '#166534', marginTop: 18, marginBottom: 10 },
  pointBlock: { marginBottom: 18 },
  numberBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#16A34A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  numberText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  pointTitle: { fontSize: 14, fontWeight: '700', flex: 1 },
  pointDesc: { fontSize: 14, lineHeight: 20, marginBottom: 8 },
  subCheckRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 4, paddingLeft: 30 },
  subCheckText: { fontSize: 14, lineHeight: 20 },
  
  // Clean Image-like grids
  imageStyleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    gap: 12,
    paddingLeft: 30,
  },
  imageLikeBox: {
    backgroundColor: 'transparent',
    width: '21%',
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  imageLikePayBox: {
    backgroundColor: 'transparent',
    width: '21%',
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  badgeTextPCI: { fontSize: 10, fontWeight: '900', color: '#0B6623' },
  badgeTextVisa: { fontSize: 14, fontWeight: '900', color: '#1A1F71', fontStyle: 'italic' },
  badgeTextAmex: { fontSize: 9, fontWeight: '900', color: '#006FCF', textAlign: 'center' },
  badgeTextJCB: { fontSize: 11, fontWeight: '900', color: '#000066' },
  badgeTextAPWG: { fontSize: 10, fontWeight: '900', color: '#3F6212' },
  badgeTextSmall: { fontSize: 8, fontWeight: '700' },
  mcCircles: { flexDirection: 'row', alignItems: 'center' },
  circle: { opacity: 0.95 },
});