import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {bool, func, object, number, string} from 'prop-types';
import {colors, COLUMN_WIDTH, deviceWidth} from '../../constants';
import EmptyColumn from '../EmptyColumn/EmptyColumn';

const PADDING = 32;
const ONE_COLUMN_WIDTH = deviceWidth - PADDING;

class Column extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {column, boardRepository} = this.props;

    boardRepository.addListener(column.id(), 'reload', () =>
      this.forceUpdate(),
    );
  }

  onPressIn = (item, y) => {
    const {column, onPressIn} = this.props;
    onPressIn(column.id(), item, y);
  };

  onPress = (item) => {
    const {column, onPress} = this.props;

    return onPress(column.id(), item);
  };

  setItemRef = (item, ref) => {
    const {column, boardRepository} = this.props;
    boardRepository.setItemRef(column.id(), item, ref);
    boardRepository.updateColumnsLayoutAfterVisibilityChanged();
  };

  updateItemWithLayout = (item) => () => {
    const {column, boardRepository} = this.props;
    boardRepository.updateItemWithLayout(column.id(), item);
  };

  setColumnRef = (ref) => {
    const {column, boardRepository} = this.props;
    boardRepository.setColumnRef(column.id(), ref);
  };

  updateColumnWithLayout = () => {
    const {column, boardRepository} = this.props;

    boardRepository.updateColumnWithLayout(column.id());
  };

  renderWrapperRow = (item) => {
    const {renderWrapperRow} = this.props;
    const props = {
      onPressIn: (y) => this.onPressIn(item, y),
      onPress: this.onPress(item),
      hidden: item.isHidden(),
      item,
    };
    return (
      <View
        ref={(ref) => this.setItemRef(item, ref)}
        collapsable={false}
        onLayout={this.updateItemWithLayout(item)}
        key={item.id.toString()}>
        {renderWrapperRow(props)}
      </View>
    );
  };

  handleScroll = (event) => {
    const {
      column,
      onScrollingStarted,
      boardRepository,
      unsubscribeFromMovingMode,
    } = this.props;

    unsubscribeFromMovingMode();
    onScrollingStarted();

    const col = boardRepository.column(column.id());

    const liveOffset = event.nativeEvent.contentOffset.y;

    this.scrollingDown = liveOffset > col.scrollOffset();
  };

  endScrolling = (event) => {
    const {column, onScrollingEnded, boardRepository} = this.props;

    const currentOffset = event.nativeEvent.contentOffset.y;
    const col = boardRepository.column(column.id());
    const scrollingDownEnded =
      this.scrollingDown && currentOffset >= col.scrollOffset();
    const scrollingUpEnded =
      !this.scrollingDown && currentOffset <= col.scrollOffset();

    if (scrollingDownEnded || scrollingUpEnded) {
      boardRepository.setScrollOffset(col.id(), currentOffset);
      boardRepository.updateColumnsLayoutAfterVisibilityChanged();
      onScrollingEnded();
    }
  };

  onScrollEndDrag = (event) => {
    this.endScrolling(event);
  };

  onMomentumScrollEnd = (event) => {
    const {onScrollingEnded} = this.props;

    this.endScrolling(event);
    onScrollingEnded();
  };

  onContentSizeChange = (_, contentHeight) => {
    const {column, boardRepository} = this.props;

    boardRepository.setContentHeight(column.id(), contentHeight);
  };

  handleChangeVisibleItems = (visibleItems) => {
    const {column, boardRepository} = this.props;

    boardRepository.updateItemsVisibility(column.id(), visibleItems);
  };

  setListView = (ref) => {
    const {column, boardRepository} = this.props;

    boardRepository.setListView(column.id(), ref);
  };

  render() {
    const {
      column,
      emptyComponent,
      renderHeader,
      oneColumn,
      movingMode,
      boardRepository,
    } = this.props;

    const ColumnComponent = (
      <View
        style={styles.columnContainer}
        ref={this.setColumnRef}
        collapsable={false}
        onLayout={this.updateColumnWithLayout}
        width={oneColumn ? ONE_COLUMN_WIDTH : COLUMN_WIDTH}
        marginRight={oneColumn ? 0 : 8}>
        {renderHeader(column)}

        {boardRepository.items(column.id()).length - 1 === 0 ? (
          emptyComponent ? (
            emptyComponent()
          ) : (
            <EmptyColumn {...this.props} />
          )
        ) : (
          <FlatList
            data={boardRepository.items(column.id())}
            ref={this.setListView}
            onScroll={this.handleScroll}
            scrollEventThrottle={0}
            onMomentumScrollEnd={this.onMomentumScrollEnd}
            onScrollEndDrag={this.onScrollEndDrag}
            onChangeVisibleRows={this.handleChangeVisibleItems}
            renderItem={(item) => this.renderWrapperRow(item.item)}
            keyExtractor={(item) => item.row().id.toString()}
            scrollEnabled={!movingMode}
            onContentSizeChange={this.onContentSizeChange}
            showsVerticalScrollIndicator={false}
            enableEmptySections
          />
        )}
      </View>
    );

    return ColumnComponent;
  }
}

Column.defaultProps = {
  badgeHeight: 30,
  badgeWidth: 30,
  badgeTextColor: colors.white,
  badgeTextFontFamily: '',
  badgeTextFontSize: 14,
  columnBackgroundColor: colors.fallingStar,
  columnBorderRadius: 20,
  columnNameTextColor: colors.blurple,
  columnNameFontFamily: '',
  columnNameFontSize: 18,
  isWithCountBadge: true,
  oneColumn: false,
};

Column.propTypes = {
  badgeHeight: number.isRequired,
  badgeWidth: number.isRequired,
  badgeTextColor: string.isRequired,
  badgeTextFontFamily: string.isRequired,
  badgeTextFontSize: number.isRequired,
  column: object,
  columnBackgroundColor: string.isRequired,
  columnBorderRadius: number.isRequired,
  columnNameFontFamily: string.isRequired,
  columnNameFontSize: number.isRequired,
  columnNameTextColor: string.isRequired,
  emptyComponent: func,
  renderHeader: func.isRequired,
  isWithCountBadge: bool.isRequired,
  movingMode: bool.isRequired,
  oneColumn: bool,
  onPress: func.isRequired,
  onPressIn: func.isRequired,
  onScrollingEnded: func.isRequired,
  onScrollingStarted: func.isRequired,
  renderWrapperRow: func.isRequired,
  boardRepository: object,
  unsubscribeFromMovingMode: func.isRequired,
};

const styles = StyleSheet.create({
  columnContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: colors.fallingStar,
    borderRadius: 20,
  },
});

export default Column;
