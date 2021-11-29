import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {withTheme, Caption, Paragraph} from 'react-native-paper';
import dayjs from 'dayjs';
import {PRIORITY_COLORS, STRUCTURE_TYPE_LABELS} from 'utils/constant';
import CustomBadge from 'components/Atoms/CustomBadge';

function Details(props) {
  const {
    theme,
    visitor = {},
    pipelines,
    occupationOptions,
    sourceTypeOptions,
  } = props;

  const {
    // id: visitorId,
    first_name,
    last_name,
    phone,
    budget_from,
    budget_to,
    follow_up_date,
    priority,
    inquiry_for,
    current_locality,
    bhk,
    email,
    remarks,
    inquiry_status_id,
  } = visitor;

  const occupation = occupationOptions.find(
    i => i.value === visitor.occupation,
  );
  const source = sourceTypeOptions.find(v => v.value === visitor.source_type);

  const inquiryStatus = pipelines.find(i => i.id === inquiry_status_id);

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
          <Paragraph>Remark</Paragraph>
          <Caption style={styles.value}>{remarks}</Caption>
        </View>
        <View style={styles.detailRow}>
          <Paragraph>Email</Paragraph>
          <Caption style={styles.value}>{email}</Caption>
        </View>
        <View style={styles.detailRow}>
          <Paragraph>Phone no.</Paragraph>
          <Caption style={styles.value}>+91 {phone}</Caption>
        </View>
        <View style={styles.detailRow}>
          <Paragraph>Occupation</Paragraph>
          <Caption style={styles.value}>{occupation?.label}</Caption>
        </View>
        <View style={styles.detailRow}>
          <Paragraph>Date</Paragraph>
          <Caption style={styles.value}>
            {dayjs(follow_up_date).format('DD MMM YYYY')}
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
            {/*TODO: Add amount formatting */}
            Rs. {budget_from} - Rs.{budget_to}
          </Caption>
        </View>
        <View style={styles.detailRow}>
          <Paragraph>Current Locality</Paragraph>
          <Caption style={styles.value}>{current_locality}</Caption>
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
              style={{paddingHorizontal: 10, paddingVertical: 2}}
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
  value: {
    lineHeight: 14,
  },
  badge: {
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 2,
  },
});

export default withTheme(Details);
