import * as React from 'react';
import {Caption, Text, withTheme} from 'react-native-paper';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import OpacityButton from 'components/Atoms/Buttons/OpacityButton';
import {theme} from 'styles/theme';
import FileIcon from 'assets/images/file_icon.png';

function RenderCard(props) {
  return (
    <View>
      <Text>25 Feb 2022</Text>
      <View style={styles.cardContainer}>
        <View style={styles.cardDetailsContainer}>
          <Caption>Percentage:</Caption>
          <View>
            <Text style={styles.text}>5</Text>
          </View>
        </View>
        <View style={styles.cardDetailsContainer}>
          <Caption>Quantity:</Caption>
          <View>
            <Text style={styles.text}>5</Text>
          </View>
        </View>
      </View>
      <View style={styles.remarkContainer}>
        <Caption>Remark:</Caption>
        <View style={styles.remarkTextContainer}>
          <Text style={styles.remarkText}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil iste
            at alias facere a libero officiis sed, accusamus, ullam aspernatur
            dolorem illo distinctio modi, necessitatibus recusandae porro
            accusantium minima consequuntur!
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.sectionContainer}
        // onPress={() => onPressFile(file)}
      >
        <Image source={FileIcon} style={styles.fileIcon} />
        <View>
          <Text style={(styles.verticalFlex, styles.text)} numberOfLines={2}>
            fileName.pdf
          </Text>
          <Caption style={(styles.verticalFlex, styles.size)} numberOfLines={2}>
            15-20kb
          </Caption>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const Details = props => {
  const data = [{name: '', value: ''}];

  const {navigation, header} = props;

  return (
    <View style={styles.detailsContainer}>
      <View style={styles.executionDateContainer}>
        {header ? (
          <View style={styles.progressRecordHeader}>
            <Text style={styles.executionDate}>Progress Record</Text>
            <OpacityButton
              opacity={2}
              style={styles.rightArrow}
              color={theme.colors.primary}
              onPress={() => navigation.navigate('RecordsDetail')}>
              <MaterialCommunityIcons
                name="arrow-right"
                size={16}
                color="#fff"
              />
            </OpacityButton>
          </View>
        ) : null}

        {data.map((item, index) => {
          return (
            <RenderCard
              key={index?.toString()}
              {...{
                item,
              }}
            />
          );
        })}
      </View>
    </View>
  );
};

function ProgressCard(props) {
  const {header} = props;

  return (
    <View>
      <Details {...props} header={header} />
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 10,
  },
  executionDateContainer: {
    padding: 10,
    backgroundColor: '#F2F4F5',
    borderRadius: 5,
  },
  executionDate: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  progressRecordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  rightArrow: {
    borderRadius: 25,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  cardDetailsContainer: {
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'center',
  },
  text: {
    marginLeft: 5,
  },
  size: {
    marginLeft: 5,
  },
  remarkContainer: {
    flexDirection: 'row',
    margin: 5,
    flexGrow: 1,
  },
  remarkText: {
    paddingTop: 3,
  },
  remarkTextContainer: {
    flex: 1,
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  sectionContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    display: 'flex',
    borderRadius: 5,
  },
  fileIcon: {
    width: 32,
    height: 38,
    paddingLeft: 10,
    marginLeft: 10,
  },
});

export default withTheme(ProgressCard);
