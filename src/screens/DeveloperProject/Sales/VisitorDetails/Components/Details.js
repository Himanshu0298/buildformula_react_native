import React, {useMemo} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
  Linking,
} from 'react-native';
import {withTheme, Caption, Paragraph, IconButton} from 'react-native-paper';
import dayjs from 'dayjs';
import {PRIORITY_COLORS, STRUCTURE_TYPE_LABELS} from 'utils/constant';
import CustomBadge from 'components/Atoms/CustomBadge';
import {useSnackbar} from 'components/Atoms/Snackbar';
import {getCountryCode} from 'utils';

function Details(props) {
  const {
    theme,
    visitor = {},
    pipelines,
    occupationOptions,
    sourceTypeOptions,
  } = props;

  const {
    first_name,
    last_name,
    phone,
    budget_from,
    budget_to,
    created,
    priority,
    inquiry_for,
    current_locality,
    bhk,
    email,
    remarks,
    inquiry_status_id,
    intrestedIn,
  } = visitor;

  const snackbar = useSnackbar();

  const [occupation, source, inquiryStatus] = useMemo(() => {
    return [
      occupationOptions.find(i => i.value === visitor.occupation),
      sourceTypeOptions.find(v => v.value === visitor.source_type),
      pipelines.find(i => i.id === inquiry_status_id),
    ];
  }, [
    inquiry_status_id,
    occupationOptions,
    pipelines,
    sourceTypeOptions,
    visitor,
  ]);

  const phoneNumber = useMemo(() => {
    if (getCountryCode(phone)) {
      return phone.replace(/ /g, '');
    }
    return `+91${phone}`.replace(/ /g, '');
  }, [phone]);

  const openDialScreen = value => {
    const url =
      Platform.OS !== 'android' ? `telprompt:${value}` : `tel:${value}`;

    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          snackbar.showMessage({
            message: 'Phone number is not available',
            variant: 'error',
          });
          return;
        }
        Linking.openURL(url);
      })
      .catch(err =>
        snackbar.showMessage({message: err.message, variant: 'error'}),
      );
  };

  const openWhatsApp = value => {
    const url = `https://wa.me/${value}`;
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          snackbar.showMessage({
            message: 'Cannot open Whatsapp',
            variant: 'error',
          });
          return;
        }
        Linking.openURL(url);
      })
      .catch(err =>
        snackbar.showMessage({message: err.message, variant: 'error'}),
      );
  };

  return (
    <ScrollView>
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Paragraph>Name</Paragraph>
          <Caption style={styles.value}>
            {first_name} {last_name}
          </Caption>
        </View>

        <View style={styles.detailRow}>
          <Paragraph>Email</Paragraph>
          <Caption style={styles.value}>{email}</Caption>
        </View>
        <View style={styles.phoneContainer}>
          <View>
            <Paragraph>Phone no.</Paragraph>
            <TouchableOpacity
              disabled={!phone}
              onPress={() => openDialScreen(phoneNumber)}>
              <Caption style={[styles.value, {color: theme.colors.primary}]}>
                {phone ? phoneNumber : 'NA'}
              </Caption>
            </TouchableOpacity>
          </View>
          {phone ? (
            <View>
              <IconButton
                onPress={() => openWhatsApp(phoneNumber)}
                icon="whatsapp"
                color={theme.colors.success}
              />
            </View>
          ) : null}
        </View>
        <View style={styles.detailRow}>
          <Paragraph>Occupation</Paragraph>
          <Caption style={styles.value}>{occupation?.label}</Caption>
        </View>
        <View style={styles.detailRow}>
          <Paragraph>Date</Paragraph>
          <Caption style={styles.value}>
            {dayjs(created).format('DD MMM YYYY')}
          </Caption>
        </View>
        <View style={styles.detailRow}>
          <Paragraph>Inquiry for</Paragraph>
          <Caption style={styles.value}>
            {STRUCTURE_TYPE_LABELS[inquiry_for]}
            {bhk ? ` - ${bhk} BHK` : null}
          </Caption>
        </View>
        <View style={styles.detailRow}>
          <Paragraph>Budget Range</Paragraph>
          <Caption style={styles.value}>
            {/* TODO: Add amount formatting */}
            Rs. {budget_from} - Rs.{budget_to}
          </Caption>
        </View>
        <View style={styles.detailRow}>
          <Paragraph>Current Locality</Paragraph>
          <Caption style={styles.value}>{current_locality}</Caption>
        </View>
        <View style={styles.detailRow}>
          <Paragraph>Intersted In</Paragraph>
          <Caption style={styles.value}>{intrestedIn}</Caption>
        </View>
        <View style={styles.detailRow}>
          <Paragraph>Remark</Paragraph>
          <Caption style={styles.value}>{remarks}</Caption>
        </View>
        <View style={styles.detailRow}>
          <Paragraph>Source type</Paragraph>
          <Caption style={styles.value}>{source?.label || 'NA'}</Caption>
        </View>
        <View style={styles.detailRow}>
          <Paragraph>Priority</Paragraph>
          <Caption style={styles.value}>
            <CustomBadge
              color={PRIORITY_COLORS[priority]}
              label={priority}
              style={styles.badge}
            />
          </Caption>
        </View>
        <View style={styles.detailRow}>
          <Paragraph>Status</Paragraph>
          <Caption>
            <CustomBadge
              style={styles.titleBadge}
              color="rgba(72,114,244,0.15)"
              label={inquiryStatus?.title}
              labelStyles={{color: theme.colors.primary}}
            />
          </Caption>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    position: 'relative',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  detailRow: {
    flexShrink: 1,
    marginBottom: 10,
  },
  phoneContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  value: {
    lineHeight: 14,
  },
  badge: {
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 2,
  },
  titleBadge: {
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
});

export default withTheme(Details);
